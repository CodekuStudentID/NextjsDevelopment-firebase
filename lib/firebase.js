// lib/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);

// 🔹 fungsi test koneksi
export async function testConnection() {
  try {
    // ambil 1 koleksi random, misalnya "posts"
    const snapshot = await getDocs(collection(db, "posts"));
    console.log("✅ Firestore terkoneksi, jumlah dokumen:", snapshot.size);
    return true;
  } catch (error) {
    console.error("❌ Firestore gagal konek:", error);
    return false;
  }
}
