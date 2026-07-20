"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { CartItem } from "@/types";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string, color: string, size: string) => void;
  onUpdateQuantity: (id: string, color: string, size: string, qty: number) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onUpdateQuantity,
}: CartDrawerProps) {
  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleWhatsappCheckout = () => {
    if (items.length === 0) return;

    const greeting = "Olá, BOXXDOSURF! Tenho interesse em realizar um pedido.\n\n";
    const itemsList = items
      .map(
        (item, idx) =>
          `${idx + 1}. *${item.product.name}*\n` +
          `   • Marca: ${item.product.brand}\n` +
          `   • Tamanho: ${item.selectedSize}\n` +
          `   • Cor: ${item.selectedColor}\n` +
          `   • Qtd: ${item.quantity}x\n` +
          `   • Preço unit.: R$ ${item.product.price.toFixed(2).replace(".", ",")}\n` +
          `   • Subtotal: R$ ${(item.product.price * item.quantity).toFixed(2).replace(".", ",")}`
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
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
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

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-8 py-6">
              <AnimatePresence>
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-full text-center"
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
                            {item.selectedSize} | {item.selectedColor}
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

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-100 p-8 bg-white">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-gray-500 text-sm tracking-widest uppercase">
                    Subtotal
                  </span>
                  <span className="text-[#111111] font-semibold text-lg">
                    R$ {total.toFixed(2).replace(".", ",")}
                  </span>
                </div>

                <button
                  onClick={handleWhatsappCheckout}
                  className="w-full flex items-center justify-center gap-3 bg-gold text-[#111111] py-4 text-xs font-bold tracking-[0.15em] uppercase hover:bg-gold-dark transition-colors mb-4"
                >
                  Finalizar Pedido via WhatsApp
                </button>
                <p className="text-gray-400 text-xs text-center">
                  O pagamento será combinado diretamente pelo WhatsApp.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
