<script setup>
import {isLogged} from "@/stores/auth.js";
import {computed, inject, onMounted} from "vue";
import {fetchCart, removeFromCart, updateQuantity} from "@/stores/service.js";
import {useRouter} from "vue-router";
import {arrEmptyOrNull, logInfo, showAlertConferma, showAlertErrore} from "@/utils/util.js";

logInfo( "Logged: "+ isLogged.value);
const router = useRouter()
const carrello = inject('carrello')

//if (!isLogged.value) {
//  navigateTo('login');
//}

//const onSubmit = async () => {
//  alert('Premuto Submit!')
//};

/*
const cartItemCount = computed(() => {
  if(carrello.value !== null){
    return carrello.value.reduce((total, item) => total + item.quantity, 0);
  }
});
*/
const cartTotal = computed(() => {
  if(Array.isArray(carrello.value)) {
    return carrello.value.reduce((total, item) => total + (item.price * item.quantity), 0);
  } else {
    return 0;
  }
})

async function  removeToCart(id)  {

  try {

    let esito = await showAlertConferma();
    logInfo('esito', esito);

    if(esito){
      await removeFromCart(id);
      carrello.value = await fetchCart();
    }



  } catch (error) { /* gestito in apiCall */
    showAlertErrore(error.message);
  }
}

//const updQuantity = (item, newQuantity) => {
//  updateQuantity(item, newQuantity);
//}

const incrementQuantity = async (item, newQuantity)=> {
  //updateQuantity(item, item.quantity + 1);
  await updateQuantity(item, newQuantity);
  carrello.value = await fetchCart();
}

const decrementQuantity = async (item, newQuantity)=> {
  //updateQuantity(item, item.quantity - 1);
  await updateQuantity(item, newQuantity);
  carrello.value = await fetchCart();
}

function navigateTo(pagina) {
  router.push('/'+pagina)
}

onMounted(() => {
  /*if (isLogged.value) {
    carrello.value = fetchCart();
  } else {
    carrello.value = [];
  }*/

  /*let res = fetchCart();
  logInfo('res', JSON.stringify(res));
  if(res === null ){
    logInfo('Éntro!');
    carrello.value = [];
  } else {
    carrello.value = res;
  }*/


})
</script>

<template>
  <h1 class="text-center mb-5 fw-bold">Il Tuo Carrello</h1>
  <div v-if="carrello.length === 0" class="text-center py-5 bg-white rounded shadow-sm">
    <i class="bi bi-cart-x" style="font-size: 5rem; color: #ccc;"></i>
    <p class="mt-4 fs-4 text-muted">Il tuo carrello è vuoto.</p>
    <button class="btn btn-primary mt-3" @click="navigateTo('products')">Torna al catalogo</button>
  </div>
  <div v-else class="bg-white p-4 rounded shadow-sm">
    <form id="form" @submit.prevent="onSubmit">
      <ul class="list-group list-group-flush">
        <li v-for="item in carrello" :key="item.id" class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
          <div class="d-flex align-items-center col-12 col-md-5 mb-2 mb-md-0">
            <img :src="item.imageUrl" style="width: 80px; height: 80px; object-fit: cover;" class="rounded me-3">
            <div>
              <h6 class="mb-0 fw-semibold">{{ item.name }}</h6>
              <small class="text-muted">€{{ item.price.toFixed(2) }}</small>
            </div>
          </div>
          <div class="d-flex align-items-center col-12 col-md-3 justify-content-center mb-2 mb-md-0">
            <button class="btn btn-outline-secondary btn-sm btn-icon" @click="decrementQuantity(item, item.quantity - 1)"><i class="bi bi-dash"></i></button>
            <span class="mx-3 fw-bold">{{ item.quantity }}</span>
            <button class="btn btn-outline-secondary btn-sm btn-icon" @click="incrementQuantity(item, item.quantity + 1)"><i class="bi bi-plus"></i></button>
          </div>
          <div class="fw-bold fs-5 col-6 col-md-2 text-md-end">€{{ (item.price * item.quantity).toFixed(2) }}</div>
          <div class="col-6 col-md-2 text-end">
            <button class="btn btn-outline-danger btn-sm btn-icon" @click="removeToCart(item.id)"><i class="bi bi-trash"></i></button>
          </div>
        </li>
      </ul>
      <div class="text-end mt-4">
        <h3 class="fw-bold">Totale: €{{ cartTotal.toFixed(2) }}</h3>
        <button class="btn btn-success btn-lg mt-2">Procedi al Checkout</button>
      </div>
    </form>
  </div>

</template>

<style scoped>

</style>