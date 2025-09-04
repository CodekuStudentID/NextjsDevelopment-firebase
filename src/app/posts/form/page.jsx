"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PostFormPage() {
  const [form, setForm] = useState({ author: "", title: "", content: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("GET /api/posts error:", err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Gagal submit");

      const newPost = await res.json();
      setPosts([newPost, ...posts]); // push ke atas list
      setForm({ author: "", title: "", content: "" });
      setSuccess(true);

      setTimeout(() => setSuccess(false), 2500);
    } catch (err) {
      alert("Terjadi error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 p-6">
      <div className="max-w-3xl mx-auto">
        {/* FORM */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white shadow-md border border-gray-200 rounded-lg p-6 mb-10"
        >
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Buat Post Baru
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="author"
              placeholder="Nama Penulis"
              value={form.author}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none rounded-md text-black"
            />

            <input
              type="text"
              name="title"
              placeholder="Judul"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none rounded-md text-black"
            />

            <textarea
              name="content"
              placeholder="Isi konten..."
              value={form.content}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none rounded-md text-black"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition rounded-md disabled:opacity-50"
            >
              {loading ? "Mengirim..." : "Kirim"}
            </button>
          </form>


{/* animasi sukses */}
<AnimatePresence mode="wait">
  {success && (
    <motion.div
      key="success-alert" // 🔑 penting untuk trigger re-render
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
      className="mt-4 bg-green-500 text-white px-4 py-3 rounded-md shadow-md"
    >
      ✅ Postingan berhasil dibuat!
    </motion.div>
  )}
</AnimatePresence>

        {/* LIST POSTS */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          📚 Daftar Post
        </h2>
        <div className="grid gap-4">
          {posts.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white shadow-sm border border-gray-200 rounded-md p-5 hover:shadow-lg transition"
            >
              <h3 className="text-lg font-bold text-indigo-700">{p.title}</h3>
              <p className="text-gray-700 mt-2">{p.content}</p>
              <p className="text-sm text-gray-500 mt-3">✍️ {p.author}</p>
            </motion.div>
          ))}
        </div>
        </motion.div>
      </div>
    </div>
  );
}
