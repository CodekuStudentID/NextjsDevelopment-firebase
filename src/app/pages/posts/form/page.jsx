"use client";

import { useEffect, useState } from "react";
import { getPosts, addPost, updatePost, deletePost } from "@/services/posts";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ author: "", title: "", content: "" });
  const [editingId, setEditingId] = useState(null);


  async function loadPosts() {
    const data = await getPosts();
    setPosts(data);
  }

  useEffect(() => {
    loadPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updatePost(editingId, form);
      setEditingId(null);
    } else {
      await addPost(form);
    }
    setForm({ author: "", title: "", content: "" });
    loadPosts();
  };

  const handleEdit = (post) => {
    setForm({ author: post.author, title: post.title, content: post.content });
    setEditingId(post.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    await deletePost(id);
    loadPosts();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
  
        </h1>

        {/* Form */}
        <div className="bg-white shadow-lg p-6 mb-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            {editingId ? "✏️ Edit Post" : "Form to Add Post"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Author"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
              required
            />
            <input
              type="text"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
              required
            />
            <textarea
              placeholder="Content"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
              rows={4}
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all cursor-pointer"
            >
              {editingId ? "Update Post" : "Add Post"}
            </button>
          </form>
        </div>

        {/* List Posts */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div
                key={post.id}
                className="bg-white shadow-md p-5 hover:shadow-xl transition-all"
              >
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500 mb-3">
                  By {post.author || "Anonymous"}
                </p>
                <p className="text-gray-700 line-clamp-3">{post.content}</p>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(post)}
                    className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-2 rounded-lg transition-all cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-all cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No posts found. Add one above 🚀
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
