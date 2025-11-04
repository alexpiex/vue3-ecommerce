import jwt from "jsonwebtoken";

export const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {expiresIn: "30d"});

    // Set JWT as an HTTP-Only Cookie
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return token;
}

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Formato "Bearer TOKEN"

    if (token == null) {
        return res.status(401).json({ code: 401, message: '(401) Token non fornito.' }); // Unauthorized
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({code: 403, message: '(403) Token non valido.' }); // Forbidden
        }
        req.user = user; // Aggiunge i dati dell'utente (dall'interno del token) all'oggetto request
        next(); // Prosegue alla rotta richiesta
    });

}

export const getLocalReFreshToken = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    return user.RefreshToken;
}

export const getLocalAccessToken = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    return user.AccessToken
}

export const updateLocalAccessToken = (token) =>{
    const user = JSON.parse(localStorage.getItem("user"))
    const { accessToken, refreshToken } = token;
    user.AccessToken = accessToken
    user.RefreshToken = refreshToken
    localStorage.setItem("user", JSON.stringify(user))
}

export const getUser = () => {
    return JSON.parse(localStorage.getItem("user"))
}

export const setUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user))
}

export const removeUser = () => {
    localStorage.removeItem("user")
}



