<script setup lang="ts">
import { ref } from "vue";
import { user } from "../authStore";
import { useRouter } from "vue-router";
import { logout } from "../firebase";

const router = useRouter();
const loading = ref(false);

async function handleLogout() {
  loading.value = true;
  await logout();
  loading.value = false;
  router.push("/login");
}
</script>

<template>
  <v-container class="d-flex justify-center">
    <v-card width="400" class="pa-6 mt-10">
      <v-avatar size="80" class="mx-auto mb-4">
        <v-icon size="80">mdi-account-circle</v-icon>
      </v-avatar>

      <h2 class="text-h6 text-center mb-4">Mon profil</h2>

      <v-list density="compact">
        <v-list-item
          prepend-icon="mdi-email"
          title="E‑mail"
          :subtitle="user?.email || '—'"
        />
        <v-list-item
          prepend-icon="mdi-identifier"
          title="User ID"
          :subtitle="user?.uid.slice(0, 12) + '…' || '—'"
        />
      </v-list>

      <v-btn
        block
        color="error"
        class="mt-4"
        @click="handleLogout"
        :loading="loading"
      >
        Déconnexion
      </v-btn>
    </v-card>
  </v-container>
</template>
