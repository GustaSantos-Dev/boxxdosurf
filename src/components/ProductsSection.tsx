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
        className="py-20 bg-black px-6 md:px-12"
        id="collection"
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-2">
            {activeBrand !== "all" ? activeBrand : "Toda a Coleção"}
          </p>
          <h2
            className="text-3xl md:text-5xl font-black text-white"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {activeBrand !== "all" ? `${activeBrand} Collection` : "Nossa Vitrine"}
          </h2>
          <p className="text-white/40 mt-3 text-sm">
            {filtered.length} produto{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap gap-2 justify-center mb-10"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-white text-black"
                  : "bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white"
              }`}
              style={{ fontFamily: "'Montserrat', sans-serif" }}
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
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 max-w-7xl mx-auto"
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
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-white/40 text-lg">
                Nenhum produto encontrado para esse filtro.
              </p>
              <p className="text-white/20 text-sm mt-2">
                Tente outra marca ou categoria.
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
