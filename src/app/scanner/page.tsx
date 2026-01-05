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
    FileImage,
    XCircle
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
            await new Promise(r => setTimeout(r, 1500));

            const response = await fetch(`${API_URL}/verify-card`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (data.status === 'success') {
                setScanResult(data);
            } else {
                setScanError(data.reason || 'Verifikasi gagal');
            }
        } catch (err) {
            setScanError("Gagal terhubung ke server");
        } finally {
            setIsScanning(false);
        }
    };

    const resetScanner = () => {
        setScanFile(null);
        setScanResult(null);
        setScanError(null);
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">

            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

            {/* Dynamic Glow based on result */}
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[120px] pointer-events-none transition-colors duration-500 ${scanResult ? 'bg-lime-500/20' : scanError ? 'bg-red-500/20' : 'bg-lime-500/10'
                }`} />

            <Link href="/" className="absolute top-6 left-6 text-zinc-500 hover:text-white flex items-center gap-2 transition-colors z-20">
                <ArrowLeft size={18} /> Kembali
            </Link>

            <div className="w-full max-w-md relative z-10">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className={`inline-block p-4 rounded-2xl border mb-4 transition-all ${scanResult ? 'bg-lime-500/10 border-lime-500/30' :
                            scanError ? 'bg-red-500/10 border-red-500/30' :
                                'bg-zinc-900 border-zinc-800'
                        }`}>
                        <ScanLine size={36} className={`transition-colors ${scanResult ? 'text-lime-500' :
                                scanError ? 'text-red-500' :
                                    'text-lime-500'
                            } ${isScanning ? 'animate-pulse' : ''}`} />
                    </div>
                    <h1 className="text-2xl font-bold mb-1">Scanner</h1>
                    <p className="text-zinc-500 text-sm">Upload kartu member untuk verifikasi</p>
                </div>

                {/* Scanner Card */}
                <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
                    <form onSubmit={handleScanSubmit} className="space-y-5">
                        <div>
                            <input
                                type="file"
                                onChange={(e) => setScanFile(e.target.files ? e.target.files[0] : null)}
                                className="hidden"
                                id="scan-upload"
                                accept="image/png, image/jpeg"
                            />
                            <label
                                htmlFor="scan-upload"
                                className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl py-10 cursor-pointer transition-all relative overflow-hidden ${scanFile ? 'border-lime-500/50 bg-lime-500/5' : 'border-zinc-800 hover:border-zinc-700'
                                    }`}
                            >
                                {scanFile ? (
                                    <>
                                        <img
                                            src={URL.createObjectURL(scanFile)}
                                            className="w-full h-full absolute inset-0 object-cover opacity-30 blur-sm"
                                            alt="preview"
                                        />
                                        <div className="relative z-10 text-center">
                                            <FileImage size={28} className="mx-auto mb-2 text-lime-400" />
                                            <span className="text-sm font-medium text-white">{scanFile.name}</span>
                                            <span className="text-xs text-lime-500/60 block mt-1">Klik untuk ganti</span>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="p-3 bg-zinc-900 rounded-xl mb-3 border border-zinc-800">
                                            <ScanLine className="text-zinc-600" size={24} />
                                        </div>
                                        <span className="text-sm text-zinc-400">Upload kartu member</span>
                                        <span className="text-xs text-zinc-600">Format PNG atau JPG</span>
                                    </>
                                )}
                            </label>
                        </div>

                        <button
                            disabled={!scanFile || isScanning}
                            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${isScanning
                                    ? 'bg-zinc-800 text-zinc-500'
                                    : 'bg-lime-500 text-black hover:bg-lime-400'
                                }`}
                        >
                            {isScanning ? (
                                <>
                                    <Loader2 className="animate-spin" size={18} /> Memverifikasi...
                                </>
                            ) : (
                                'Verifikasi'
                            )}
                        </button>
                    </form>
                </div>

                {/* Result */}
                <div className={`transition-all duration-300 overflow-hidden ${scanResult || scanError ? 'max-h-[500px] mt-5' : 'max-h-0'}`}>
                    {scanResult ? (
                        <div className="bg-lime-500 rounded-2xl p-5 relative overflow-hidden">
                            <div className="absolute top-3 right-3 opacity-10">
                                <ShieldCheck size={80} />
                            </div>

                            <div className="flex items-center gap-2 mb-4">
                                <CheckCircle2 size={20} className="text-black" />
                                <span className="font-bold text-black text-sm">AKSES DITERIMA</span>
                            </div>

                            <div className="space-y-3 relative z-10">
                                <div>
                                    <span className="text-lime-900 text-xs font-medium">Nama Member</span>
                                    <p className="text-xl font-bold text-black">{scanResult.name}</p>
                                </div>
                                <div>
                                    <span className="text-lime-900 text-xs font-medium">ID Member</span>
                                    <p className="font-mono text-black">{scanResult.id}</p>
                                </div>
                            </div>

                            <div className="mt-4 pt-3 border-t border-lime-600/30">
                                <div className="flex items-center gap-2 mb-1">
                                    <Terminal size={12} className="text-lime-900" />
                                    <span className="text-xs text-lime-900 font-medium">Encrypted Payload</span>
                                </div>
                                <p className="font-mono text-[10px] text-lime-800 break-all">
                                    {scanResult.raw_encrypted_data}
                                </p>
                            </div>

                            <button
                                onClick={resetScanner}
                                className="w-full mt-4 py-2 bg-black text-lime-500 rounded-lg font-medium text-sm hover:bg-zinc-900 transition-colors"
                            >
                                Scan Lagi
                            </button>
                        </div>
                    ) : scanError && (
                        <div className="bg-red-500 rounded-2xl p-5 text-center relative overflow-hidden">
                            <XCircle size={40} className="mx-auto mb-3 text-white" />
                            <h2 className="text-lg font-bold text-white mb-1">AKSES DITOLAK</h2>
                            <p className="text-red-100 text-sm">{scanError}</p>

                            <button
                                onClick={resetScanner}
                                className="w-full mt-4 py-2 bg-black text-red-500 rounded-lg font-medium text-sm hover:bg-zinc-900 transition-colors"
                            >
                                Coba Lagi
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
