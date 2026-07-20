"use client";

import { motion } from "framer-motion";
import {
  NikeLogo,
  AdidasLogo,
  PumaLogo,
  NewBalanceLogo,
  LacosteLogoSVG,
  PoloWearLogo,
  OakleyLogo,
  FilaLogo,
  OnbongoLogo,
} from "./BrandLogos";

interface BrandsSectionProps {
  activeBrand: string;
  onSelectBrand: (brand: string) => void;
}

const BRAND_CONFIG = [
  { id: "all", label: "Todas as Marcas", Logo: null },
  { id: "Nike", label: "Nike", Logo: NikeLogo },
  { id: "Adidas", label: "Adidas", Logo: AdidasLogo },
  { id: "Puma", label: "Puma", Logo: PumaLogo },
  { id: "New Balance", label: "New Balance", Logo: NewBalanceLogo },
  { id: "Lacoste", label: "Lacoste", Logo: LacosteLogoSVG },
  { id: "Polo Wear", label: "Polo Wear", Logo: PoloWearLogo },
  { id: "Oakley", label: "Oakley", Logo: OakleyLogo },
  { id: "Fila", label: "Fila", Logo: FilaLogo },
  { id: "Onbongo", label: "Onbongo", Logo: OnbongoLogo },
];

// Marquee items (duplicated for seamless loop)
const MARQUEE_BRANDS = [
  { id: "Nike", Logo: NikeLogo },
  { id: "Adidas", Logo: AdidasLogo },
  { id: "Puma", Logo: PumaLogo },
  { id: "New Balance", Logo: NewBalanceLogo },
  { id: "Lacoste", Logo: LacosteLogoSVG },
  { id: "Polo Wear", Logo: PoloWearLogo },
  { id: "Oakley", Logo: OakleyLogo },
  { id: "Fila", Logo: FilaLogo },
  { id: "Onbongo", Logo: OnbongoLogo },
];

export default function BrandsSection({
  activeBrand,
  onSelectBrand,
}: BrandsSectionProps) {
  return (
    <section className="py-16 bg-[#080808] border-y border-white/5">
      {/* Section title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10 px-6"
      >
        <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-2">
          Parceiros Oficiais
        </p>
        <h2
          className="text-3xl md:text-4xl font-black text-white"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Marcas Parceiras
        </h2>
      </motion.div>

      {/* Marquee */}
      <div className="overflow-hidden mb-12 relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 z-10 bg-gradient-to-r from-[#080808] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 z-10 bg-gradient-to-l from-[#080808] to-transparent pointer-events-none" />

        <div className="flex marquee-track" style={{ width: "max-content" }}>
          {[...MARQUEE_BRANDS, ...MARQUEE_BRANDS].map((brand, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center mx-8 opacity-20 hover:opacity-60 transition-opacity duration-300"
              style={{ minWidth: "120px", height: "48px" }}
            >
              <brand.Logo className="h-8 w-auto text-white" />
            </div>
          ))}
        </div>
      </div>

      {/* Clickable brand filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="px-6 md:px-12"
      >
        <p className="text-white/30 text-xs tracking-widest uppercase text-center mb-6">
          Filtrar por Marca
        </p>
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {BRAND_CONFIG.map((brand) => {
            const isActive = activeBrand === brand.id;
            return (
              <motion.button
                key={brand.id}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onSelectBrand(brand.id)}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 overflow-hidden ${
                  isActive
                    ? "bg-white text-black"
                    : "bg-white/5 text-white/70 border border-white/10 hover:bg-white/10 hover:text-white"
                }`}
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {isActive && (
                  <motion.div
                    layoutId="brand-active-bg"
                    className="absolute inset-0 bg-white"
                    style={{ borderRadius: "9999px" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {brand.Logo && (
                  <span className="relative z-10 w-8 h-5 flex items-center">
                    <brand.Logo
                      className={`h-full w-auto ${isActive ? "text-black" : "text-white"}`}
                    />
                  </span>
                )}
                <span className="relative z-10">{brand.label}</span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
