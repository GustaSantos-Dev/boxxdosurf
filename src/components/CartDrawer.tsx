"use client";

import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { CartItem, Product } from "@/types";
import { PRODUCTS } from "@/data/products";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string, color: string, size: string) => void;
  onUpdateQuantity: (id: string, color: string, size: string, qty: number) => void;
  onSelectProduct?: (product: Product) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onUpdateQuantity,
  onSelectProduct,
}: CartDrawerProps) {
  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const suggestions = useMemo(() => {
    if (items.length === 0) return [];
    
    const cartCategories = items.map(item => item.product.category);
    let targetCategories: string[] = [];
    
    if (cartCategories.some(c => ["Camisetas", "Camisas de Time", "Camisas Polo", "Moletons", "Jaquetas"].includes(c))) {
      targetCategories = ["Bermudas", "Shorts de Jogador", "Calças de Jogador", "Bonés", "Acessórios", "Tênis", "Óculos"];
    } else if (cartCategories.some(c => ["Bermudas", "Shorts de Jogador", "Calças de Jogador"].includes(c))) {
      targetCategories = ["Camisetas", "Camisas de Time", "Tênis", "Meias"];
    } else if (cartCategories.some(c => ["Tênis"].includes(c))) {
      targetCategories = ["Meias", "Camisetas", "Shorts de Jogador"];
    } else {
      targetCategories = ["Tênis", "Camisetas", "Bonés"];
    }
    
    const cartProductIds = items.map(item => item.product.id);
    const potentialSuggestions = PRODUCTS.filter(
      p => targetCategories.includes(p.category) && !cartProductIds.includes(p.id)
    );
    
    return potentialSuggestions.slice(0, 2); 
  }, [items]);

  const colorNames: Record<string, string> = {
    "#000000": "Preto",
    "#111111": "Preto",
    "#FFFFFF": "Branco",
    "#C0C0C0": "Cinza",
    "#ADB5BD": "Cinza Claro",
    "#E63946": "Vermelho",
    "#F4D03F": "Amarelo",
    "#2D6A4F": "Verde",
    "#1A73E8": "Azul",
    "#1D3557": "Azul Marinho",
    "#F4A261": "Laranja",
    "#FF6B35": "Laranja Neon",
    "#A9845A": "Marrom/Areia"
  };

  const handleWhatsappCheckout = () => {
    if (items.length === 0) return;

    const greeting = "Olá, BOXXDOSURF! Tenho interesse em realizar um pedido.\n\n";
    const itemsList = items
      .map(
        (item, idx) => {
          const colorName = colorNames[item.selectedColor.toUpperCase()] || colorNames[item.selectedColor] || item.selectedColor;
          return `${idx + 1}. *${item.product.name}*\n` +
          `   • Marca: ${item.product.brand}\n` +
          `   • Tamanho: ${item.selectedSize}\n` +
          `   • Cor: ${colorName}\n` +
          `   • Qtd: ${item.quantity}x\n` +
          `   • Preço unit.: R$ ${item.product.price.toFixed(2).replace(".", ",")}\n` +
          `   • Subtotal: R$ ${(item.product.price * item.quantity).toFixed(2).replace(".", ",")}`;
        }
      )
      .join("\n\n");

    const summary =
      `\n\n━━━━━━━━━━━━━━━━\n` +
      `🛒 *Total do Pedido: R$ ${total.toFixed(2).replace(".", ",")}*\n` +
      `━━━━━━━━━━━━━━━━\n\n` +
      `Gostaria de combinar a forma de pagamento e entrega. Aguardo retorno!`;

    const message = greeting + "📦 *Meu Pedido:*\n\n" + itemsList + summary;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/5511949488563?text=${encoded}`, "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white border-l border-gray-100 z-50 flex flex-col"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            {/* Header - Travado no topo */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
              <div className="flex items-center gap-3">
                <h2
                  className="text-[#111111] font-bold text-xl uppercase tracking-widest"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Carrinho
                </h2>
                {totalItems > 0 && (
                  <span className="text-gold text-sm font-bold">
                    ({totalItems})
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gold transition-colors"
                aria-label="Fechar carrinho"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* ÁREA DE ROLAGEM: Produtos + Sugestões (Ajustado para overscroll-y-contain) */}
            <div className="flex-1 overflow-y-auto overscroll-y-contain flex flex-col" data-lenis-prevent="true">
              
              <div className="px-6 py-6 flex-1">
                <AnimatePresence>
                  {items.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center h-full text-center py-10"
                    >
                      <p className="text-gray-400 text-sm tracking-widest uppercase mb-2">
                        Seu carrinho está vazio
                      </p>
                      <button
                        onClick={onClose}
                        className="text-[#111111] text-xs font-semibold tracking-[0.1em] uppercase border-b border-black pb-1 mt-4"
                      >
                        Continuar Comprando
                      </button>
                    </motion.div>
                  ) : (
                    <div className="flex flex-col gap-6">
                      {items.map((item) => (
                        <motion.div
                          key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex gap-4"
                        >
                          {/* Image */}
                          <div className="relative w-24 h-32 bg-gray-50 flex-shrink-0">
                            <Image
                              src={item.product.image}
                              alt={item.product.name}
                              fill
                              className="object-cover"
                              sizes="96px"
                            />
                            <div 
                              className="absolute inset-0 mix-blend-color pointer-events-none opacity-30"
                              style={{ backgroundColor: item.selectedColor }}
                            />
                          </div>

                          {/* Info */}
                          <div className="flex-1 flex flex-col min-w-0 py-1">
                            <div className="flex justify-between items-start mb-1">
                              <p
                                className="text-[#111111] text-sm font-normal line-clamp-2 pr-4"
                                style={{ fontFamily: "'Inter', sans-serif" }}
                              >
                                {item.product.name}
                              </p>
                              <button
                                onClick={() =>
                                  onRemoveItem(
                                    item.product.id,
                                    item.selectedColor,
                                    item.selectedSize
                                  )
                                }
                                className="text-gray-300 hover:text-black transition-colors shrink-0"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                            
                            <p className="text-gray-500 text-xs mb-3">
                              {item.selectedSize} | {colorNames[item.selectedColor.toUpperCase()] || colorNames[item.selectedColor] || item.selectedColor}
                            </p>

                            <div className="mt-auto flex items-end justify-between">
                              <div className="flex items-center gap-3 border border-gray-200">
                                <button
                                  onClick={() =>
                                    onUpdateQuantity(
                                      item.product.id,
                                      item.selectedColor,
                                      item.selectedSize,
                                      item.quantity - 1
                                    )
                                  }
                                  className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black transition-colors"
                                >
                                  −
                                </button>
                                <span className="text-[#111111] text-sm font-medium w-4 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    onUpdateQuantity(
                                      item.product.id,
                                      item.selectedColor,
                                      item.selectedSize,
                                      item.quantity + 1
                                    )
                                  }
                                  className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black transition-colors"
                                >
                                  +
                                </button>
                              </div>
                              <span className="text-[#111111] font-semibold text-sm">
                                R$ {(item.product.price * item.quantity).toFixed(2).replace(".", ",")}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {/* Suggestions Section - Removido o overscroll-contain daqui */}
              {items.length > 0 && suggestions.length > 0 && (
                <div className="px-6 pb-6 pt-6 mt-auto bg-gray-50/50">
                  <p className="text-[#111111] text-xs font-bold tracking-[0.15em] uppercase mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                    Complete o Visual
                  </p>
                  <div className="flex gap-4 overflow-x-auto pb-2 -mx-6 px-6 snap-x snap-mandatory hide-scrollbar">
                    {suggestions.map((suggestion) => (
                      <div 
                        key={suggestion.id} 
                        className="min-w-[130px] w-[130px] snap-start cursor-pointer group"
                        onClick={() => onSelectProduct?.(suggestion)}
                      >
                        <div className="relative w-full aspect-[3/4] bg-gray-50 mb-2 overflow-hidden rounded-md">
                          <Image
                            src={suggestion.image}
                            alt={suggestion.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="130px"
                          />
                        </div>
                        <p className="text-[#111111] text-[10px] font-bold tracking-[0.2em] uppercase mb-1 truncate" style={{ fontFamily: "var(--font-heading)" }}>
                          {suggestion.brand}
                        </p>
                        <p className="text-gray-600 text-xs truncate mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                          {suggestion.name}
                        </p>
                        <p className="text-gold text-xs font-semibold">
                          R$ {suggestion.price.toFixed(2).replace(".", ",")}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer - Travado no Rodapé */}
            {items.length > 0 && (
              <div className="border-t border-gray-100 p-6 bg-white shrink-0">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-500 text-sm tracking-widest uppercase">
                    Subtotal
                  </span>
                  <span className="text-[#111111] font-semibold text-lg">
                    R$ {total.toFixed(2).replace(".", ",")}
                  </span>
                </div>

                <button
                  onClick={handleWhatsappCheckout}
                  className="w-full flex items-center justify-center gap-3 bg-gold text-[#111111] py-4 text-xs font-bold tracking-[0.15em] uppercase hover:bg-gold-dark transition-colors mb-2"
                >
                  Finalizar Pedido
                </button>
                <p className="text-gray-400 text-[10px] text-center uppercase tracking-wider">
                  O pagamento será combinado pelo WhatsApp
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}