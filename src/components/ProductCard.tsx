"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import Image from "next/image";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      layoutId={`card-${product.id}`}
      onClick={onClick}
      className="group cursor-pointer flex flex-col"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-[#F5F5F5] mb-4">
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
        
        <motion.div
          layoutId={`image-${product.id}`}
          className="w-full h-full relative"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>

        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 transform translate-y-4 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0 flex justify-center">
          <button className="bg-white text-[#111111] px-6 py-3 rounded-none text-xs font-bold tracking-[0.1em] uppercase flex items-center gap-2 hover:bg-[#111111] hover:text-white transition-colors duration-300 w-full justify-center">
            Ver Detalhes
          </button>
        </div>
      </div>

      <div className="flex flex-col flex-1">
        <div className="flex justify-between items-start gap-4 mb-2">
          <div className="flex-1">
            <span className="text-gray-500 text-[10px] font-bold tracking-[0.2em] uppercase mb-2 block" style={{ fontFamily: "var(--font-heading)" }}>
              {product.brand}
            </span>
            <h3 className="text-[#111111] font-semibold text-sm leading-tight uppercase group-hover:text-gold transition-colors duration-300" style={{ fontFamily: "var(--font-heading)" }}>
              {product.name}
            </h3>
          </div>
          <div className="text-right shrink-0 flex flex-col items-end">
            {product.originalPrice && (
              <span className="text-gray-400 text-xs line-through mb-0.5">
                R$ {product.originalPrice.toFixed(2).replace(".", ",")}
              </span>
            )}
            <span className="text-[#111111] font-bold">
              R$ {product.price.toFixed(2).replace(".", ",")}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mt-auto pt-2">
          <div className="flex gap-1.5">
            {product.colors.slice(0, 3).map((color, i) => (
              <div 
                key={i} 
                className="w-3 h-3 rounded-full border border-gray-200"
                style={{ backgroundColor: color }}
              />
            ))}
            {product.colors.length > 3 && (
              <span className="text-[10px] text-gray-400 ml-1">+{product.colors.length - 3}</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}