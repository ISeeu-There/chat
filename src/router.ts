import { createRouter, createWebHistory } from "vue-router";
import Login from "./views/auth/Login.vue";
import Register from "./views/auth/Register.vue";
import ChatRoom from "./views/ChatRoom.vue";
import Profile from "./views/Profile.vue";
import { user } from "./authStore";

const routes = [
  { path: "/login", name: "login", component: Login },
  { path: "/register", name: "register", component: Register },
  { path: "/chat/:id", name: "chat", component: ChatRoom },
  { path: "/profile", name: "profile", component: Profile },
  { path: "/", redirect: "/chat/general" },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, _, next) => {
  const publicPages = ["login", "register"];
  const authNeeded = !publicPages.includes(to.name as string);

  if (authNeeded && !user.value) return next({ name: "login" });
  if (!authNeeded && user.value)
    return next({ name: "chat", params: { id: "general" } });
  next();
});

export default router;
