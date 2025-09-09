"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/auth/auth";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const router = useRouter();

/* fungsi mengambil nilai dengan spread operator */
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

/* fungsi mengambil nilai keseluruhan form dan mengirim ke fungsi login di services/auth/auth.js */
  const handleLogin = (e) => {
    e.preventDefault();
    const result = login(form);

    if (result.success) {
      router.push("/pages/dashboard");
    } else {
      setMessage("❌ " + result.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm bg-white shadow p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Login Dashboard</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 text-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500"
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 text-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 hover:bg-gray-700 transition"
          >
            Login
          </button>
        </form>

        {message && (
          <p className="mt-4 text-sm text-red-600">{message}</p>
        )}
      </div>
    </div>
  );
}
