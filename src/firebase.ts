import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";

import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDrpxhLhm-5gHTZTH3hkJGRs-vOdTl1yAY",
  authDomain: "chat-c0cda.firebaseapp.com",
  projectId: "chat-c0cda",
  storageBucket: "chat-c0cda.firebasestorage.app",
  messagingSenderId: "351555634287",
  appId: "1:351555634287:web:e74a1280be6757a495f99a",
  measurementId: "G-XRXRKVS7J2",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Auth helpers
export const register = (e: string, p: string) =>
  createUserWithEmailAndPassword(auth, e, p);

export const login = (e: string, p: string) =>
  signInWithEmailAndPassword(auth, e, p);

export const logout = () => signOut(auth);

export const watchAuth = (cb: (u: User | null) => void) =>
  onAuthStateChanged(auth, cb);

// Chat helpers
export const addMessage = (roomId: string, uid: string, text: string) =>
  addDoc(collection(db, "chatRooms", roomId, "messages"), {
    uid,
    text,
    sentAt: serverTimestamp(),
  });

export const watchMessages = (roomId: string, cb: (msgs: any[]) => void) =>
  onSnapshot(
    query(
      collection(db, "chatRooms", roomId, "messages"),
      orderBy("sentAt", "asc")
    ),
    (snap) => cb(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
  );
