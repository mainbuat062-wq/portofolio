"use client";
import React, { useState, useEffect } from "react";
import Masonry, { Item } from "./Masonry";

interface GalleryImage {
  id: number;
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
}

const IMAGES: GalleryImage[] = [
  { id: 1, imageUrl: "/lawu1.jpeg", imageWidth: 600, imageHeight: 400 },
  { id: 2, imageUrl: "/lawu2.jpeg", imageWidth: 600, imageHeight: 700 },
  { id: 3, imageUrl: "/lawu3.jpeg", imageWidth: 600, imageHeight: 500 },
  { id: 4, imageUrl: "/lawu4.jpeg", imageWidth: 600, imageHeight: 700 },
  { id: 5, imageUrl: "/lawu5.jpeg", imageWidth: 600, imageHeight: 450 },
  { id: 6, imageUrl: "/SnapInsta.to_508412668_18048059477617642_8545861100502620630_n.jpg", imageWidth: 600, imageHeight: 600 },
  { id: 7, imageUrl: "/SnapInsta.to_469438426_1123339849390499_6859020324786186637_n.jpg", imageWidth: 600, imageHeight: 400 },
  { id: 8, imageUrl: "/SnapInsta.to_482741936_18036364574617642_1386423293877499098_n.jpg", imageWidth: 600, imageHeight: 700 },
  { id: 9, imageUrl: "/SnapInsta.to_490212599_18041479160617642_698699772739210809_n.jpg", imageWidth: 600, imageHeight: 500 },
  { id: 10, imageUrl: "/SnapInsta.to_490718525_18041479082617642_7864861505899944552_n.jpg", imageWidth: 600, imageHeight: 700 },
  { id: 11, imageUrl: "/SnapInsta.to_491461020_18041479091617642_4859939204227409399_n.jpg", imageWidth: 600, imageHeight: 450 },
  { id: 12, imageUrl: "/SnapInsta.to_509105996_18048059495617642_1455220597747647499_n.jpg", imageWidth: 600, imageHeight: 600 },
  { id: 13, imageUrl: "/SnapInsta.to_450932917_1916546882122614_772793693637737017_n.jpg", imageWidth: 600, imageHeight: 400 },
  { id: 14, imageUrl: "/SnapInsta.to_491462842_18041479100617642_3010991118693313549_n.jpg", imageWidth: 600, imageHeight: 700 },
  { id: 15, imageUrl: "/SnapInsta.to_491464150_18041479169617642_6419710091350981739_n.jpg", imageWidth: 600, imageHeight: 500 },
  { id: 16, imageUrl: "/SnapInsta.to_491465076_18041479145617642_7746764727236736074_n.jpg", imageWidth: 600, imageHeight: 700 },
  { id: 17, imageUrl: "/SnapInsta.to_491510837_18041479130617642_6483638055549877165_n.jpg", imageWidth: 600, imageHeight: 450 },
];

const INITIAL_VISIBLE = 6;

const Gallery: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const [masonryItems, setMasonryItems] = useState<Item[]>([]);

  useEffect(() => {
    const dataToShow = showAll ? IMAGES : IMAGES.slice(0, INITIAL_VISIBLE);

    const formatted = dataToShow.map((img) => ({
  id: img.id.toString(),
  img: img.imageUrl,
  height: img.imageHeight / img.imageWidth,
  url: "", // wajib ada agar cocok type Item, tapi tidak membuka halaman
}));


    setMasonryItems(formatted);
  }, [showAll]);

  return (
    <section id="portfolio" className="w-full py-16 px-4 sm:px-6 lg:px-12 text-white">
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">Gallery</h2>
      </div>

      {/* Masonry */}
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

      {/* Button */}
      <div className="w-full text-center mt-10">
        {!showAll ? (
          <button
            onClick={() => setShowAll(true)}
            className="px-6 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-all duration-300"
          >
            Show More
          </button>
        ) : (
          <button
            onClick={() => setShowAll(false)}
            className="px-6 py-3 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition-all duration-300"
          >
            Show Less
          </button>
        )}
      </div>
    </section>
  );
};

export default Gallery;
