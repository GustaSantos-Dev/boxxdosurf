"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroller({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 1. Registra o ScrollTrigger no GSAP
    gsap.registerPlugin(ScrollTrigger);

    // 2. Inicializa o Lenis
    const lenis = new Lenis();

    // 3. Sincroniza o Lenis com o ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // 4. Conecta o requestAnimationFrame do Lenis ao Ticker do GSAP
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // 5. Desabilita o lag smoothing para evitar problemas de sincronia
    gsap.ticker.lagSmoothing(0);

    return () => {
      // Limpeza na desmontagem
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  return <>{children}</>;
}
