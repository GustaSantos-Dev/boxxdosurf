"use client";

import { useState, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "./ProductCard";
import { Product, CartItem } from "@/types";
import { PRODUCTS, CATEGORIES } from "@/data/products";

interface ProductsSectionProps {
  activeBrand: string;
  searchQuery: string;
  onAddToCart: (product: Product, color: string, size: string) => void;
  onOpenProduct: (product: Product) => void;
}

const ProductsSection = forwardRef<HTMLElement, ProductsSectionProps>(
  ({ activeBrand, searchQuery, onAddToCart, onOpenProduct }, ref) => {
    const [activeCategory, setActiveCategory] = useState("Todas");

    const filtered = PRODUCTS.filter((p) => {
      const brandMatch = activeBrand === "all" || p.brand === activeBrand;
      const catMatch = activeCategory === "Todas" || p.category === activeCategory;
      const searchMatch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return brandMatch && catMatch && searchMatch;
    });

    return (
      <section
        ref={ref}
        className="py-24 bg-white px-6 md:px-12"
        id="collection"
      >
        {/* Section Header */}
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
            {activeBrand !== "all" ? `${activeBrand} Collection` : "Seleção de Respeito"}
          </h2>
          <div className="w-12 h-[2px] bg-gold mx-auto mt-6" />
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap gap-8 justify-center mb-16"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs font-bold tracking-[0.15em] uppercase transition-all duration-300 ${
                activeCategory === cat
                  ? "text-[#111111] border-b-2 border-gold pb-1"
                  : "text-gray-400 hover:text-gold pb-1"
              }`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Product Grid */}
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key={`${activeBrand}-${activeCategory}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16 max-w-[1400px] mx-auto"
            >
              {filtered.map((product, idx) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={idx}
                  onAddToCart={onAddToCart}
                  onClick={() => onOpenProduct(product)}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <p className="text-gray-400 text-sm tracking-widest uppercase mb-2">
                Nenhum produto encontrado
              </p>
              <p className="text-gray-300 text-xs tracking-widest uppercase">
                Tente outra busca.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    );
  }
);

ProductsSection.displayName = "ProductsSection";

export default ProductsSection;
