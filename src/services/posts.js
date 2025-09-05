import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

const postsCol = collection(db, "posts");

// 🔹 READ
export async function getPosts() {
  const snapshot = await getDocs(postsCol);
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  }));
}

// 🔹 CREATE
export async function addPost(post) {
  await addDoc(postsCol, {
    ...post,
    createdAt: serverTimestamp(),
  });
}

// 🔹 UPDATE
export async function updatePost(id, newData) {
  const postRef = doc(db, "posts", id);
  await updateDoc(postRef, newData);
}

// 🔹 DELETE
export async function deletePost(id) {
  const postRef = doc(db, "posts", id);
  await deleteDoc(postRef);
}
