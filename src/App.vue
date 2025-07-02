<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { logout } from "./firebase";
import { user } from "./authStore";

/* reactive drawer state */
const drawer = ref(false);
const router = useRouter();

/* sign‑out then go to login page */
async function handleLogout() {
  await logout();
  router.push("/login");
}
</script>

<template>
  <v-app>
    <!-- TOP BAR -->
    <v-app-bar color="orange" dark>
      <v-btn icon @click="drawer = !drawer">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>

      <v-toolbar-title>Real‑Time Chat</v-toolbar-title>
    </v-app-bar>

    <!-- NAVIGATION DRAWER -->
    <v-navigation-drawer v-model="drawer" location="left" temporary width="260">
      <v-list density="compact">
        <!-- PUBLIC PAGES -->
        <template v-if="!user">
          <v-list-item to="/login" prepend-icon="mdi-login" title="Connexion" />
          <v-list-item
            to="/register"
            prepend-icon="mdi-account-plus"
            title="Inscription"
          />
        </template>

        <!-- PRIVATE PAGES -->
        <template v-else>
          <v-list-item
            to="/chat/general"
            prepend-icon="mdi-chat"
            title="Général"
          />
          <!-- Profile -->
          <v-list-item
            to="/profile"
            prepend-icon="mdi-account"
            title="Profil"
          />

          <!-- add more rooms here -->
          <v-divider class="my-2" />
          <v-list-item
            prepend-icon="mdi-logout"
            title="Déconnexion"
            @click="handleLogout"
          />
        </template>
      </v-list>
    </v-navigation-drawer>

    <!-- ROUTE CONTENT -->
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
