'use client';
import React, { useEffect } from 'react';

interface Skill {
  id: number;
  name: string;
  percentage: number;
  description: string;
}

const SKILLS_DATA: Skill[] = [
  { id: 1, name: "HTML & CSS", percentage: 80, description: "Mampu membangun struktur website yang rapi (semantic) dan tampilan responsif yang menyesuaikan layar HP maupun Desktop." },
  { id: 2, name: "Python", percentage: 70, description: "Memahami konsep Algoritma, Struktur Data, dan Object-Oriented Programming (OOP) untuk logika backend yang kuat." },
  { id: 3, name: "MySQL", percentage: 65, description: "Merancang skema database (ERD), relasi antar tabel, dan menjalankan perintah SQL untuk pengelolaan data aplikasi." },
  { id: 4, name: "Git & GitHub", percentage: 60, description: "Mengelola versi kode program, kolaborasi tim, dan menyimpan dokumentasi proyek secara terstruktur di cloud." },
  { id: 5, name: "Photography", percentage: 79, description: "Kemampuan visual storytelling, komposisi gambar, dan color grading." },
  { id: 6, name: "Figma", percentage: 60, description: "Menerjemahkan kebutuhan pengguna menjadi desain antarmuka yang user-friendly." },
];

const Skills: React.FC = () => {
  useEffect(() => {
    const progressObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          const progress = target.getAttribute("data-progress");
          if (progress) target.style.width = `${progress}%`;
          progressObserver.unobserve(target);
        }
      });
    });

    const fadeInObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => entry.isIntersecting && entry.target.classList.add("visible"));
    });

    document.querySelectorAll(".progress-fill").forEach(el => progressObserver.observe(el));
    document.querySelectorAll(".fade-in").forEach(el => fadeInObserver.observe(el));

    return () => {
      progressObserver.disconnect();
      fadeInObserver.disconnect();
    };
  }, []);

  return (
    <section id="skills" className="w-full py-20 px-4 sm:px-6 lg:px-12 text-white">

      {/* TITLE */}
      <div className="text-center mb-12 fade-in">
        <h2 className="text-3xl sm:text-4xl font-bold">Professional Skills</h2>
        <p className="text-gray-400 mt-2 text-base sm:text-lg">My Talent</p>
      </div>

      {/* GRID RESPONSIVE */}
      <div className="
        grid
        grid-cols-2           /* mobile = 2 kolom */
        sm:grid-cols-2
        md:grid-cols-3       /* tablet & desktop = 3 kolom */
        gap-4 sm:gap-6
      ">
        {SKILLS_DATA.map(skill => (
          <div
            key={skill.id}
            className="
              fade-in
              bg-white/10 backdrop-blur-md
              border border-white/20
              rounded-xl
              p-4 sm:p-6
              shadow-lg
            "
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm sm:text-base md:text-lg font-semibold">{skill.name}</h3>
              <span className="text-emerald-400 text-sm sm:text-base font-semibold">
                {skill.percentage}%
              </span>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-gray-300 mb-4 leading-relaxed">
              {skill.description}
            </p>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-gray-700/50 rounded-full overflow-hidden">
              <div
                className="progress-fill h-full bg-emerald-400 transition-all duration-[1500ms]"
                data-progress={skill.percentage}
                style={{ width: "0%" }}
              ></div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

export default Skills;
