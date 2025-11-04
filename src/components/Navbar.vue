<template>
  <!-- ======================= 1. NAVBAR (HEADER) ======================= -->
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div class="container">
        <!-- Brand/Logo -->
        <a class="navbar-brand fw-bold" href="#">
          <i class="bi bi-gem me-2"></i>
          TuoLogo
        </a>

        <!-- Bottone per il toggle su mobile -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navigazionePrincipale">
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Link della Navbar -->
        <div class="collapse navbar-collapse" id="navigazionePrincipale">
          <!-- Link a sinistra -->
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" href="#" @click.prevent="navigateTo('')">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" @click.prevent="navigateTo('products')">Prodotti</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" @click.prevent="navigateTo('offerte')" >Offerte</a>
            </li>
          </ul>

          <!-- Link a destra (Carrello e Account) -->
          <ul class="navbar-nav">

            <li v-if="currentUser" class="nav-item">
              <span class="navbar-text me-3">Ciao, {{ currentUser.email}}</span>
            </li>

            <li class="nav-item">
              <a href="#" class="btn btn-primary position-relative me-2" @click.prevent="navigateTo('cart')">
                <i class="bi bi-cart3 me-1"></i>
                Carrello
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  <span v-if="cartItemCount > 0" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{{ cartItemCount }}</span>
                </span>
              </a>
            </li>

            <li v-if="currentUser" class="nav-item">
              <a href="#" class="btn btn-outline-light  position-relative me-2" @click.prevent="navigateTo('dashboard')"><i class="bi bi-person-fill me-1"></i>Account</a>
            </li>
            <li v-if="currentUser" class="nav-item">
              <a href="#" class="btn btn-outline-light" @click.prevent="logout">Esci</a>
            </li>

            <li v-if="!currentUser" class="nav-item">
              <a href="#" class="btn btn-primary  position-relative me-2" @click.prevent="navigateTo('login')">Accedi</a>
            </li>
            <li v-if="!currentUser" class="nav-item">
              <a href="#" class="btn btn-primary" @click.prevent="navigateTo('register')">Registrati</a>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  </header>

  <!-- ======================= FINE NAVBAR ======================= -->

</template>

<script setup>
import {provide, ref, computed, onMounted, inject} from 'vue';
import {useRouter} from 'vue-router'
import {currentUser, isLogged, logoutUser} from "@/stores/auth.js";
import {fetchCart} from "@/stores/service.js";
import {arrEmptyOrNull, logInfo} from "@/utils/util.js";

const router = useRouter()
const carrello = inject('carrello')


if (!isLogged.value) {

  if(arrEmptyOrNull(carrello.value)){
    logInfo('Array vuoto o null')
  } else {
    logInfo('Array pieno')
  }

  //carrello.value = [];

}

function logout() {
  logoutUser();
  carrello.value = [];
  router.push('/');
}

const navigateTo = (pagina) => {
  router.push('/'+pagina);
}

const cartItemCount = computed(() => {
  if(Array.isArray(carrello.value)) {
    logInfo('cart: '+ JSON.stringify(carrello.value));
    return carrello.value.reduce((total, item) => total + item.quantity, 0);
  }
})

//watchEffect(() => {
//  logInfo(carrello.value)
//})

</script>