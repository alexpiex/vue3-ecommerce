import { ref } from 'vue'
import {apiCall} from "@/stores/service.js";

export const token = ref(localStorage.getItem('authToken'));
export const currentUser = ref(localStorage.getItem('user'));

//export const cart = ref([]);

export const isLogged = ref();


export const logoutUser =() => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    token.value = null
    currentUser.value = null
    isLogged.value = false;

}

export async function loginUser(email, password) {
    try {
        const data = await apiCall('/login', 'POST', {email, password});

        token.value = data.token;
        currentUser.value = data.user;
        localStorage.setItem('authToken', token.value);
        localStorage.setItem('user', JSON.stringify(currentUser.value));
        isLogged.value = true;
        return data;
    }
    catch (error) {
        //console.error(`loginUser:`, error);
        //console.log( error.message);
        //this.errorMessage = error.message;
        throw error;
    }
}

export async function registerUser(email, password) {
    try {
        return await apiCall('/register', 'POST', {email, password});

    } catch (error) {
        /* gestito in apiCall */
        throw error;
    }
}

export function checkSession() {
    //const tok = localStorage.getItem('authToken');
    //const user = localStorage.getItem('user');
    return isLogged.value = token.value !== null && currentUser.value !== null;

    //return token.value !== null && currentUser.value !== null;
}