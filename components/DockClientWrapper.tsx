'use client'; 

import React from 'react';
import Dock, { DockItemData } from './Dock'; 
// Saya sesuaikan ikon agar cocok dengan menu portofolio Anda (Home, About, Skills, Portfolio, Contact)
import { Home as HomeIcon, User, Code, Image as ImageIcon, Mail } from 'lucide-react';

export default function DockClientWrapper() {
  
  // Fungsi helper untuk melakukan Smooth Scroll ke ID tertentu
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      // Fallback jika id tidak ditemukan (misal scroll ke paling atas untuk home)
      if (id === 'home') window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const dockItems: DockItemData[] = [
    {
      icon: <HomeIcon size={14} className="text-white" />, 
      label: 'Beranda',
      // Ganti router.push menjadi scrollToSection
      onClick: () => scrollToSection('home'),
    },
    {
      icon: <User size={14} className="text-white" />,
      label: 'Tentang',
      onClick: () => scrollToSection('about'),
    },
    {
      icon: <Code size={14} className="text-white" />,
      label: 'Skills',
      onClick: () => scrollToSection('skills'),
    },
    {
      icon: <ImageIcon size={14} className="text-white" />, // Ikon Image untuk Portfolio
      label: 'Galeri',
      onClick: () => scrollToSection('portfolio'),
    },
    {
      icon: <Mail size={14} className="text-white" />,
      label: 'Kontak',
      onClick: () => scrollToSection('contact'),
    },
  ];

  return (
    // Pointer-events-none di container luar agar klik tembus ke elemen belakang
    // Pointer-events-auto dikembalikan di dalam Dock (biasanya sudah dihandle oleh library Dock-nya)
    <div className="fixed bottom-8 left-0 right-0 z-50 flex justify-center pointer-events-none">
      
      <div className="pointer-events-auto"> 
        <Dock 
          items={dockItems} 
          baseItemSize={30}    // Sedikit diperbesar agar lebih enak diklik
          magnification={50}   // Efek zoom saat hover
          panelHeight={50}     // Tinggi background dock
        />
      </div>
    </div>
  );
}