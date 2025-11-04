<script setup xmlns="http://www.w3.org/1999/html">
import Layout from "../components/layouts.vue";

import {inject, ref} from 'vue'
import {useRouter} from 'vue-router'
import {isLogged, loginUser} from '../stores/auth.js'
import {logInfo, showAlertErrore, showAlertSuccesso} from "@/utils/util.js";
import {apiCall, fetchCart} from "@/stores/service.js";

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')
const router = useRouter()

const carrello = inject('carrello')

logInfo( "Logged: "+ isLogged.value);


async function login() {
  errorMessage.value = ''
  loading.value = true

  try {
    //const result = await handleLogin(email.value, password.value)
    const result = await loginUser(email.value, password.value);
    //logInfo(result);
    //alert(`Benvenuto, ${result.user.email}!`)
    carrello.value = await fetchCart();
    showAlertSuccesso();
    // Torna alla homepage
    await router.push('/');

  } catch (err) {
    showAlertErrore(err.message);
    //errorMessage.value = err.message

  } finally {
    loading.value = false
  }
}

async function handleLogin(email, password) {
  try {

    const data = await apiCall('/login', 'POST', { email, password });
    let  token = data.token;
    let currentUser = data.user;
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(currentUser));
    return data;

  } catch (err) {
    errorMessage.value = "Credenziali non valide: "+err.message ;
  }
}

async function handleLogin2(email, password) {

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const data = apiCall('/login', 'POST', { email, password });

        let token = data.token;
        let currentUser = data.user;
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(currentUser.email));

        if (data.user.id !== null && data.token !== null) {
          resolve( { id: `${data.user.id}`, email: `${data.user.email}`})
        } else {
          reject(new Error('Credenziali non valide'))
        }
      } catch (err) {
        reject(err.message)
      }
    }, 1000)
  })
}

async function loginUser2(email, password) {
  // Simuliamo una "API call"
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'admin@example.com' && password === '123456') {
        resolve({ user: 'Admin', token: 'fake-jwt-token-123' })
      } else {
        reject(new Error('Credenziali non valide'))
      }
    }, 1000)
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
            <h3 class="mb-3 text-center">Login</h3>

            <form @submit.prevent="login">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input v-model="email" type="email" class="form-control" id="email" required />
              </div>

              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input v-model="password" type="password" class="form-control" id="password" required />
              </div>

              <button type="submit" class="btn btn-primary w-100" :disabled="loading">
                <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                Accedi
              </button>

              <p v-if="errorMessage" class="text-danger mt-3 text-center">{{ errorMessage }}</p>
            </form>
          </div>
        </div>
      </div>




</template>

