"use client";

import React, { useState } from 'react';
import {
    ShieldCheck,
    Download,
    Terminal,
    FileImage,
    Loader2,
    ArrowLeft,
    AlertCircle
} from 'lucide-react';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

export default function AdminPage() {
    // Auth State
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    // Admin Form State
    const [adminName, setAdminName] = useState('');
    const [adminId, setAdminId] = useState('');
    const [adminFile, setAdminFile] = useState<File | null>(null);
    const [generatedImg, setGeneratedImg] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [rawCiphertext, setRawCiphertext] = useState<string | null>(null);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        // Debug Log
        console.log("Input:", { u: username, p: password });

        if (username.trim().toLowerCase() === 'admin' && password.trim() === 'steno123') {
            setIsAuthenticated(true);
        } else {
            setLoginError('Invalid credentials');
            setTimeout(() => setLoginError(''), 2000);
        }
    };

    const handleAdminSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!adminFile || !adminName || !adminId) return;

        setIsGenerating(true);
        const formData = new FormData();
        formData.append('name', adminName);
        formData.append('id', adminId);
        formData.append('photo', adminFile);

        try {
            const response = await fetch(`${API_URL}/create-card`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Generation failed');

            const headerCiphertext = response.headers.get('X-Ciphertext');
            if (headerCiphertext) {
                setRawCiphertext(headerCiphertext);
            }

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            setGeneratedImg(url);
        } catch (err) {
            console.error(err);
        } finally {
            setIsGenerating(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#0a0a0c] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
                {/* Abstract Background */}
                <div className="absolute top-[-50%] left-[-50%] w-[100%] h-[100%] bg-emerald-900/10 blur-[150px] pointer-events-none rounded-full" />

                <Link href="/" className="absolute top-8 left-8 text-slate-500 hover:text-white flex items-center gap-2 transition-colors z-20">
                    <ArrowLeft size={20} /> Back
                </Link>

                <div className="w-full max-w-sm bg-[#16161a] border border-white/5 rounded-3xl p-8 shadow-2xl relative z-10 animate-in fade-in zoom-in-95 duration-500">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/5">
                            <ShieldCheck size={32} className="text-emerald-500" />
                        </div>
                        <h2 className="text-2xl font-bold tracking-tight">Admin Portal</h2>
                        <p className="text-slate-500 text-xs mt-1 uppercase tracking-widest font-semibold">Restricted Access</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold uppercase text-slate-500 mb-2 tracking-wider">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-[#0a0a0c] border border-white/10 rounded-xl px-4 py-3 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all placeholder:text-slate-700 text-sm font-medium"
                                placeholder="Enter username"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold uppercase text-slate-500 mb-2 tracking-wider">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-[#0a0a0c] border border-white/10 rounded-xl px-4 py-3 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all placeholder:text-slate-700 text-sm font-medium"
                                placeholder="••••••••"
                            />
                        </div>

                        {loginError && (
                            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                                <p className="text-red-400 text-xs text-center font-bold flex items-center justify-center gap-2">
                                    <AlertCircle size={14} /> {loginError}
                                </p>
                            </div>
                        )}

                        <button className="w-full bg-white text-black font-bold py-3.5 rounded-xl hover:bg-emerald-400 hover:shadow-lg hover:scale-[1.02] transition-all mt-2 active:scale-95">
                            Access Console
                        </button>
                    </form>
                </div>

                <p className="text-slate-600 text-[10px] fixed bottom-6">
                    SECURE GATEWAY v1.0 • ENCRYPTED SESSION
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0c] text-slate-200 font-sans selection:bg-emerald-500/30 p-6 md:p-12">
            {/* Back Button */}
            <button onClick={() => setIsAuthenticated(false)} className="inline-flex items-center gap-2 text-slate-500 hover:text-red-400 mb-8 transition-colors">
                <ArrowLeft size={20} /> Logout
            </button>

            <header className="mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
                    <ShieldCheck size={14} /> Admin Access Granted
                </div>
                <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">
                    Secure ID <span className="text-emerald-500">Generator</span>
                </h1>
                <p className="text-slate-400 max-w-lg">
                    Create cryptographically secure gym cards using AES-CBC encryption and LSB Steganography.
                </p>
            </header>

            <div className="grid lg:grid-cols-2 gap-12">
                {/* Form Panel */}
                <div className="bg-[#16161a] border border-white/5 rounded-3xl p-8 shadow-2xl h-fit">
                    <form onSubmit={handleAdminSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="col-span-2">
                                <label className="block text-xs font-bold uppercase text-slate-500 mb-2 tracking-wider">Full Name</label>
                                <input
                                    type="text"
                                    value={adminName}
                                    onChange={(e) => setAdminName(e.target.value)}
                                    placeholder="e.g. John Doe"
                                    className="w-full bg-[#0a0a0c] border border-white/10 rounded-xl px-4 py-4 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all placeholder:text-slate-700 text-white font-medium"
                                    required
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-xs font-bold uppercase text-slate-500 mb-2 tracking-wider">Member ID</label>
                                <input
                                    type="text"
                                    value={adminId}
                                    onChange={(e) => setAdminId(e.target.value)}
                                    placeholder="e.g. GYM-2023-001"
                                    className="w-full bg-[#0a0a0c] border border-white/10 rounded-xl px-4 py-4 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all placeholder:text-slate-700 text-white font-medium"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase text-slate-500 mb-2 tracking-wider">Base Photo</label>
                            <div className="relative group">
                                <input
                                    type="file"
                                    onChange={(e) => setAdminFile(e.target.files ? e.target.files[0] : null)}
                                    className="hidden"
                                    id="admin-photo"
                                    accept="image/png, image/jpeg"
                                />
                                <label
                                    htmlFor="admin-photo"
                                    className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl py-10 cursor-pointer transition-all ${adminFile ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-white/10 hover:border-emerald-500/30 hover:bg-white/5'}`}
                                >
                                    {adminFile ? (
                                        <div className="flex flex-col items-center gap-2 text-emerald-400">
                                            <FileImage size={32} />
                                            <span className="text-sm font-semibold">{adminFile.name}</span>
                                            <span className="text-xs text-emerald-500/60">Click to change</span>
                                        </div>
                                    ) : (
                                        <>
                                            <FileImage className="text-slate-600 mb-3" size={32} />
                                            <span className="text-sm text-slate-400 font-medium">Upload Member Photo</span>
                                            <span className="text-xs text-slate-600 mt-1">Supports JPG, PNG</span>
                                        </>
                                    )}
                                </label>
                            </div>
                        </div>

                        <button
                            disabled={isGenerating}
                            className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:cursor-not-allowed text-white font-bold py-5 rounded-2xl shadow-lg shadow-emerald-900/20 transition-all flex items-center justify-center gap-3 transform active:scale-[0.98]"
                        >
                            {isGenerating ? <Loader2 className="animate-spin" /> : <ShieldCheck size={24} />}
                            {isGenerating ? 'Encrypting & Embeddig...' : 'Generate Secure Card'}
                        </button>
                    </form>
                </div>

                {/* Result Panel */}
                <div className="space-y-8">
                    {/* Card Preview */}
                    <div className="bg-[#16161a] border border-white/5 rounded-3xl p-8 shadow-2xl min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden">

                        {/* Decor */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-full pointer-events-none" />

                        {generatedImg ? (
                            <div className="text-center w-full animate-in zoom-in-50 duration-500">
                                <div className="relative inline-block rounded-xl overflow-hidden shadow-2xl border border-white/10 mb-8 group">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                                        <span className="text-xs text-white/80 font-mono">STEGANOGRAPHY LAYER ACTIVE</span>
                                    </div>
                                    <img src={generatedImg} alt="Card Preview" className="max-w-full max-h-[350px] object-contain" />
                                </div>

                                <a
                                    href={generatedImg}
                                    download={`SECURE_${adminName.replace(/\s+/g, '_').toUpperCase()}.png`}
                                    className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-emerald-50 hover:scale-105 transition-all shadow-xl"
                                >
                                    <Download size={20} /> Download Card
                                </a>
                            </div>
                        ) : (
                            <div className="text-center text-slate-600">
                                <div className="w-24 h-24 bg-slate-800/30 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/5">
                                    <FileImage size={40} className="text-slate-700" />
                                </div>
                                <h3 className="text-lg font-semibold text-slate-500 mb-1">No Card Generated</h3>
                                <p className="text-sm max-w-[200px] mx-auto opacity-60">Fill the form to generate a cryptographically secured ID card.</p>
                            </div>
                        )}
                    </div>

                    {/* Crypto Terminal */}
                    {rawCiphertext && (
                        <div className="bg-black/50 border border-emerald-500/30 rounded-2xl p-6 backdrop-blur-sm">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-widest">
                                    <Terminal size={14} /> Live Encryption Stream
                                </div>
                                <div className="flex gap-1">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
                                    <div className="w-2 h-2 rounded-full bg-emerald-500/20" />
                                </div>
                            </div>
                            <div className="font-mono text-xs break-all text-emerald-500/80 p-4 bg-[#050505] rounded-lg border border-white/5 max-h-[100px] overflow-y-auto custom-scrollbar">
                                {rawCiphertext}
                            </div>
                            <p className="text-[10px] text-slate-500 mt-3 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block" />
                                AES-CBC 128-bit Ciphertext injected into LSB layers via Backend.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
