"use client";
import { useEffect } from "react";
import { testConnection } from "../../../lib/firebase"; // named import

export default function ConnectionPage() {
  useEffect(() => {
    async function check() {
      const ok = await testConnection();
      console.log("Hasil tes koneksi:", ok);
    }
    check();
  }, []);

  return <h1>Cek Koneksi Firebase</h1>;
}
