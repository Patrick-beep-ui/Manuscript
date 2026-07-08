import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Manuscript | Generador de Documentos",
  description: "Genera documentos académicos y profesionales en PDF con diseño premium.",
  icons: {
    icon: "/images/manuscript_logo.png",
  },
  openGraph: {
    title: "Manuscript | Generador de Documentos",
    description: "Genera documentos académicos y profesionales en PDF con diseño premium.",
    url: "https://manuscriptapp.vercel.app/",
    siteName: "Manuscript",
    images: [
      {
        url: "/images/manuscript_logo.png",
        width: 1200,
        height: 630,
        alt: "Manuscript - Generador de Documentos",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
