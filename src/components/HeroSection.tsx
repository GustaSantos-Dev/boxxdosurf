"use client";

import { useEffect, useRef, useState, TouchEvent, WheelEvent } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface HeroSectionProps {
  onScrollToProducts: () => void;
}

export default function HeroSection({ onScrollToProducts }: HeroSectionProps) {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState<boolean>(false);
  const [touchStartY, setTouchStartY] = useState<number>(0);
  const [isMobileState, setIsMobileState] = useState<boolean>(false);

  const sectionRef = useRef<HTMLDivElement | null>(null);

  // A sua imagem original do projeto
  const bgImageSrc = "https://images.unsplash.com/photo-1617331721458-bd3bd3f9c7f8?q=80&w=2400&auto=format&fit=crop";

  useEffect(() => {
    const handleWheel = (e: globalThis.WheelEvent) => {
      if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollDelta = e.deltaY * 0.0009;
        const newProgress = Math.min(Math.max(scrollProgress + scrollDelta, 0), 1);
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
        }
      }
    };

    const handleTouchStart = (e: globalThis.TouchEvent) => {
      setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e: globalThis.TouchEvent) => {
      if (!touchStartY) return;
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollFactor = deltaY < 0 ? 0.008 : 0.005;
        const scrollDelta = deltaY * scrollFactor;
        const newProgress = Math.min(Math.max(scrollProgress + scrollDelta, 0), 1);
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
        }
        setTouchStartY(touchY);
      }
    };

    const handleTouchEnd = () => setTouchStartY(0);

    const handleScroll = () => {
      if (!mediaFullyExpanded) window.scrollTo(0, 0);
    };

    window.addEventListener("wheel", handleWheel as unknown as EventListener, { passive: false });
    window.addEventListener("scroll", handleScroll as EventListener);
    window.addEventListener("touchstart", handleTouchStart as unknown as EventListener, { passive: false });
    window.addEventListener("touchmove", handleTouchMove as unknown as EventListener, { passive: false });
    window.addEventListener("touchend", handleTouchEnd as EventListener);

    return () => {
      window.removeEventListener("wheel", handleWheel as unknown as EventListener);
      window.removeEventListener("scroll", handleScroll as EventListener);
      window.removeEventListener("touchstart", handleTouchStart as unknown as EventListener);
      window.removeEventListener("touchmove", handleTouchMove as unknown as EventListener);
      window.removeEventListener("touchend", handleTouchEnd as EventListener);
    };
  }, [scrollProgress, mediaFullyExpanded, touchStartY]);

  useEffect(() => {
    const checkIfMobile = () => setIsMobileState(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Cálculos de expansão (Tamanho da imagem e afastamento do texto)
  const mediaWidth = 300 + scrollProgress * (isMobileState ? 650 : 1250);
  const mediaHeight = 400 + scrollProgress * (isMobileState ? 200 : 400);
  const textTranslateX = scrollProgress * (isMobileState ? 180 : 150);

  return (
    <section ref={sectionRef} className="relative bg-black transition-colors duration-700 ease-in-out overflow-x-hidden min-h-[100dvh]">
      <div className="relative w-full flex flex-col items-center min-h-[100dvh]">
        
        {/* Fundo Desfocado que some no Scroll */}
        <motion.div
          className="absolute inset-0 z-0 h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 - scrollProgress }}
          transition={{ duration: 0.1 }}
        >
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat opacity-30"
            style={{ backgroundImage: `url('${bgImageSrc}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />
        </motion.div>

        <div className="container mx-auto flex flex-col items-center justify-start relative z-10">
          <div className="flex flex-col items-center justify-center w-full h-[100dvh] relative">
            
            {/* Imagem Central que Expande */}
            <div
              className="absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-none rounded-2xl overflow-hidden"
              style={{
                width: `${mediaWidth}px`,
                height: `${mediaHeight}px`,
                maxWidth: "95vw",
                maxHeight: "85vh",
                boxShadow: "0px 0px 50px rgba(0, 0, 0, 0.8)",
              }}
            >
              <div className="relative w-full h-full pointer-events-none">
                <Image 
                  src={bgImageSrc} 
                  alt="BOXXDOSURF" 
                  fill 
                  className="object-cover" 
                  priority 
                />
                <motion.div
                  className="absolute inset-0 bg-black/40"
                  initial={{ opacity: 0.6 }}
                  animate={{ opacity: 0.6 - scrollProgress * 0.4 }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </div>

            {/* Conteúdo Original do seu Site */}
            <div className="flex flex-col items-center justify-center text-center w-full relative z-10 mix-blend-normal pointer-events-none">
              
              {/* Letreiro que se separa no Scroll */}
              <div className="flex flex-row items-center justify-center gap-2 w-full">
                <motion.h1
                  className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-wider uppercase text-glow"
                  style={{ 
                    fontFamily: "var(--font-heading)",
                    transform: `translateX(-${textTranslateX}vw)`
                  }}
                >
                  BOXX
                </motion.h1>
                <motion.h1
                  className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-wider uppercase text-glow"
                  style={{ 
                    fontFamily: "var(--font-heading)",
                    transform: `translateX(${textTranslateX}vw)`
                  }}
                >
                  <span className="text-gold">DO</span>SURF
                </motion.h1>
              </div>

              {/* Subtítulo (Sobe e desaparece suavemente) */}
              <motion.p
                className="text-white/80 text-sm md:text-lg tracking-[0.2em] uppercase mt-6 max-w-2xl font-light pointer-events-auto"
                style={{ 
                  fontFamily: "'Inter', sans-serif",
                  opacity: 1 - scrollProgress * 2, // Desaparece rápido ao rolar
                  y: scrollProgress * -50 // Sobe um pouco
                }}
              >
                O Alto Padrão da Quebrada. <br className="hidden md:block" />
                <span className="text-gold font-medium mt-2 block tracking-[0.2em]">Cultura, Esporte e Streetwear.</span>
              </motion.p>

              {/* Botão de Comprar Original */}
              <motion.button
                onClick={onScrollToProducts}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gold text-[#111111] px-12 py-4 mt-8 text-sm font-bold tracking-[0.15em] uppercase transition-all duration-300 hover:bg-white pointer-events-auto"
                style={{ 
                  fontFamily: "'Inter', sans-serif",
                  opacity: 1 - scrollProgress * 2,
                  y: scrollProgress * -50
                }}
              >
                Comprar Agora
              </motion.button>
            </div>

            {/* Indicador de Scroll Original */}
            <motion.div
              className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
              style={{ opacity: 1 - scrollProgress * 2 }}
            >
              <span className="text-white/60 text-[10px] tracking-[0.2em] uppercase">Scroll</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-[1px] h-12 bg-white/40"
              />
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}