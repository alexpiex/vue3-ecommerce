<script setup>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import Layout from "../components/layouts.vue";

import {useRouter} from 'vue-router'
import {inject, onMounted, ref} from "vue";
import {isLogged} from "@/stores/auth.js";
import {addToCart, fetchProducts, fetchCart} from "@/stores/service.js";
import {logInfo, showAlertErrore} from "@/utils/util.js";

const router = useRouter();
const products = ref([]);
//const errorMessage = ref('');
const carrello = inject('carrello')


logInfo( "Logged: "+ isLogged.value);
/*
async function fetchProducts() {
  try {
    //console.log('Entro!');
    products.value = await apiCall('/products');
  } catch(error) {
        errorMessage.value = "Impossibile caricare i prodotti.";
  }
}
*/

async function addCart(product) {
  //console.log(product);
  if (!isLogged.value) {
    navigateTo('login');
    return;
  }
  try {
    //await apiCall('/cart', 'POST', { productId: product.id, quantity: 1 });
    await addToCart(product);

    carrello.value = await fetchCart();

    //await alert('Aggiunto!');
  } catch (error) { /* gestito in apiCall */
    showAlertErrore(error.message);
  }
}

const navigateTo = (pagina) => {
  router.push('/'+pagina)
}

onMounted(() => {
  fetchProducts(products);
});

</script>

<template>



    <h1 class="text-center mb-5 fw-bold">Scopri i Nostri Prodotti</h1>
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
      <div class="col" v-for="product in products" :key="product.id">
        <div class="card h-100 border-0 shadow-sm card-product">
          <img :src="product.imageUrl" class="card-img-top" :alt="product.name" style="height: 200px; object-fit: cover;">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title fw-semibold">{{ product.name }}</h5>
            <p class="card-text text-muted small flex-grow-1">{{ product.description }}</p>
            <div class="d-flex justify-content-between align-items-center mt-3">
              <p class="fs-4 fw-bold text-primary mb-0">€{{ product.price.toFixed(2) }}</p>
              <button class="btn btn-dark" @click="addCart(product)">
                <i class="bi bi-plus-lg"></i> Aggiungi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>




</template>

<style scoped>

</style>