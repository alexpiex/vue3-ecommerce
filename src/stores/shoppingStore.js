import { defineStore } from 'pinia'
import Swal from 'sweetalert2'

export const useShoppingStore = defineStore('shoppingStore', {

    state: () => {
        return {
            cart: [],
            products: [],
            cartItems : [],
            roles: [],
            permission: []


        }
    },
    persist: {
        storage: localStorage,
        paths: ['token']
    },
    getters: {
        countCartItems(){
            return this.cartItems.length;
        },
        getCartItems(){
            return this.cartItems;
        }
    },
    actions: {
        addToCart(item) {
            let index = this.cartItems.findIndex(product => product.id === item.id);
            if(index !== -1) {
                this.products[index].quantity += 1;
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your item has been updated',
                    showConfirmButton: false,
                    timer: 1500
                });
            }else {
                item.quantity = 1;
                this.cartItems.push(item);
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your item has been saved',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        },
        incrementQ(item) {
            let index = this.cartItems.findIndex(product => product.id === item.id);
            if(index !== -1) {
                this.cartItems[index].quantity += 1;
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your item has been updated',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        },
        decrementQ(item) {
            let index = this.cartItems.findIndex(product => product.id === item.id);
            if(index !== -1) {
                this.cartItems[index].quantity -= 1;
                if(this.cartItems[index].quantity === 0){
                    this.cartItems = this.cartItems.filter(product => product.id !== item.id);
                }
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your item has been updated',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        },
        removeFromCart(item) {
            this.cartItems = this.cartItems.filter(product => product.id !== item.id);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your item has been removed',
                showConfirmButton: false,
                timer: 1500
            });
        },
        setToken(data) {
            this.token = data
        },
        resetState() {
            this.$patch((state) => {
                state.token = '' //reset token
                state.roles = []
                state.permission = []
                //reset router
                state.allRoutes = []
                state.cart = []
                //reset userInfo
                state.userInfo.username = ''
                state.userInfo.avatar = ''
            })
            this.getUserInfo = false
        },

    },

})