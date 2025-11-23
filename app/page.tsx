// app/page.tsx
import LiquidEther from "@/components/LiquidEther";
import DockClientWrapper from "@/components/DockClientWrapper";
import "./portfolio-styles.css";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/skills";
import Gallery from "@/components/gallery";
import Contact from "@/components/contact";
import Container from "@/components/Container";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen w-full relative bg-[#1a1a1a] overflow-x-hidden">

      {/* BACKGROUND - LiquidEther */}
      <div
        className="fixed inset-0 z-0 touch-none select-none"
        style={{ pointerEvents: "none" }}
      >
        <LiquidEther
          colors={[ "#5227FF", "#FF9FFC", "#B19EEF" ]}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>

      {/* MAIN CONTENT */}
      <main className="relative z-10 w-full">

        <Container>
          <Hero />
        </Container>

        <Container>
          <About />
        </Container>

        <Container>
          <Skills />
        </Container>

        
        <Gallery /> {/* Menggunakan komponen Gallery yang sudah dimodifikasi */}

        <Container>
          <Contact />
        </Container>

        {/* --- Tambahkan Komponen Footer di sini --- */}
        {/* Footer sudah mengelola padding dan max-width-nya sendiri */}
        <Footer />

      </main>

      {/* DOCK NAVIGATION */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-4 md:pb-6 safe-bottom pointer-events-auto">
        <DockClientWrapper />
      </div>

    </div>
  );
}