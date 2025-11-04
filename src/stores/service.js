import {currentUser, isLogged, token} from "@/stores/auth.js";
import {logInfo, showAlertErrore} from "@/utils/util.js";
export const API_BASE_URL = 'http://localhost:3000/api';
export const apiCall =  async (endpoint, method = 'GET', body = null, token = null)=>  {
    const options = {
        method,
        headers: { 'Content-Type': 'application/json' },
    };
    if (token) {
        options.headers['Authorization'] = `Bearer ${token}`;
    }
    if (body) {
        options.body = JSON.stringify(body);
    }
    try {
        logInfo(`ChiamataRest ==> ${API_BASE_URL}${endpoint}`);
        let response = await fetch(`${API_BASE_URL}${endpoint}`, options);
        let data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Si è verificato un errore');
        }
        return data;
    } catch (error) {
        console.error(`API Error on ${method} (${endpoint})`, error);
        //console.log( error.message);
        //this.errorMessage = error.message;
        //throw error;
    }
}

/**
 * Restituisce tutto il carrello associato all utente.
 * @returns {Promise<*>}
 */
export const fetchCart = async() => {
    logInfo('fetchCart: '+JSON.stringify(currentUser.value));

    try {
        let obj = JSON.parse(JSON.stringify(currentUser.value));
        //const jsonStr = JSON.stringify(obj);
        //console.log('fetchCart: '+jsonStr);
        return await apiCall('/cartfull', 'POST', obj, token.value);

    } catch (error) {
        console.error(error);
        //cart.value = [];
        //showAlertErrore(error.message);
    }
}

export async function addToCart(product) {
    try {
        await apiCall('/cart', 'POST', { productId: product.id, quantity: 1 }, token.value);
        //await fetchCart();

    } catch (error) { /* gestito in apiCall */ }
}

export async function  removeFromCart(productId) {
    try {
        await apiCall(`/cart/${productId}`, 'DELETE',null, token.value);
        //return await fetchCart();
    } catch (error) { /* gestito in apiCall */ }
}

export async function updateQuantity (item, newQuantity) {
    if (newQuantity < 1) {
        await removeFromCart(item.id);
        return;
    }
    try {
        await apiCall(`/cart/${item.id}`, 'PUT', { quantity: newQuantity }, token.value);
        //await fetchCart();
    } catch(error) { /* gestito in apiCall */ }
}

export async function fetchProducts(products) {
    try {
        //console.log('Entro!');
        products.value = await apiCall('/products');
        return products;

    } catch(error) {
        products.value = [];
        /* gestito in apiCall */
    }
}