"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { ShoppingCart, Star } from "lucide-react";
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
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const colorGradient = `linear-gradient(135deg, ${product.colors.join(", ")})`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="h-full flex flex-col"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
        className="group relative flex flex-col flex-grow bg-[#0d0d0d] border border-white/8 rounded-2xl overflow-hidden cursor-pointer"
      >
      {/* Glow border on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.2)",
        }}
      />

      {/* Image Area */}
      <div
        className="relative h-56 sm:h-64 overflow-hidden bg-[#111]"
        onClick={onClick}
      >
        {/* Color accent bar at top */}
        <div
          className="absolute top-0 left-0 right-0 h-1 z-10 transition-opacity duration-300"
          style={{ background: colorGradient }}
        />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-20 bg-white text-black text-xs font-black px-2 py-1 rounded-full tracking-wider">
            {product.badge}
          </div>
        )}

        {/* Discount badge */}
        {discount > 0 && (
          <div className="absolute top-3 right-3 z-20 bg-red-500 text-white text-xs font-black px-2 py-1 rounded-full">
            -{discount}%
          </div>
        )}

        {/* Product Image */}
        {!imageError ? (
          <motion.div
            className="w-full h-full"
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              onError={() => setImageError(true)}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </motion.div>
        ) : (
          /* Fallback placeholder with brand colors */
          <div className="w-full h-full flex flex-col items-center justify-center"
            style={{ background: `linear-gradient(135deg, #111 0%, #1a1a1a 100%)` }}
          >
            <div
              className="w-20 h-20 rounded-full mb-3 flex items-center justify-center text-3xl font-black"
              style={{ background: colorGradient, color: "#fff" }}
            >
              {product.brand[0]}
            </div>
            <span className="text-white/40 text-sm font-medium">{product.category}</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4" style={{ transform: "translateZ(20px)" }}>
        {/* Brand + Category */}
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-white/40 text-xs font-semibold tracking-widest uppercase">
            {product.brand}
          </span>
          <span className="text-white/25 text-xs">{product.category}</span>
        </div>

        {/* Name */}
        <h3
          className="text-white font-bold text-sm leading-snug mb-3 line-clamp-2 h-auto"
          style={{ fontFamily: "'Montserrat', sans-serif", minHeight: "2.5rem" }}
          onClick={onClick}
        >
          {product.name}
        </h3>

        {/* Colors */}
        <div className="flex items-center gap-1.5 mb-3">
          {product.colors.map((color) => (
            <button
              key={color}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedColor(color);
              }}
              className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                selectedColor === color
                  ? "border-white scale-110"
                  : "border-white/20 hover:border-white/50"
              }`}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>

        {/* Sizes */}
        <div className="flex flex-wrap gap-1 mb-4">
          {product.sizes.slice(0, 5).map((sz) => (
            <button
              key={sz}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedSize(sz);
              }}
              className={`px-2 py-0.5 text-xs font-semibold rounded border transition-all duration-200 ${
                selectedSize === sz
                  ? "bg-white text-black border-white"
                  : "bg-transparent text-white/50 border-white/15 hover:border-white/40 hover:text-white/80"
              }`}
            >
              {sz}
            </button>
          ))}
          {product.sizes.length > 5 && (
            <span className="text-white/30 text-xs flex items-center">+{product.sizes.length - 5}</span>
          )}
        </div>

        {/* Price + Add to Cart */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="text-white/30 text-xs line-through leading-none">
                R$ {product.originalPrice.toFixed(2).replace(".", ",")}
              </span>
            )}
            <span className="text-white font-black text-lg leading-none">
              R$ {product.price.toFixed(2).replace(".", ",")}
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product, selectedColor, selectedSize);
            }}
            className="flex items-center gap-1.5 bg-white text-black px-3 py-2 rounded-xl text-xs font-bold hover:bg-white/90 transition-colors duration-200"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Adicionar</span>
          </motion.button>
        </div>
      </div>
      </motion.div>
    </motion.div>
  );
}
