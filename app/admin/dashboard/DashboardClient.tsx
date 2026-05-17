"use client"

import { useEffect, useState } from "react"

type Gallery = {
  id: number
  imageUrl: string
  imageWidth: number
  imageHeight: number
}

export default function DashboardClient() {
  const [data, setData] = useState<Gallery[]>([])
  const [file, setFile] = useState<File | null>(null)

  // READ
  useEffect(() => {
    fetch("/api/gallery")
      .then(res => res.json())
      .then(setData)
  }, [])

  // UPLOAD
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!file) return alert("Pilih gambar dulu")

    const formData = new FormData()
    formData.append("file", file)

    await fetch("/api/gallery/upload", {
      method: "POST",
      body: formData,
    })

    location.reload()
  }

  // DELETE
  async function handleDelete(id: number) {
    await fetch("/api/gallery", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })

    location.reload()
  }

  // LOGOUT
  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" })
    window.location.href = "/admin/login"
  }

  return (
    <div style={{ padding: 40 }}>
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {/* FORM UPLOAD */}
      <form onSubmit={handleSubmit} style={{ margin: "20px 0" }}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <button type="submit">Upload</button>
      </form>

      {/* LIST */}
      <ul>
        {data.map(item => (
          <li key={item.id} style={{ marginBottom: 10 }}>
            <img src={item.imageUrl} width={120} />
            <br />
            <button onClick={() => handleDelete(item.id)}>Hapus</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
