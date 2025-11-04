<script setup>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import Layout from "../components/layouts.vue";
import {isLogged, registerUser} from '../stores/auth.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {logInfo, showAlertErrore, showAlertSuccesso} from "@/utils/util.js";

const email = ref('')
const password = ref('')
const message = ref('')
const error = ref('')
const loading = ref(false)
const router = useRouter()

logInfo( "Logged: "+ isLogged.value);

async function register() {
  loading.value = true
  message.value = ''
  error.value = ''

  try {
    const result = await registerUser(email.value, password.value)

    if(result.code === 201){
      showAlertSuccesso();
    } else {
      showAlertErrore(result.message);
    }
    //logInfo(`Esito, ${result.message}, procedere al login`)
    //showAlertSuccesso();
    await router.push('/')

  } catch (err) {
    showAlertErrore(err.message);
    //error.value = err.message
  } finally {
    loading.value = false
  }
}

async function registerUserOld(email, password) {
  // Simulazione backend con JWT finto
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email && password) resolve({ message: 'Registrazione riuscita' })
      else reject(new Error('Campi mancanti'))
    }, 800)
  })
}
</script>

<template>

  <div class="row justify-content-center">
    <br />
  </div>

      <div class="row justify-content-center">
        <div class="col-md-5">
          <div class="card shadow-sm p-4">
            <h3 class="text-center mb-3">Registrazione</h3>

            <form @submit.prevent="register">
              <div class="mb-3">
                <label>Email</label>
                <input v-model="email" type="email" class="form-control" required />
              </div>

              <div class="mb-3">
                <label>Password</label>
                <input v-model="password" type="password" class="form-control" required />
              </div>

              <button class="btn btn-success w-100" :disabled="loading">
                <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                Registrati
              </button>
            </form>

            <p v-if="message" class="text-success text-center mt-3">{{ message }}</p>
            <p v-if="error" class="text-danger text-center mt-3">{{ error }}</p>

            <div class="text-center mt-3">
              <router-link to="/login">Hai già un account? Accedi</router-link>
            </div>
          </div>
        </div>
      </div>


</template>
