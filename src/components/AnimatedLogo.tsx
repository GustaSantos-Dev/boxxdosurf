"use client";

import { motion, type Variants } from "framer-motion";

interface AnimatedLogoProps {
  size?: "sm" | "md" | "lg";
}

export default function AnimatedLogo({ size = "md" }: AnimatedLogoProps) {
  const scales = { sm: 0.55, md: 0.85, lg: 1.2 };
  const scale = scales[size];

  const letters = "BOXXDOSURF".split("");

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.06, delayChildren: 0.1 } as never,
    },
  };

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: "easeOut" as const },
    },
  };

  const makeDrawVariants = (delay: number): Variants => ({
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeInOut" as const, delay },
    },
  });

  return (
    <div
      style={{
        width: `${265 * scale}px`,
        height: `${54 * scale}px`,
        position: "relative",
      }}
      className="flex-shrink-0"
    >
      <motion.div
        className="flex items-center gap-1 select-none cursor-pointer absolute top-0 left-0"
        style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}
        whileHover={{
          filter:
            "drop-shadow(0 0 8px rgba(255,255,255,0.9)) drop-shadow(0 0 24px rgba(255,255,255,0.45))",
          transition: { duration: 0.3 },
        }}
      >
        {/* BOXXDOSURF text */}
      <motion.div
        className="flex items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            variants={letterVariants}
            style={{
              fontFamily: "'Orbitron', monospace",
              fontWeight: 900,
              fontSize: "28px",
              letterSpacing: "0.05em",
              color: "#ffffff",
              lineHeight: 1,
            }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>

      {/* SVG: Cabana + Palmeiras */}
      <motion.svg
        width="90"
        height="54"
        viewBox="0 0 90 54"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial="hidden"
        animate="visible"
        style={{ marginLeft: "6px" }}
      >
        {/* ===== CABANA ===== */}
        {/* Telhado - ponta afiada */}
        <motion.path
          d="M2 31 L22 8 L42 31"
          stroke="#ffffff"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          variants={makeDrawVariants(0.7)}
        />
        {/* Barra horizontal do telhado */}
        <motion.path
          d="M0 31 L44 31"
          stroke="#ffffff"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
          variants={makeDrawVariants(1.1)}
        />
        {/* Pilares verticais */}
        {([7, 12, 17, 22, 27, 32, 37] as number[]).map((x, idx) => (
          <motion.line
            key={idx}
            x1={x}
            y1="31"
            x2={x}
            y2="51"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
            variants={makeDrawVariants(1.3 + idx * 0.05)}
          />
        ))}
        {/* Base da cabana */}
        <motion.line
          x1="5"
          y1="51"
          x2="39"
          y2="51"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          variants={makeDrawVariants(1.7)}
        />

        {/* ===== PALMEIRAS ===== */}
        {/* Tronco esquerdo (inclinado para direita) */}
        <motion.path
          d="M52 52 C54 43, 58 34, 63 18"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          variants={makeDrawVariants(0.7)}
        />
        {/* Tronco direito (inclinado para esquerda, cruzando) */}
        <motion.path
          d="M76 52 C74 43, 70 34, 65 18"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          variants={makeDrawVariants(0.85)}
        />
        {/* Folhas palmeira esquerda */}
        <motion.path
          d="M63 18 C58 10, 50 6, 48 4 M63 18 C60 9, 56 2, 52 0 M63 18 C65 9, 66 4, 68 1 M63 18 C68 12, 74 10, 76 8"
          stroke="#ffffff"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
          variants={makeDrawVariants(1.55)}
        />
        {/* Folhas palmeira direita */}
        <motion.path
          d="M65 18 C62 10, 58 4, 56 2 M65 18 C67 9, 70 3, 73 1 M65 18 C70 10, 76 7, 80 6 M65 18 C60 12, 54 10, 50 10"
          stroke="#ffffff"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
          variants={makeDrawVariants(1.75)}
        />
      </motion.svg>
      </motion.div>
    </div>
  );
}
