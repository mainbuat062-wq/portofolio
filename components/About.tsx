"use client";

import React from "react";
import Lanyard from "@/components/Lanyard";

export default function About() {
  return (
    <section
      id="about"
      className="w-full relative z-10 text-white flex justify-center py-16 md:py-17"
    >
      <div className="w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <div
          className="
            backdrop-blur-md bg-white/10 
            rounded-2xl border border-white/20 
            px-6 py-8 lg:pb-5
            flex flex-col gap-10
          "
        >
          <div
            className="
              grid grid-cols-1 lg:grid-cols-12 
              gap-8 lg:gap-10 
              items-center
            "
          >
            {/* 3D Lanyard */}
            <div className="col-span-1 lg:col-span-4 flex justify-center">
              <div
                className="
                  w-full max-w-[230px] sm:max-w-[230px] 
                  aspect-[3/5]
                  rounded-xl
                  lg:-mt-5
                  lg:pt-0
                  relative z-30
                "
              >
                <Lanyard position={[0, -0, 15]} gravity={[0, -40, 0]} />
              </div>
            </div>

            {/* Text Section */}
            <div className="col-span-1 lg:col-span-8 flex flex-col">
              <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-center lg:text-left">
                About Me
              </h1>

              <div className="space-y-4 text-gray-300 text-base text-center lg:text-left">
                <p>
                  Saya{" "}
                  <span className="text-white font-semibold">
                    Muhammad Zidni Ma'ruf
                  </span>
                  , mahasiswa Rekayasa Perangkat Lunak.
                </p>

                <p>
                  Berdomisili di Jepara, saya memiliki ketertarikan kuat pada
                  pengembangan web, fotografi, dan dunia teknologi. Hobi mendaki
                  gunung melatih saya untuk teliti, fokus, dan pantang
                  menyerah—kualitas yang selalu saya bawa dalam proses
                  pengembangan perangkat lunak.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-700 text-center lg:text-left">
                <span className="text-emerald-400 font-medium text-sm sm:text-base">
                  Software Engineering Student
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
