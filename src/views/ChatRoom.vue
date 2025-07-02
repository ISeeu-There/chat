<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { currentRoom, messages, sendMessage } from "../chatStore";
import { user } from "../authStore";

const route = useRoute();
currentRoom.value = route.params.id as string;

const text = ref("");
function submit() {
  sendMessage(text.value);
  text.value = "";
}
</script>

<template>
  <v-container fluid class="d-flex flex-column chat-wrapper">
    <!-- Messages list -->
    <div id="chat-body" class="flex-grow-1 overflow-auto pa-4">
      <div
        v-for="m in messages"
        :key="m.id"
        :class="['msg-row', m.uid === user?.uid ? 'self' : 'other']"
      >
        <!-- avatar for OTHER users -->
        <v-avatar v-if="m.uid !== user?.uid" size="32" class="me-2">
          <v-icon>mdi-account-circle</v-icon>
        </v-avatar>

        <!-- bubble -->
        <div class="bubble">
          {{ m.text }}
          <span class="time">{{
            new Date(m.sentAt?.seconds * 1000).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          }}</span>
        </div>

        <!-- avatar spacer to align self bubbles (optional) -->
        <v-avatar v-if="m.uid === user?.uid" size="32" class="ms-2 invisible">
          <v-icon>mdi-account-circle</v-icon>
        </v-avatar>
      </div>
    </div>

    <!-- Input -->
    <v-text-field
      v-model="text"
      placeholder="Écrire un message…"
      append-inner-icon="mdi-send"
      density="compact"
      variant="outlined"
      hide-details
      flat
      rounded
      class="chat-input"
      @keyup.enter="submit"
      @click:append-inner="submit"
    />
  </v-container>
</template>

<style scoped>
.chat-input {
  margin: 8px;
  text-align: center;
  max-height: 50px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.chat-wrapper {
  height: 100vh;
  background: #f0f2f5;
}

/* ---- message rows -------------------------------------------------- */
.msg-row {
  display: flex;
  align-items: flex-end;
  margin-bottom: 8px;
}
.msg-row.self {
  justify-content: flex-end;
}
.msg-row.other {
  justify-content: flex-start;
}

/* ---- bubble styling ------------------------------------------------ */
.bubble {
  max-width: 70%;
  padding: 8px 12px;
  border-radius: 18px;
  position: relative;
  word-wrap: break-word;
  font-size: 0.95rem;
  line-height: 1.25rem;
}
.msg-row.self .bubble {
  color: #fff;
  background: #0084ff; /* Facebook blue */
}
.msg-row.other .bubble {
  background: #e4e6eb; /* Light grey */
  color: #050505;
}

/* ---- tail triangles (pseudo‑elements) ------------------------------ */
.msg-row.self .bubble::after,
.msg-row.other .bubble::after {
  content: "";
  position: absolute;
  bottom: 0;
  width: 0;
  height: 0;
  border: 8px solid transparent;
}
.msg-row.self .bubble::after {
  right: -4px;
  border-left-color: #0084ff;
  border-right: 0;
  margin-bottom: -1px;
}
.msg-row.other .bubble::after {
  left: -4px;
  border-right-color: #e4e6eb;
  border-left: 0;
  margin-bottom: -1px;
}

/* ---- timestamp ----------------------------------------------------- */
.time {
  display: block;
  font-size: 0.65rem;
  margin-top: 2px;
  opacity: 0.6;
}

/* ---- input tweaks -------------------------------------------------- */
.input {
  background: #fff;
}
</style>
