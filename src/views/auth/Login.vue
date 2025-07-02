<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login } from "../../firebase";

const email = ref("");
const pass = ref("");
const err = ref("");
const loading = ref(false);
const router = useRouter();

async function submit() {
  err.value = "";
  loading.value = true;
  try {
    await login(email.value, pass.value);
    router.push("/chat/general"); // go to default room
  } catch (e: any) {
    err.value = "Identifiants incorrects";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <v-container class="d-flex justify-center align-center" style="height: 100vh">
    <v-card width="420" class="pa-6">
      <h2 class="text-h5 text-center mb-5">Connexion</h2>

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
          class="mb-4"
        />

        <v-btn
          block
          class="bg-orange :hover-bg-gray"
          type="submit"
          :loading="loading"
        >
          Se connecter
        </v-btn>
      </v-form>

      <p v-if="err" class="text-red text-center mt-2">{{ err }}</p>
      <div class="text-center mt-3">
        <RouterLink to="/register">Créer un compte</RouterLink>
      </div>
    </v-card>
  </v-container>
</template>
