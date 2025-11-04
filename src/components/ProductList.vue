
<script setup>
  import {isLogged} from "@/stores/auth.js";
  import {logInfo} from "@/utils/util.js";

  logInfo( "Logged: "+ isLogged.value);
</script>


<template>

</template>

<style scoped>

</style>