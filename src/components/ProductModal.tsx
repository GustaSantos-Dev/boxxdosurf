"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ShoppingCart, Check } from "lucide-react";
import { Product } from "@/types";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, color: string, size: string) => void;
}

export default function ProductModal({
  product,
  onClose,
  onAddToCart,
}: ProductModalProps) {
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [added, setAdded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAdd = () => {
    if (!product) return;
    const color = selectedColor || product.colors[0];
    const size = selectedSize || product.sizes[0];
    onAddToCart(product, color, size);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // Reset state when product changes
  if (product && selectedColor === "" && selectedSize === "") {
    // will be handled by effect, but this is fine for initialization
  }

  const discount =
    product && product.originalPrice
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) * 100
        )
      : 0;

  return (
    <AnimatePresence>
      {product && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ type: "spring", stiffness: 300, damping: 35 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl bg-[#0d0d0d] border border-white/10 rounded-3xl z-50 overflow-hidden flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh]"
          >
            {/* Image Side */}
            <div className="relative w-full md:w-5/12 h-56 md:h-auto flex-shrink-0 bg-[#111]">
              {/* Color accent top */}
              <div
                className="absolute top-0 left-0 right-0 h-1 z-10"
                style={{
                  background: `linear-gradient(135deg, ${product.colors.join(", ")})`,
                }}
              />
              {product.badge && (
                <div className="absolute top-4 left-4 z-20 bg-white text-black text-xs font-black px-3 py-1 rounded-full tracking-wider">
                  {product.badge}
                </div>
              )}
              {discount > 0 && (
                <div className="absolute top-4 right-14 z-20 bg-red-500 text-white text-xs font-black px-2 py-1 rounded-full">
                  -{discount}%
                </div>
              )}
              {!imageError ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  onError={() => setImageError(true)}
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, #111 0%, #1a1a1a 100%)`,
                  }}
                >
                  <div
                    className="w-24 h-24 rounded-full flex items-center justify-center text-4xl font-black"
                    style={{
                      background: `linear-gradient(135deg, ${product.colors.join(", ")})`,
                      color: "#fff",
                    }}
                  >
                    {product.brand[0]}
                  </div>
                </div>
              )}
            </div>

            {/* Content Side */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col">
              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all"
                aria-label="Fechar"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex-1">
                {/* Brand + Category */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-white/40 text-xs font-bold tracking-widest uppercase">
                    {product.brand}
                  </span>
                  <span className="text-white/20">•</span>
                  <span className="text-white/30 text-xs">{product.category}</span>
                </div>

                {/* Name */}
                <h2
                  className="text-white font-black text-xl md:text-2xl leading-snug mb-3 break-words"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {product.name}
                </h2>

                {/* Description */}
                <p className="text-white/50 text-sm leading-relaxed mb-5 whitespace-normal">
                  {product.description}
                </p>

                {/* Price */}
                <div className="mb-5">
                  {product.originalPrice && (
                    <p className="text-white/30 text-sm line-through">
                      R$ {product.originalPrice.toFixed(2).replace(".", ",")}
                    </p>
                  )}
                  <p
                    className="text-white font-black text-3xl"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    R$ {product.price.toFixed(2).replace(".", ",")}
                  </p>
                  {discount > 0 && (
                    <p className="text-green-400 text-xs font-semibold mt-0.5">
                      Economia de R$ {(product.originalPrice! - product.price).toFixed(2).replace(".", ",")}
                    </p>
                  )}
                </div>

                {/* Color Selection */}
                <div className="mb-5">
                  <p className="text-white/50 text-xs font-semibold tracking-wider uppercase mb-2">
                    Cor
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {product.colors.map((color) => {
                      const active = (selectedColor || product.colors[0]) === color;
                      return (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                            active
                              ? "border-white scale-110 shadow-lg"
                              : "border-white/20 hover:border-white/50"
                          }`}
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Size Selection */}
                <div className="mb-6">
                  <p className="text-white/50 text-xs font-semibold tracking-wider uppercase mb-2">
                    Tamanho
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((sz) => {
                      const active = (selectedSize || product.sizes[0]) === sz;
                      return (
                        <button
                          key={sz}
                          onClick={() => setSelectedSize(sz)}
                          className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all duration-200 ${
                            active
                              ? "bg-white text-black border-white"
                              : "bg-transparent text-white/50 border-white/15 hover:border-white/40 hover:text-white"
                          }`}
                        >
                          {sz}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Add to Cart CTA */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAdd}
                className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-base tracking-wide transition-all duration-300 ${
                  added
                    ? "bg-green-500 text-white"
                    : "bg-white text-black hover:bg-white/90"
                }`}
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                <AnimatePresence mode="wait">
                  {added ? (
                    <motion.span
                      key="added"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Check className="w-5 h-5" />
                      Adicionado ao Carrinho!
                    </motion.span>
                  ) : (
                    <motion.span
                      key="add"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Adicionar ao Carrinho
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
