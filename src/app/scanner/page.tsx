"use client";

import React, { useState } from 'react';
import {
    ScanLine,
    ShieldCheck,
    Terminal,
    AlertCircle,
    ArrowLeft,
    Loader2,
    CheckCircle2,
    FileImage
} from 'lucide-react';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

interface ScanResult {
    status: string;
    id: string;
    name: string;
    raw_encrypted_data: string;
}

export default function ScannerPage() {
    const [scanFile, setScanFile] = useState<File | null>(null);
    const [isScanning, setIsScanning] = useState(false);
    const [scanResult, setScanResult] = useState<ScanResult | null>(null);
    const [scanError, setScanError] = useState<string | null>(null);

    const handleScanSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!scanFile) return;

        setIsScanning(true);
        setScanResult(null);
        setScanError(null);

        const formData = new FormData();
        formData.append('file', scanFile);

        try {
            // Simulation delay for dramatic effect
            await new Promise(r => setTimeout(r, 2000));

            const response = await fetch(`${API_URL}/verify-card`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (data.status === 'success') {
                setScanResult(data);
            } else {
                setScanError(data.reason || 'Authentication Failed');
            }
        } catch (err) {
            setScanError("Connection to Security Server lost.");
        } finally {
            setIsScanning(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0c] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">

            {/* Dynamic Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className={`absolute inset-0 transition-opacity duration-1000 ${scanResult ? 'bg-emerald-950/20' : scanError ? 'bg-red-950/20' : 'bg-transparent'}`} />
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-20" />
            </div>

            <Link href="/" className="absolute top-8 left-8 text-slate-500 hover:text-white flex items-center gap-2 transition-colors z-20">
                <ArrowLeft size={20} /> Exit Scanner
            </Link>

            <div className="w-full max-w-md relative z-10">
                <div className="text-center mb-10">
                    <div className="inline-block p-4 bg-[#16161a] rounded-full border border-white/5 shadow-2xl mb-6 relative">
                        <ScanLine size={48} className={`text-emerald-500 transition-all duration-500 ${isScanning ? 'opacity-50 blur-sm' : ''}`} />

                        {/* Scanning Line Animation */}
                        {isScanning && (
                            <div className="absolute top-0 left-0 w-full h-full border-2 border-emerald-500 rounded-full animate-ping opacity-20" />
                        )}
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Access Control</h1>
                    <p className="text-slate-400">Place your ID Card to verify identity.</p>
                </div>

                <div className="bg-[#16161a] border border-white/5 rounded-3xl p-2 shadow-2xl backdrop-blur-xl">
                    <form onSubmit={handleScanSubmit} className="p-6 space-y-6">
                        <div className="relative group">
                            <input
                                type="file"
                                onChange={(e) => setScanFile(e.target.files ? e.target.files[0] : null)}
                                className="hidden"
                                id="scan-upload"
                                accept="image/png"
                            />
                            <label
                                htmlFor="scan-upload"
                                className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl py-12 cursor-pointer transition-all relative overflow-hidden ${scanFile ? 'border-emerald-500 bg-emerald-900/10' : 'border-white/10 hover:border-white/20 hover:bg-white/5'}`}
                            >
                                {scanFile ? (
                                    <>
                                        <img
                                            src={URL.createObjectURL(scanFile)}
                                            className="w-full h-full absolute inset-0 object-cover opacity-40 blur-sm"
                                            alt="bg"
                                        />
                                        <div className="relative z-10 text-center">
                                            <FileImage size={32} className="mx-auto mb-2 text-emerald-400" />
                                            <span className="text-sm font-bold text-white shadow-black drop-shadow-md">{scanFile.name}</span>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="p-4 bg-white/5 rounded-full mb-4 group-hover:scale-110 transition-transform">
                                            <ScanLine className="text-slate-400" size={24} />
                                        </div>
                                        <p className="text-sm text-slate-400 font-medium">Click to Insert Card</p>
                                        <span className="text-xs text-slate-500 mt-2 block">(or Upload Photo)</span>
                                    </>
                                )}
                            </label>
                        </div>

                        <button
                            disabled={!scanFile || isScanning}
                            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${isScanning ? 'bg-slate-800 text-slate-400 cursor-wait' : 'bg-white text-black hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(52,211,153,0.5)]'}`}
                        >
                            {isScanning ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} /> Decrypting...
                                </>
                            ) : (
                                'VERIFY IDENTITY'
                            )}
                        </button>
                    </form>
                </div>

                {/* Results Pop-up */}
                <div className={`transition-all duration-500 ease-out overflow-hidden ${scanResult || scanError ? 'max-h-[500px] opacity-100 mt-6' : 'max-h-0 opacity-0 mt-0'}`}>
                    {scanResult ? (
                        <div className="bg-emerald-600 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8  opacity-10 pointer-events-none">
                                <ShieldCheck size={120} />
                            </div>

                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-white/20 rounded-full">
                                    <CheckCircle2 size={24} className="text-white" />
                                </div>
                                <span className="font-bold text-white tracking-wider text-sm">ACCESS GRANTED</span>
                            </div>

                            <div className="space-y-4 relative z-10">
                                <div>
                                    <label className="text-emerald-200 text-[10px] font-bold uppercase tracking-wider">Member Name</label>
                                    <p className="text-2xl font-bold text-white">{scanResult.name}</p>
                                </div>
                                <div>
                                    <label className="text-emerald-200 text-[10px] font-bold uppercase tracking-wider">Member ID</label>
                                    <p className="font-mono text-lg text-white/90">{scanResult.id}</p>
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-white/20">
                                <div className="flex items-center gap-2 mb-2">
                                    <Terminal size={12} className="text-emerald-200" />
                                    <span className="text-[10px] text-emerald-200 uppercase font-bold">Decrypted Stream</span>
                                </div>
                                <p className="font-mono text-[10px] text-emerald-100 break-all leading-tight opacity-70">
                                    {scanResult.raw_encrypted_data}
                                </p>
                            </div>
                        </div>
                    ) : (
                        scanError && (
                            <div className="bg-red-600 rounded-3xl p-6 shadow-2xl text-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                                <AlertCircle size={48} className="mx-auto mb-4 text-white animate-bounce" />
                                <h2 className="text-2xl font-black text-white mb-1">ACCESS DENIED</h2>
                                <p className="text-red-100 text-sm">{scanError}</p>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}
