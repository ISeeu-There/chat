/* ---------------- chatStore.ts ------------------ */
import { ref, watch, nextTick } from "vue";
import { addMessage, watchMessages } from "./firebase";
import { user } from "./authStore";

export const currentRoom = ref<string>("general");

export const messages = ref<any[]>([]);

let stopListening = () => {};

watch(
  currentRoom,
  (room) => {
    stopListening();

    stopListening = watchMessages(room, (list) => {
      messages.value = list;

      nextTick(() => {
        const el = document.getElementById("chat-body");
        if (el) el.scrollTop = el.scrollHeight;
      });
    });
  },
  { immediate: true }
);

/** Send a message */
export async function sendMessage(text: string) {
  if (!user.value || !text.trim()) return;
  await addMessage(currentRoom.value, user.value.uid, text.trim());
}
