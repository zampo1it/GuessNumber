import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
//import Navbar from "@/components/Navbar";
import Script from "next/script";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Guess The Number Game",
  description: "Try to guess the number!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/number-picker-swiper/number-swiper.css" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}

        {/* Подключение number-swiper.js безопасно для Next.js */}
        <Script
          src="/number-picker-swiper/number-swiper.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}