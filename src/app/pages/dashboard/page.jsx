"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react"; // pastikan install: npm i lucide-react

export default function AdminDashboard() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-blue-50 to-purple-50 flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-60 bg-white shadow-lg transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 md:translate-x-0`}
      >
        <div className="p-4 flex items-center justify-between border-b">
          <h2 className="text-lg font-bold text-purple-600">Admin Panel</h2>
          <button
            className="md:hidden text-gray-600"
            onClick={() => setMenuOpen(false)}
          >
            <X size={24} />
          </button>
        </div>
        <nav className="p-4 space-y-3">
          <a
            href="/dashboard"
            className="block px-3 py-2 rounded-md hover:bg-purple-100 text-purple-700 font-medium"
          >
            Dashboard
          </a>
          <a
            href="/users"
            className="block px-3 py-2 rounded-md hover:bg-pink-100 text-pink-700 font-medium"
          >
            Users
          </a>
          <a
            href="/settings"
            className="block px-3 py-2 rounded-md hover:bg-blue-100 text-blue-700 font-medium"
          >
            Settings
          </a>
        </nav>
      </aside>

      {/* Overlay (untuk mobile) */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 p-4 md:p-6 md:ml-60 w-full">
        {/* Topbar */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>

        {/* Statistik cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-white shadow rounded-lg p-4 border-l-4 border-purple-400">
            <h3 className="text-sm text-gray-500">Total Users</h3>
            <p className="text-2xl font-bold text-purple-600">120</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4 border-l-4 border-pink-400">
            <h3 className="text-sm text-gray-500">Active Sessions</h3>
            <p className="text-2xl font-bold text-pink-600">45</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4 border-l-4 border-blue-400">
            <h3 className="text-sm text-gray-500">New Orders</h3>
            <p className="text-2xl font-bold text-blue-600">8</p>
          </div>
        </div>

        {/* Table data */}
        <div className="bg-white shadow rounded-lg p-4 overflow-x-auto">
          <h2 className="text-lg font-semibold mb-3 text-gray-700">
            Latest Users
          </h2>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100">
                <th className="border p-3 text-left">ID</th>
                <th className="border p-3 text-left">Name</th>
                <th className="border p-3 text-left">Email</th>
                <th className="border p-3 text-left">Role</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-purple-50">
                <td className="border p-3">1</td>
                <td className="border p-3">Rahmat</td>
                <td className="border p-3">rahmat@example.com</td>
                <td className="border p-3 text-purple-600 font-medium">Admin</td>
              </tr>
              <tr className="bg-gray-50 hover:bg-pink-50">
                <td className="border p-3">2</td>
                <td className="border p-3">Taufik</td>
                <td className="border p-3">taufik@example.com</td>
                <td className="border p-3 text-pink-600 font-medium">Viewer</td>
              </tr>
              <tr className="hover:bg-blue-50">
                <td className="border p-3">3</td>
                <td className="border p-3">Rinaldi</td>
                <td className="border p-3">rinaldi@example.com</td>
                <td className="border p-3 text-blue-600 font-medium">Editor</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
