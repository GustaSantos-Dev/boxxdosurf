"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
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
  const [currentImage, setCurrentImage] = useState<string>("");
  const [lastProductId, setLastProductId] = useState<string>("");

  if (product && product.id !== lastProductId) {
    setLastProductId(product.id);
    setCurrentImage(product.image);
    setImageError(false);
  }

  const handleAdd = () => {
    if (!product) return;
    const color = selectedColor || product.colors[0];
    const size = selectedSize || product.sizes[0];
    onAddToCart(product, color, size);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const discount =
    product && product.originalPrice
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) * 100
        )
      : 0;

  const isSpecialProduct = product?.name === 'Shorts de Treino Strike Dri-FIT';

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
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          {/* Modal com Escudo de Scroll adicionado */}
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-x-0 bottom-0 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-4xl bg-white z-50 overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-50 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black transition-colors bg-white/80 backdrop-blur-md rounded-full md:bg-transparent md:backdrop-blur-none"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image Side */}
            <div className="relative w-full md:w-1/2 h-[40vh] md:h-auto flex-shrink-0 bg-gray-50">
              {product.badge && (
                <div className="absolute top-4 left-4 z-20 bg-white text-[#111111] text-[10px] font-bold px-3 py-1.5 uppercase tracking-[0.2em]">
                  {product.badge}
                </div>
              )}
              {discount > 0 && (
                <div className="absolute top-4 right-4 z-20 bg-[#111111] text-white text-[10px] font-bold px-3 py-1.5 tracking-wider">
                  -{discount}%
                </div>
              )}
              {!imageError ? (
                <>
                  <img
                    src={isSpecialProduct ? (currentImage || product.image) : product.image}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={() => setImageError(true)}
                  />
                  <div 
                    className="absolute inset-0 mix-blend-color pointer-events-none transition-colors duration-500 opacity-30"
                    style={{ backgroundColor: (isSpecialProduct && selectedColor) ? selectedColor : 'transparent' }}
                  />
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                  {product.brand[0]}
                </div>
              )}
            </div>

            {/* Content Side - Adicionado overscroll-contain */}
            <div className="flex-1 overflow-y-auto overscroll-contain p-6 md:p-12 flex flex-col">
              <div className="flex-1">
                {/* Brand */}
                <div className="mb-2">
                  <span className="block text-gray-500 text-[10px] font-bold tracking-[0.2em] uppercase mb-1.5" style={{ fontFamily: "var(--font-heading)" }}>
                    {product.brand}
                  </span>
                </div>

                {/* Name */}
                <h2
                  className="text-[#111111] font-bold text-xl md:text-3xl leading-relaxed mb-4 uppercase"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {product.name}
                </h2>

                {/* Price */}
                <div className="flex items-center gap-3 mb-6">
                  {product.originalPrice && (
                    <p className="text-gray-400 text-sm line-through">
                      R$ {product.originalPrice.toFixed(2).replace(".", ",")}
                    </p>
                  )}
                  <p className="text-gold font-bold text-xl">
                    R$ {product.price.toFixed(2).replace(".", ",")}
                  </p>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-8">
                  {product.description}
                </p>

                {/* Color Selection */}
                {isSpecialProduct && (
                  <div className="mb-8">
                    <p className="text-[#111111] text-[10px] font-bold tracking-[0.1em] uppercase mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                      Cor
                    </p>
                    <div className="flex items-center gap-2">
                      {product.colors.map((color) => {
                        const active = (selectedColor || product.colors[0]) === color;
                        return (
                          <button
                            key={color}
                            onClick={() => {
                              setSelectedColor(color);
                              if (color.toUpperCase() === "#000000" || color.toUpperCase() === "#111111") {
                                setCurrentImage("/images/shorts-nike-preto.jpg");
                              } else if (color.toUpperCase() === "#1A73E8" || color.toUpperCase() === "#1D3557") {
                                setCurrentImage("/images/shorts-nike-azul.jpg");
                              } else {
                                setCurrentImage(product.image);
                              }
                            }}
                            className={`w-6 h-6 rounded-full border transition-all duration-200 ${
                              active
                                ? "border-gold scale-110"
                                : "border-gray-200 hover:border-gray-400"
                            }`}
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Size Selection */}
                <div className="mb-8">
                  <p className="text-[#111111] text-[10px] font-bold tracking-[0.1em] uppercase mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                    Tamanho
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((sz) => {
                      const active = (selectedSize || product.sizes[0]) === sz;
                      return (
                        <button
                          key={sz}
                          onClick={() => setSelectedSize(sz)}
                          className={`min-w-[40px] h-10 px-3 flex items-center justify-center text-xs font-bold transition-colors ${
                            active
                              ? "bg-gold text-[#111111]"
                              : "bg-gray-50 text-gray-600 hover:bg-gray-200"
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
              <button
                onClick={handleAdd}
                className={`w-full py-4 text-xs font-bold tracking-[0.15em] uppercase transition-all duration-300 ${
                  added
                    ? "bg-green-600 text-white"
                    : "bg-gold text-[#111111] hover:bg-gold-dark"
                }`}
              >
                {added ? "Adicionado" : "Adicionar ao Carrinho"}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}