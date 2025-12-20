"use client";

import Link from 'next/link';
import { ShieldCheck, ScanLine, Lock, Cpu } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white flex flex-col relative overflow-hidden font-sans">

      {/* Background Ambience */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center z-10">
        <div className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-medium backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-700">
          <Cpu size={14} /> Final Year Cryptography Project
        </div>

        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight animate-in fade-in zoom-in-95 duration-700 delay-100">
          DSFIT<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">GYM</span>
        </h1>

        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          Authentication system powered by <span className="text-white font-semibold">AES-CBC Encryption</span> and <span className="text-white font-semibold">LSB Steganography</span>.
          Secure your facility with invisible digital signatures.
        </p>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">

          {/* Admin Card */}
          <Link href="/admin" className="group relative bg-[#16161a] border border-white/5 hover:border-emerald-500/50 rounded-3xl p-8 text-left transition-all hover:shadow-[0_0_40px_rgba(16,185,129,0.1)] hover:-translate-y-1">
            <div className="p-4 bg-emerald-500/10 rounded-2xl w-fit mb-6 group-hover:bg-emerald-500 group-hover:text-black transition-colors">
              <Lock size={32} className="text-emerald-500 group-hover:text-black transition-colors" />
            </div>
            <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
              Admin Console <span className="opacity-0 group-hover:opacity-100 transition-opacity text-emerald-500 text-sm">→</span>
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Generate secure digital ID cards based on member data. Encrypts information into image pixels using LSB algorithm.
            </p>
          </Link>

          {/* Scanner Card */}
          <Link href="/scanner" className="group relative bg-[#16161a] border border-white/5 hover:border-blue-500/50 rounded-3xl p-8 text-left transition-all hover:shadow-[0_0_40px_rgba(59,130,246,0.1)] hover:-translate-y-1">
            <div className="p-4 bg-blue-500/10 rounded-2xl w-fit mb-6 group-hover:bg-blue-500 group-hover:text-black transition-colors">
              <ScanLine size={32} className="text-blue-500 group-hover:text-black transition-colors" />
            </div>
            <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
              Public Scanner <span className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500 text-sm">→</span>
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Verify member access by scanning digital cards. Decrypts hidden steganography layers to authenticate identity.
            </p>
          </Link>
        </div>
      </main>

      <footer className="p-8 text-center text-slate-600 text-xs">
        &copy; 2025 University Cryptography Project. Built with Next.js 14 & FastAPI.
      </footer>
    </div>
  );
}
