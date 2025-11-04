<script setup>
import {isLogged} from "@/stores/auth.js";
import {logInfo} from "@/utils/util.js";

logInfo("Logged: "+ isLogged.value);
</script>

<template>


      <div class="row">
        <div class="col-12 text-center">
          <h1 class="display-4 fw-bold">Il Tuo Negozio</h1>
          <p class="lead text-muted">Questo è il contenitore principale per il corpo della tua pagina.</p>
          <p>Qui puoi inserire la griglia dei prodotti, le pagine di dettaglio, il form di login, ecc.</p>
          <a href="#" class="btn btn-primary btn-lg mt-3">Scopri i Prodotti</a>

          <h2 class="display-6 text-center mb-4">What is Lorem Ipsum?</h2>
          <p><strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
            been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>

        </div>
      </div>






</template>



<style>

</style>