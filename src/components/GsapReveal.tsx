"use client";

import { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface GsapRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function GsapReveal({ children, className = "", delay = 0 }: GsapRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const element = containerRef.current;
    if (!element) return;

    // Regra de Ouro: Animando apenas opacidade e transform (y)
    const animation = gsap.fromTo(
      element,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: delay,
        ease: "power3.out", // smooth easing natural
        scrollTrigger: {
          trigger: element,
          start: "top 85%", // Inicia a animação quando o topo do elemento chega a 85% da tela
          once: true, // Anima apenas uma vez
        },
      }
    );

    // Cleanup caso o componente seja desmontado
    return () => {
      if (animation.scrollTrigger) {
        animation.scrollTrigger.kill();
      }
      animation.kill();
    };
  }, [delay]);

  return (
    <div ref={containerRef} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
