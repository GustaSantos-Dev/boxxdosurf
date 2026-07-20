import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Oswald, Orbitron } from "next/font/google";
import SmoothScroller from "@/components/SmoothScroller";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });

export const metadata: Metadata = {
  title: "BOXXDOSURF | Moda Masculina e Streetwear",
  description:
    "Tudo o que você precisa dos pés à cabeça. Peças de qualidade e preço baixo. Nike, Adidas, Puma, Lacoste e muito mais.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${oswald.variable} ${orbitron.variable} bg-white text-[#111111] antialiased overflow-x-hidden selection:bg-[#C5A059] selection:text-white texture-street`}>
        <SmoothScroller>{children}</SmoothScroller>
      </body>
    </html>
  );
}
