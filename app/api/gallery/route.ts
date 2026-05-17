import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs/promises";
import path from "path";

type GalleryItem = {
  id: number;
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
  createdAt: string;
};

const filePath = path.join(process.cwd(), "data", "gallery.json");

/* =========================
   Helper: cek admin login
========================= */
async function isAdmin() {
  const cookieStore = await cookies();
  return !!cookieStore.get("admin_session");
}

async function readGallery(): Promise<GalleryItem[]> {
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw || "[]");
  } catch {
    return [];
  }
}

async function writeGallery(data: GalleryItem[]) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

/* =========================
   READ (PUBLIC)
   GET /api/gallery
========================= */
export async function GET() {
  const data = await readGallery();
  return NextResponse.json(data);
}

/* =========================
   CREATE (ADMIN ONLY)
   POST /api/gallery
========================= */
export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { imageUrl, imageWidth, imageHeight } = await req.json();

  if (!imageUrl || !imageWidth || !imageHeight) {
    return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
  }

  const data = await readGallery();

  const newItem: GalleryItem = {
    id: data.length ? data[0].id + 1 : 1,
    imageUrl,
    imageWidth: Number(imageWidth),
    imageHeight: Number(imageHeight),
    createdAt: new Date().toISOString(),
  };

  const newData = [newItem, ...data];
  await writeGallery(newData);

  return NextResponse.json(newItem);
}

/* =========================
   DELETE (ADMIN ONLY)
   DELETE /api/gallery
========================= */
export async function DELETE(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });
  }

  const data = await readGallery();
  const newData = data.filter((item) => item.id !== Number(id));

  await writeGallery(newData);

  return NextResponse.json({ success: true });
}
