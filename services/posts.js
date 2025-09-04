import { db } from "../lib/firebase";
import { collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";

const postsCol = collection(db, "posts");

export const postService = {
  async create({ author, title, content }) {
    const docRef = await addDoc(postsCol, {
      author,
      title,
      content,
      createdAt: serverTimestamp(),
    });
    return { id: docRef.id, author, title, content };
  },

  async findAll() {
    const snapshot = await getDocs(postsCol);
    return snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));
  },
};
