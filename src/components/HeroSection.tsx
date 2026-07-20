"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import AnimatedLogo from "./AnimatedLogo";

interface HeroSectionProps {
  onScrollToProducts: () => void;
}

export default function HeroSection({ onScrollToProducts }: HeroSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black"
    >
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 z-0 overflow-hidden"
        style={{ y }}
      >
        <motion.div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: "easeOut" }}
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1617331721458-bd3bd3f9c7f8?q=80&w=2400&auto=format&fit=crop')",
          }}
        />
        {/* Gradient Overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
      </motion.div>

      {/* Parallax content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 flex flex-col items-center text-center px-6 md:px-12 w-full max-w-5xl mx-auto mt-20"
      >
        {/* Main Title for Hero */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6"
        >
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-wider uppercase text-glow"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            BOXX<span className="text-gold">DO</span>SURF
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-white/80 text-sm md:text-lg tracking-[0.2em] uppercase mb-12 max-w-2xl font-light"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          O Alto Padrão da Quebrada. <br className="hidden md:block" />
          <span className="text-gold font-medium mt-2 block tracking-[0.2em]">Cultura, Esporte e Streetwear.</span>
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onScrollToProducts}
          className="bg-gold text-[#111111] px-12 py-4 text-sm font-bold tracking-[0.15em] uppercase transition-all duration-300 hover:bg-white"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Comprar Agora
        </motion.button>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
      >
        <span className="text-white/60 text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-white/40"
        />
      </motion.div>
    </section>
  );
}
