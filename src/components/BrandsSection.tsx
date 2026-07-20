"use client";

import { motion } from "framer-motion";

interface BrandsSectionProps {
  activeBrand: string;
  onSelectBrand: (brand: string) => void;
}

export default function BrandsSection({
  activeBrand,
  onSelectBrand,
}: BrandsSectionProps) {
  const brands = [
    { id: "all", label: "Tudo" },
    { id: "Nike", label: "Nike" },
    { id: "Adidas", label: "Adidas" },
    { id: "Puma", label: "Puma" },
    { id: "New Balance", label: "New Balance" },
    { id: "Lacoste", label: "Lacoste" },
    { id: "Polo Wear", label: "Polo Wear" },
    { id: "Oakley", label: "Oakley" },
    { id: "Fila", label: "Fila" },
    { id: "Onbongo", label: "Onbongo" },
  ];

  return (
    <section className="py-24 bg-gray-50 border-y border-gray-100">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2
            className="text-3xl md:text-5xl font-bold text-[#111111] tracking-wider uppercase"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Nossas Marcas
          </h2>
          <div className="w-12 h-[2px] bg-gold mx-auto mt-6" />
        </motion.div>

        {/* Clickable brand filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 max-w-5xl mx-auto">
            {brands.map((brand) => {
              const isActive = activeBrand === brand.id;
              return (
                <button
                  key={brand.id}
                  onClick={() => onSelectBrand(brand.id)}
                  className={`text-xs md:text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 ${
                    isActive
                      ? "text-[#111111] border-b-2 border-gold pb-1"
                      : "text-gray-400 hover:text-gold pb-1"
                  }`}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {brand.label}
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
