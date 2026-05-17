"use client";
import React, { useState, useEffect } from "react";
import Masonry, { Item } from "./Masonry";

interface GalleryImage {
  id: number;
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
}

const INITIAL_VISIBLE = 6;

const Gallery: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [masonryItems, setMasonryItems] = useState<Item[]>([]);

  // 🔹 READ dari database
  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data: GalleryImage[]) => setImages(data));
  }, []);

  // 🔹 Format data ke Masonry
  useEffect(() => {
    const dataToShow = showAll
      ? images
      : images.slice(0, INITIAL_VISIBLE);

    const formatted: Item[] = dataToShow.map((img) => ({
      id: img.id.toString(),
      img: img.imageUrl,
      height: img.imageHeight / img.imageWidth,
      url: "",
    }));

    setMasonryItems(formatted);
  }, [images, showAll]);

  // 🔹 DELETE
  async function deleteImage(id: number) {
    await fetch("/api/gallery", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    setImages(images.filter((img) => img.id !== id));
  }

  return (
    <section id="portfolio" className="w-full py-16 px-4 text-white">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold">Gallery</h2>
      </div>

      <Masonry
        items={masonryItems}
        ease="power3.out"
        duration={0.6}
        stagger={0.05}
        animateFrom="bottom"
        scaleOnHover
        hoverScale={1.03}
        blurToFocus
        colorShiftOnHover
        gaps={[8, 16, 24]}
        columns={{
          default: 3,
          768: 4,
          1024: 4,
        }}
      />

      {/* Tombol CRUD */}
      <div className="w-full text-center mt-10 space-x-4">
        {!showAll ? (
          <button
            onClick={() => setShowAll(true)}
            className="px-6 py-3 bg-emerald-500 rounded-xl"
          >
            Show More
          </button>
        ) : (
          <button
            onClick={() => setShowAll(false)}
            className="px-6 py-3 bg-gray-700 rounded-xl"
          >
            Show Less
          </button>
        )}
      </div>

      {/* Contoh DELETE */}
      <div className="hidden">
        {images.map((img) => (
          <button key={img.id} onClick={() => deleteImage(img.id)}>
            Hapus {img.id}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
