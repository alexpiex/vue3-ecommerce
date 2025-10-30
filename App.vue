<script setup>
import {provide, inject, ref} from "vue";
import {checkSession} from "@/stores/auth.js";
import {fetchCart} from "@/stores/service.js";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

const carrello = ref([]);
//isLogged.value = checkSession();
checkSession();

// Rende 'carrello' disponibile a tutti i discendenti
provide('carrello', carrello);

</script>

<template>


  <Navbar />
  <main>
    <div class="container">
      <router-view></router-view>
      <slot />
    </div>
  </main>
  <footer />
</template>