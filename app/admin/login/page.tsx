"use client"

import { useState } from "react"

export default function LoginPage() {
  const [error, setError] = useState("")

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const form = e.currentTarget
    const email = (form.email as HTMLInputElement).value
    const password = (form.password as HTMLInputElement).value

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    if (!res.ok) {
      setError("Email atau password salah")
      return
    }

    window.location.href = "/admin/dashboard"
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Admin Login</h1>

      <form onSubmit={handleLogin}>
        <input name="email" placeholder="Email" required />
        <br />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        <br />
        <button type="submit">Login</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  )
}
