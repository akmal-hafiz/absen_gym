"use client";

import React, { useState } from 'react';
import {
    ShieldCheck,
    Download,
    Terminal,
    FileImage,
    Loader2,
    ArrowLeft,
    AlertCircle,
    User,
    Hash
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
        if (username.trim().toLowerCase() === 'admin' && password.trim() === 'steno123') {
            setIsAuthenticated(true);
        } else {
            setLoginError('Username atau password salah');
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

    // LOGIN SCREEN
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
                {/* Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

                {/* Lime Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-lime-500/15 rounded-full blur-[120px] pointer-events-none" />

                <Link href="/" className="absolute top-6 left-6 text-zinc-500 hover:text-white flex items-center gap-2 transition-colors z-20">
                    <ArrowLeft size={18} /> Kembali
                </Link>

                <div className="w-full max-w-sm bg-zinc-950 border border-zinc-800 rounded-2xl p-8 relative z-10">
                    <div className="text-center mb-8">
                        <div className="w-14 h-14 bg-lime-500/10 rounded-xl flex items-center justify-center mx-auto mb-4 border border-lime-500/20">
                            <ShieldCheck size={28} className="text-lime-500" />
                        </div>
                        <h2 className="text-xl font-bold">Admin Login</h2>
                        <p className="text-zinc-500 text-sm mt-1">Masuk untuk akses panel admin</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-zinc-500 mb-2">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 focus:border-lime-500 focus:outline-none transition-colors text-sm"
                                placeholder="Masukkan username"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-zinc-500 mb-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 focus:border-lime-500 focus:outline-none transition-colors text-sm"
                                placeholder="••••••••"
                            />
                        </div>

                        {loginError && (
                            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                                <p className="text-red-400 text-xs text-center font-medium flex items-center justify-center gap-2">
                                    <AlertCircle size={14} /> {loginError}
                                </p>
                            </div>
                        )}

                        <button className="w-full bg-lime-500 text-black font-bold py-3 rounded-xl hover:bg-lime-400 transition-colors mt-2">
                            Masuk
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // ADMIN DASHBOARD
    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-10">
            {/* Grid Background */}
            <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

            {/* Header */}
            <div className="relative z-10">
                <button onClick={() => setIsAuthenticated(false)} className="inline-flex items-center gap-2 text-zinc-500 hover:text-red-400 mb-6 transition-colors text-sm">
                    <ArrowLeft size={16} /> Logout
                </button>

                <div className="flex items-center gap-3 mb-2">
                    <div className="px-3 py-1 bg-lime-500/10 border border-lime-500/20 rounded-full text-lime-400 text-xs font-medium">
                        Admin
                    </div>
                </div>
                <h1 className="text-3xl font-bold mb-2">ID Card Generator</h1>
                <p className="text-zinc-500 text-sm mb-8">Buat kartu member dengan enkripsi AES-128 dan steganografi LSB</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 relative z-10">
                {/* Form Panel */}
                <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
                    <form onSubmit={handleAdminSubmit} className="space-y-5">
                        <div>
                            <label className="flex items-center gap-2 text-xs font-medium text-zinc-500 mb-2">
                                <User size={14} /> Nama Lengkap
                            </label>
                            <input
                                type="text"
                                value={adminName}
                                onChange={(e) => setAdminName(e.target.value)}
                                placeholder="Contoh: Budi Santoso"
                                className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3.5 focus:border-lime-500 focus:outline-none transition-colors"
                                required
                            />
                        </div>
                        <div>
                            <label className="flex items-center gap-2 text-xs font-medium text-zinc-500 mb-2">
                                <Hash size={14} /> ID Member
                            </label>
                            <input
                                type="text"
                                value={adminId}
                                onChange={(e) => setAdminId(e.target.value)}
                                placeholder="Contoh: GYM-2025-001"
                                className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3.5 focus:border-lime-500 focus:outline-none transition-colors"
                                required
                            />
                        </div>

                        <div>
                            <label className="flex items-center gap-2 text-xs font-medium text-zinc-500 mb-2">
                                <FileImage size={14} /> Foto Member
                            </label>
                            <div className="relative">
                                <input
                                    type="file"
                                    onChange={(e) => setAdminFile(e.target.files ? e.target.files[0] : null)}
                                    className="hidden"
                                    id="admin-photo"
                                    accept="image/png, image/jpeg"
                                />
                                <label
                                    htmlFor="admin-photo"
                                    className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl py-8 cursor-pointer transition-all ${adminFile ? 'border-lime-500/50 bg-lime-500/5' : 'border-zinc-800 hover:border-zinc-700'}`}
                                >
                                    {adminFile ? (
                                        <div className="flex flex-col items-center gap-1 text-lime-400">
                                            <FileImage size={24} />
                                            <span className="text-sm font-medium">{adminFile.name}</span>
                                            <span className="text-xs text-lime-500/60">Klik untuk ganti</span>
                                        </div>
                                    ) : (
                                        <>
                                            <FileImage className="text-zinc-600 mb-2" size={28} />
                                            <span className="text-sm text-zinc-400">Upload foto</span>
                                            <span className="text-xs text-zinc-600">PNG atau JPG</span>
                                        </>
                                    )}
                                </label>
                            </div>
                        </div>

                        <button
                            disabled={isGenerating}
                            className="w-full bg-lime-500 hover:bg-lime-400 disabled:bg-zinc-800 disabled:text-zinc-600 text-black font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                        >
                            {isGenerating ? <Loader2 className="animate-spin" size={20} /> : <ShieldCheck size={20} />}
                            {isGenerating ? 'Memproses...' : 'Generate Kartu'}
                        </button>
                    </form>
                </div>

                {/* Result Panel */}
                <div className="space-y-6">
                    {/* Card Preview */}
                    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 min-h-[350px] flex flex-col items-center justify-center">
                        {generatedImg ? (
                            <div className="text-center w-full">
                                <div className="relative inline-block rounded-xl overflow-hidden border border-zinc-800 mb-6">
                                    <img src={generatedImg} alt="Card Preview" className="max-w-full max-h-[280px] object-contain" />
                                </div>
                                <a
                                    href={generatedImg}
                                    download={`SECURE_${adminName.replace(/\s+/g, '_').toUpperCase()}.png`}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-lime-400 transition-colors"
                                >
                                    <Download size={18} /> Download Kartu
                                </a>
                            </div>
                        ) : (
                            <div className="text-center text-zinc-600">
                                <div className="w-16 h-16 bg-zinc-900 rounded-xl flex items-center justify-center mx-auto mb-4 border border-zinc-800">
                                    <FileImage size={28} className="text-zinc-700" />
                                </div>
                                <p className="text-sm">Belum ada kartu</p>
                                <p className="text-xs text-zinc-700">Isi form untuk generate</p>
                            </div>
                        )}
                    </div>

                    {/* Encrypted Data Display */}
                    {rawCiphertext && (
                        <div className="bg-zinc-950 border border-lime-500/20 rounded-2xl p-5">
                            <div className="flex items-center gap-2 text-lime-400 text-xs font-medium mb-3">
                                <Terminal size={14} />
                                <span>Encrypted Payload</span>
                                <div className="w-1.5 h-1.5 bg-lime-500 rounded-full animate-pulse ml-auto" />
                            </div>
                            <div className="font-mono text-xs break-all text-lime-500/70 p-3 bg-black rounded-lg border border-zinc-900 max-h-[80px] overflow-y-auto">
                                {rawCiphertext}
                            </div>
                            <p className="text-[10px] text-zinc-600 mt-3">
                                AES-128 CBC • Base64 Encoded • LSB Embedded
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
