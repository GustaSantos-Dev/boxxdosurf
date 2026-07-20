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

  const pitchWords = ["Tudo", "o", "que", "você", "precisa"];

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black"
    >
      {/* Animated grid background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glow center */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 70%)",
            "radial-gradient(ellipse 80% 65% at 50% 50%, rgba(255,255,255,0.07) 0%, transparent 70%)",
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 70%)",
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Parallax content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 flex flex-col items-center text-center px-6 md:px-12 w-full max-w-5xl mx-auto"
      >
        {/* Big Logo for Hero */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-10"
        >
          <AnimatedLogo size="lg" />
        </motion.div>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="w-24 h-px bg-white/40 mb-10"
        />

        {/* Main pitch - line 1 */}
        <div className="overflow-hidden mb-2">
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.0, ease: "easeOut" }}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Tudo o que você precisa
          </motion.h1>
        </div>

        {/* Main pitch - line 2 */}
        <div className="overflow-hidden mb-2">
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.15, ease: "easeOut" }}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            <span className="text-white/60">dos pés à cabeça,</span>
          </motion.h1>
        </div>

        {/* Main pitch - line 3 */}
        <div className="overflow-hidden mb-6">
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.3, ease: "easeOut" }}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            você encontra aqui.
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6, ease: "easeOut" }}
          className="text-white/60 text-lg md:text-xl max-w-xl leading-relaxed mb-10"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Peças de qualidade e preço baixo. As melhores marcas do mercado em um só lugar.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8, ease: "easeOut" }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 30px rgba(255,255,255,0.3), 0 0 60px rgba(255,255,255,0.1)",
          }}
          whileTap={{ scale: 0.97 }}
          onClick={onScrollToProducts}
          className="relative group bg-white text-black px-10 py-4 rounded-full font-bold text-lg tracking-wide overflow-hidden"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-white via-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
          <span className="relative">Ver Coleção →</span>
        </motion.button>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-12 bg-gradient-to-b from-white/60 to-transparent"
          />
          <span className="text-white/30 text-xs tracking-widest uppercase">scroll</span>
        </motion.div>
      </motion.div>

      {/* Side decorations */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-40 bg-gradient-to-b from-transparent via-white to-transparent"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-40 bg-gradient-to-b from-transparent via-white to-transparent"
      />
    </section>
  );
}
