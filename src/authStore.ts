import { ref } from "vue";
import type { User } from "firebase/auth";
import { watchAuth } from "./firebase";

export const user = ref<User | null>(null);

watchAuth((u) => (user.value = u));
