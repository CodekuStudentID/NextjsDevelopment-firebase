export function login({ email, password }) {
  if (
    email === process.env.NEXT_PUBLIC_ADMIN_EMAIL &&
    password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD
  ) {
    return { success: true, message: "Login berhasil" };
  }

  return { success: false, message: "Email atau password salah" };
}
