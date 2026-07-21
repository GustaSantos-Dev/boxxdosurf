"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  onAddToCart: (
    product: Product,
    color: string,
    size: string
  ) => void;
  onClick: () => void;
  index: number;
}

export default function ProductCard({
  product,
  onAddToCart,
  onClick,
  index,
}: ProductCardProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [imageError, setImageError] = useState(false);
  const [currentImage, setCurrentImage] = useState(product.image);

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const isSpecialProduct = product.name === 'Shorts de Treino Strike Dri-FIT';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
      transition={{ duration: 0.8, delay: (index % 4) * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="group flex flex-col h-full cursor-pointer bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] transition-shadow duration-500 border border-gray-100"
      onClick={onClick}
    >
      {/* Image Area */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-100 mb-4 rounded-t-xl">
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-4 left-4 z-20 bg-white text-[#111111] text-[10px] font-bold px-3 py-1.5 uppercase tracking-[0.2em]">
            {product.badge}
          </div>
        )}

        {/* Discount badge */}
        {discount > 0 && (
          <div className="absolute top-4 right-4 z-20 bg-[#111111] text-white text-[10px] font-bold px-3 py-1.5 tracking-wider">
            -{discount}%
          </div>
        )}

        {/* Product Image */}
        {!imageError ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={isSpecialProduct ? currentImage : product.image}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              onError={() => setImageError(true)}
            />
            <div 
              className="absolute inset-0 mix-blend-color pointer-events-none transition-colors duration-500 opacity-30"
              style={{ backgroundColor: (isSpecialProduct && selectedColor) ? selectedColor : 'transparent' }}
            />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-400">
            {product.brand[0]}
          </div>
        )}
        
        {/* Quick Add Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product, selectedColor, selectedSize);
            }}
            className="w-full bg-gold text-[#111111] py-3 text-xs font-bold tracking-[0.15em] uppercase hover:bg-gold-dark transition-colors"
          >
            Adicionar
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-grow px-5 pb-5">
        {/* Brand + Name */}
        <div className="mb-2">
          <span className="block text-gray-500 text-[10px] font-bold tracking-[0.2em] uppercase mb-1.5" style={{ fontFamily: "var(--font-heading)" }}>
            {product.brand}
          </span>
          <h3
            className="text-[#111111] font-medium text-sm leading-relaxed line-clamp-2"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {product.name}
          </h3>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4 mt-auto pt-2">
          {product.originalPrice && (
            <span className="text-gray-400 text-xs line-through">
              R$ {product.originalPrice.toFixed(2).replace(".", ",")}
            </span>
          )}
          <span className="text-gold text-sm font-bold">
            R$ {product.price.toFixed(2).replace(".", ",")}
          </span>
        </div>

        {/* Selectors (Visible on hover on desktop, always on mobile) */}
        <div className="flex flex-col gap-3">
          {/* Colors */}
          {isSpecialProduct && (
            <div className="flex items-center gap-1.5">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColor(color);
                    
                    if (color.toUpperCase() === "#000000" || color.toUpperCase() === "#111111") {
                      setCurrentImage("/images/shorts-nike-preto.jpg");
                    } else if (color.toUpperCase() === "#1A73E8" || color.toUpperCase() === "#1D3557") {
                      setCurrentImage("/images/shorts-nike-azul.jpg");
                    } else {
                      setCurrentImage(product.image);
                    }
                  }}
                  className={`w-4 h-4 rounded-full border transition-all duration-200 ${
                    selectedColor === color
                      ? "border-gold scale-110"
                      : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          )}

          {/* Sizes */}
          <div className="flex flex-wrap gap-1.5">
            {product.sizes.map((sz) => (
              <button
                key={sz}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSize(sz);
                }}
                className={`w-8 h-8 flex items-center justify-center text-[10px] font-bold transition-colors ${
                  selectedSize === sz
                    ? "bg-gold text-[#111111]"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {sz}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}