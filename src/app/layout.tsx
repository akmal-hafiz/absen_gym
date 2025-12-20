import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "StenoGym - Secure Attendance",
    description: "Cryptography Gym Attendance System",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body style={{ margin: 0, fontFamily: 'system-ui, -apple-system, sans-serif' }}>{children}</body>
        </html>
    );
}
