<script setup>
import {isLogged} from "@/stores/auth.js";
import {logInfo} from "@/utils/util.js";

logInfo( "Logged: "+ isLogged.value);
</script>

<template>


    <div class="pricing-header p-3 pb-md-4 mx-auto text-center">
      <h1 class="display-4 fw-normal">Pagina Dashboard</h1>
      <p class="fs-5 text-muted">Liste PaginaDashboard</p>
    </div>

</template>

<style scoped>

</style>