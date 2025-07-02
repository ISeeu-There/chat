<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { register } from "../../firebase";

const email = ref("");
const pass = ref("");
const confirm = ref("");
const err = ref("");
const loading = ref(false);
const router = useRouter();

async function submit() {
  err.value = "";
  if (pass.value !== confirm.value) {
    err.value = "Les mots de passe diffèrent";
    return;
  }
  loading.value = true;
  try {
    await register(email.value, pass.value);
    router.push("/chat/general");
  } catch (e: any) {
    err.value = e.message;
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <v-container class="d-flex justify-center align-center" style="height: 100vh">
    <v-card width="420" class="pa-6">
      <h2 class="text-h5 text-center mb-5">Inscription</h2>

      <v-form @submit.prevent="submit">
        <v-text-field
          v-model="email"
          label="E‑mail"
          prepend-inner-icon="mdi-email"
        />
        <v-text-field
          v-model="pass"
          label="Mot de passe"
          type="password"
          prepend-inner-icon="mdi-lock"
        />
        <v-text-field
          v-model="confirm"
          label="Confirmer"
          type="password"
          prepend-inner-icon="mdi-lock-check"
          class="mb-4"
        />

        <v-btn block color="orange" type="submit" :loading="loading">
          Créer un compte
        </v-btn>
      </v-form>

      <p v-if="err" class="text-red text-center mt-2">{{ err }}</p>
      <div class="text-center mt-3">
        <RouterLink to="/login">Déjà inscrit ?</RouterLink>
      </div>
    </v-card>
  </v-container>
</template>
