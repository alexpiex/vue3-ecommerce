<script setup>
import {provide, inject, ref} from "vue";
import {currentUser, token, isLogged, checkSession, logoutUser} from "@/stores/auth.js";
import {fetchCart} from "@/stores/service.js";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import {logInfo} from "@/utils/util.js";

const carrello = ref([]);
isLogged.value = checkSession();

// NON VIENE UTILIZZATA

logInfo( "Logged: "+ isLogged.value);
// Rende 'carrello' disponibile a tutti i discendenti
provide('carrello', carrello);

</script>

<template>

  <Navbar />
  <main>

    <div class="container">
     <slot />
    </div>
    <footer />
  </main>

</template>

