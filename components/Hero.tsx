"use client";

import React, { useEffect, useState } from "react";
import TiltedCard from "./TiltedCard";
import Shuffle from "./Shuffle";

export default function Hero() {
  const [size, setSize] = useState({ width: "250px", height: "250px" });

  // Resize listener
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSize({ width: "300px", height: "300px" }); // md
      } else if (window.innerWidth >= 640) {
        setSize({ width: "250px", height: "250px" }); // sm
      } else {
        setSize({ width: "200px", height: "200px" }); // mobile
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fade-in animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );

    document
      .querySelectorAll(".fade-in")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const SOCIAL_ICONS = [
    {
      label: "Facebook",
      href: "https://www.facebook.com/profile.php?id=100042779256645",
      svg: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.898v-2.89h2.54V9.845c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.772-1.63 1.562v1.873h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.99 22 12z" />
        </svg>
      ),
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/ndesooo__/",
      svg: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3h10zm-5 3c-2.757 0-5 2.243-5 5s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5zm0 2c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3zm4.5-.75a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z" />
        </svg>
      ),
    },
    {
      label: "GitHub",
      href: "https://github.com/mainbuat062-wq",
      svg: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 .5C5.648.5.5 5.794.5 12.29c0 5.196 3.438 9.615 8.207 11.159.6.113.82-.27.82-.6v-2.087c-3.338.744-4.033-1.65-4.033-1.65-.546-1.434-1.333-1.814-1.333-1.814-1.09-.78.082-.765.082-.765 1.204.087 1.84 1.275 1.84 1.275 1.07 1.908 2.807 1.357 3.492 1.037.108-.803.418-1.357.762-1.67-2.665-.317-5.466-1.378-5.466-6.13 0-1.354.467-2.46 1.235-3.327-.123-.318-.536-1.594.117-3.32 0 0 1.008-.335 3.3 1.27a11.24 11.24 0 013.005-.41c1.02.005 2.047.144 3.005.41 2.29-1.606 3.297-1.27 3.297-1.27.655 1.726.242 3.002.119 3.32.77.867 1.233 1.973 1.233 3.327 0 4.765-2.804 5.81-5.476 6.12.43.392.823 1.16.823 2.34v3.47c0 .335.216.727.828.603C20.07 21.9 23.5 17.48 23.5 12.29 23.5 5.79 18.352.5 12 .5z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: "https://id.linkedin.com/in/zidni-ruf-3715aa376",
      svg: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0V8zm7 0h5v2.5h.08c.69-1.25 2.37-2.57 4.87-2.57 5.21 0 6.05 3.43 6.05 7.87V24h-5v-7.5c0-1.79-.03-4.09-2.5-4.09-2.5 0-2.88 1.95-2.88 3.97V24H7V8z" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-20 py-16 md:py-24"
    >
      {/* TEXT */}
      <div className="w-full md:w-1/2 flex flex-col items-start gap-4">
        <h2 className="text-gray-300 text-base sm:text-lg font-inter">
          Hello, my name is
        </h2>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-poppins font-semibold leading-tight">
          <Shuffle
            text="Muhammad Zidni Ma'ruf"
            shuffleDirection="left"
            duration={0.35}
            animationMode="evenodd"
            shuffleTimes={1}
            ease="power3.out"
            stagger={0.03}
            threshold={0.1}
            triggerOnce
            triggerOnHover
            respectReducedMotion
            colorFrom="#5ec4b6"
            colorTo="#ffffffff"
          />
        </h1>

        <h3 className="text-gray-400 text-lg sm:text-xl font-inter">
          Software Engineering Student | Photography Enthusiast
        </h3>

        <p className="text-gray-300 leading-relaxed max-w-md font-inter">
          Based in Jepara. I write clean code and climb high mountains. Currently
          exploring web development and capturing moments along the way.
        </p>

        {/* SOCIALS */}
        <div className="flex gap-4 mt-4">
          {SOCIAL_ICONS.map((icon, idx) => (
            <a
              key={idx}
              href={icon.href}
              target="_blank"
              rel="noreferrer"
              className="text-gray-300 hover:text-emerald-400 transition"
            >
              {icon.svg}
            </a>
          ))}
        </div>
        <a
          href="/cv.pdf"
          download="CV_Muhammad_Zidni_Maruf.pdf"
          className="
            mt-4 px-6 py-2 
            bg-emerald-500 text-white 
            rounded-lg shadow-lg 
            hover:bg-emerald-600 
            transition
            inline-block
            cursor-pointer
          "
        >
          Download CV
        </a>
      </div>

      {/* IMAGE */}
      <TiltedCard
        imageSrc="/profile.jpg"
        containerHeight={size.height}
        containerWidth={size.width}
        imageHeight={size.height}
        imageWidth={size.width}
        rotateAmplitude={12}
        scaleOnHover={1.2}
        showMobileWarning={false}
        showTooltip
        displayOverlayContent
      />
    </section>
  );
}