"use client";

import Link from 'next/link';
import { ShieldCheck, ScanLine, Lock, Dumbbell, Zap, Code, Database, Shield, ArrowRight, Fingerprint } from 'lucide-react';
import LightRays from '../components/LightRays';
import LogoLoop from '../components/LogoLoop';
import { SiNextdotjs, SiFastapi, SiPython, SiTailwindcss, SiTypescript } from 'react-icons/si';

export default function Home() {
  const techLogos = [
    { node: <SiNextdotjs size={32} />, title: "Next.js", href: "https://nextjs.org" },
    { node: <SiFastapi size={32} />, title: "FastAPI", href: "https://fastapi.tiangolo.com/" },
    { node: <SiPython size={32} />, title: "Python", href: "https://www.python.org/" },
    { node: <SiTailwindcss size={32} />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
    { node: <SiTypescript size={32} />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-lime-500 selection:text-black scroll-smooth">

      {/* Navbar Fixed */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 w-full backdrop-blur-sm border-b border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="font-bold text-xl tracking-tighter flex items-center gap-2">
            <div className="w-3 h-3 bg-lime-500"></div>
            DSFIT<span className="text-zinc-600">Absent</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-500">
            <a href="#hero" className="hover:text-lime-500 transition-colors">Overview</a>
            <a href="#story" className="hover:text-lime-500 transition-colors">Development</a>
            <a href="#gallery" className="hover:text-lime-500 transition-colors">Gallery</a>
          </div>
          <div className="text-xs font-mono border border-zinc-800 px-3 py-1.5 rounded bg-zinc-900/50 text-zinc-500">
            BUILD v1.0
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex flex-col justify-center items-center px-6 relative pt-20 overflow-hidden">

        {/* LightRays Effect */}
        <div className="absolute top-0 left-0 w-full h-[120%] z-0 opacity-80 pointer-events-none mix-blend-lighten">
          <LightRays
            raysOrigin="top-center"
            raysColor="#ffffff"
            raysSpeed={0.05}
            lightSpread={5}
            rayLength={5}
            pulsating={true}
            followMouse={true}
            mouseInfluence={0.2}
          />
        </div>

        {/* Background Grid - Industrial Style */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-20" />

        {/* Spotlight Effect */}
        <div className="absolute top-0 w-full h-[500px] bg-gradient-to-b from-zinc-900/50 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">

          {/* Top Tagline */}
          <div className="flex justify-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-lime-500/30 bg-lime-500/5 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-500"></span>
              </span>
              <span className="text-[10px] font-bold tracking-widest uppercase text-lime-500">System Operational</span>
            </div>
          </div>

          {/* Giant Title */}
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-6 mx-auto leading-[0.9] animate-in fade-in zoom-in-95 duration-1000">
            DSFIT<span className="text-lime-500">GYM</span>
          </h1>

          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            System absensi gym yang menggunakan <strong className="text-white border-b border-lime-500/50 pb-0.5">AES-CBC Encryption</strong> dan <strong className="text-white border-b border-lime-500/50 pb-0.5">LSB Steganography</strong>.
            Amankan data absensi gymmu dengan aman.
          </p>

          {/* Brutalist Action Area */}
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center w-full max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">

            {/* Admin Card */}
            <Link href="/admin" className="group w-full md:w-1/2 bg-zinc-900/50 border border-zinc-800 hover:border-lime-500 p-8 rounded-none md:rounded-l-2xl text-left transition-all duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-lime-500/0 group-hover:bg-lime-500/5 transition-colors duration-500" />
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <Lock className="text-zinc-500 group-hover:text-lime-500 transition-colors" size={28} />
                  <ArrowRight className="text-zinc-700 group-hover:text-white -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Admin Panel</h3>
                <p className="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors">
                  Generate for secure IDs.
                </p>
              </div>
            </Link>

            {/* Vertical Divider (Desktop Only) */}
            <div className="hidden md:block w-px h-32 bg-zinc-800"></div>

            {/* Scanner Card */}
            <Link href="/scanner" className="group w-full md:w-1/2 bg-zinc-900/50 border border-zinc-800 hover:border-lime-500 p-8 rounded-none md:rounded-r-2xl text-left transition-all duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-lime-500/0 group-hover:bg-lime-500/5 transition-colors duration-500" />
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <ScanLine className="text-zinc-500 group-hover:text-lime-500 transition-colors" size={28} />
                  <ArrowRight className="text-zinc-700 group-hover:text-white -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Scanner</h3>
                <p className="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors">
                  scan for attendance.
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-700 animate-bounce">
          <div className="w-[1px] h-12 bg-zinc-800 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-lime-500 animate-[drop_2s_infinite]"></div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section id="story" className="py-32 px-6 relative bg-[#080808] border-t border-zinc-900">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-800 pb-8">
            <div>
              <span className="text-lime-500 font-mono text-xs uppercase tracking-widest mb-2 block">01 / PROCESS</span>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">SYSTEM ARCHITECTURE</h2>
            </div>
            <p className="text-zinc-500 max-w-sm text-sm leading-relaxed">
              Pengembangan sistem keamanan hybrid menggunakan standar industri untuk proteksi data member gym.
            </p>
          </div>

          {/* Development Roadmap */}
          <div className="relative border-l border-zinc-800 ml-3 md:ml-0 space-y-16">

            {/* Step 1 */}
            <div className="relative pl-8 md:pl-0">
              <div className="md:grid md:grid-cols-2 md:gap-16 items-center">
                <div className="mb-6 md:mb-0 md:text-right">
                  <span className="text-zinc-500 font-mono text-xs">PHASE 1</span>
                  <h3 className="text-2xl font-bold text-white mb-3">Core Research & Logic</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Analisis algoritma <span className="text-lime-500">AES-128 CBC</span> untuk enkripsi data dan teknik <span className="text-lime-500">LSB</span> untuk penyisipan bit. Menentukan protokol keamanan data yang stateless.
                  </p>
                </div>
                <div className="relative">
                  <div className="absolute left-[-33px] top-1/2 -translate-y-1/2 w-4 h-4 bg-[#080808] border-2 border-lime-500 rounded-full z-10 hidden md:block"></div>

                  {/* Placeholder */}
                  <div className="aspect-video bg-zinc-900 border border-zinc-800 relative overflow-hidden group hover:border-lime-500/50 transition-all">
                    <img
                      src="/proto_1.png"
                      alt="Research Proto"
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 font-mono text-[10px] text-lime-500">RESEARCH</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative pl-8 md:pl-0">
              <div className="md:grid md:grid-cols-2 md:gap-16 items-center">
                <div className="order-2 relative">
                  <div className="absolute right-[-33px] top-1/2 -translate-y-1/2 w-4 h-4 bg-[#080808] border-2 border-zinc-700 rounded-full z-10 hidden md:block"></div>
                  {/* Placeholder */}
                  <div className="aspect-video bg-zinc-900 border border-zinc-800 relative overflow-hidden group hover:border-lime-500/50 transition-all">
                    <img
                      src="/phase_2.png"
                      alt="Backend API"
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 font-mono text-[10px] text-zinc-500 group-hover:text-lime-500">BACKEND</div>
                  </div>
                </div>
                <div className="order-1 mb-6 md:mb-0">
                  <span className="text-zinc-500 font-mono text-xs">PHASE 2</span>
                  <h3 className="text-2xl font-bold text-white mb-3">Backend & Encryption</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Implementasi <span className="text-white">FastAPI</span> sebagai core engine. Pembuatan skrip Python untuk enkripsi payload dan manipulasi piksel gambar secara presisi tanpa merusak kualitas visual.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative pl-8 md:pl-0">
              <div className="md:grid md:grid-cols-2 md:gap-16 items-center">
                <div className="mb-6 md:mb-0 md:text-right">
                  <span className="text-zinc-500 font-mono text-xs">PHASE 3</span>
                  <h3 className="text-2xl font-bold text-white mb-3">Frontend Integration</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Integrasi <span className="text-white">Next.js 14</span> dengan Backend. Pembuatan UI/UX modern yang berfokus pada kecepatan akses dan visualisasi data keamanan secara real-time.
                  </p>
                </div>
                <div className="relative">
                  <div className="absolute left-[-33px] top-1/2 -translate-y-1/2 w-4 h-4 bg-[#080808] border-2 border-zinc-700 rounded-full z-10 hidden md:block"></div>
                  {/* Placeholder */}
                  <div className="aspect-video bg-zinc-900 border border-zinc-800 relative overflow-hidden group hover:border-lime-500/50 transition-all">
                    <img
                      src="/phase_3.png"
                      alt="Frontend UI"
                      className="w-full h-full object-fill opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 font-mono text-[10px] text-zinc-500 group-hover:text-lime-500">UI</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-32 px-6 bg-[#050505]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 flex items-center gap-4">
            <div className="w-12 h-[1px] bg-lime-500"></div>
            <span className="text-lime-500 font-mono text-xs uppercase tracking-widest">02 / GALLERY</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { src: "/gallery_1.png", label: "DIGITAL ACCESS CARD", desc: "Output Steganography" },
              { src: "/gallery_2.png", label: "ATTENDANCE SYSTEM SCANNER", desc: "Scanner Interface" },
              { src: "/gallery_3.png", label: "SECURE LOGS", desc: "AES Encryption Payload" },
              { src: "/gallery_4.png", label: "API GATEWAY", desc: "FastAPI Documentation" },
            ].map((item, i) => (
              <div key={i} className="aspect-square bg-zinc-900 border border-zinc-800 hover:border-lime-500/50 transition-all relative group overflow-hidden cursor-pointer">
                <img
                  src={item.src}
                  alt={item.label}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-[10px] font-mono text-lime-500 mb-1">{item.label}</div>
                  <div className="text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                    {item.desc}
                  </div>
                </div>

                {/* Hover Icon Overlay */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight size={16} className="text-white -rotate-45" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Footer */}
      <footer className="py-12 px-6 border-t border-zinc-900 bg-[#020202]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-zinc-500 text-xs font-mono">
            &copy; 2025 DSFIT PROJECT. All Systems Operational.
          </div>

          <div className="w-full md:w-1/2 h-[50px] overflow-hidden text-zinc-500">
            <LogoLoop
              logos={techLogos}
              speed={50}
              direction="left"
              logoHeight={32}
              gap={40}
              hoverSpeed={0}
              fadeOut={true}
              fadeOutColor="#020202"
            />
          </div>
        </div>
      </footer>
    </div>
  );
}
