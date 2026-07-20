"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, ShoppingBag, MessageCircle } from "lucide-react";
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

    const greeting = "Olá, BOXXDOSURF! Tenho interesse em realizar um pedido. 🏄‍♂️\n\n";
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
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 35 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-white" />
                <h2
                  className="text-white font-bold text-lg"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Seu Carrinho
                </h2>
                {totalItems > 0 && (
                  <span className="bg-white text-black text-xs font-black px-2 py-0.5 rounded-full">
                    {totalItems}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="text-white/50 hover:text-white transition-colors p-1"
                aria-label="Fechar carrinho"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <AnimatePresence>
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-64 text-center"
                  >
                    <ShoppingBag className="w-16 h-16 text-white/10 mb-4" />
                    <p className="text-white/40 text-sm">
                      Seu carrinho está vazio.
                    </p>
                    <p className="text-white/20 text-xs mt-1">
                      Adicione produtos para continuar.
                    </p>
                  </motion.div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {items.map((item) => (
                      <motion.div
                        key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex gap-4 bg-white/5 rounded-xl p-3 border border-white/5"
                      >
                        {/* Image */}
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-[#111]">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-white/40 text-xs font-semibold tracking-widest uppercase mb-0.5">
                            {item.product.brand}
                          </p>
                          <p
                            className="text-white text-sm font-bold leading-snug mb-2 break-words"
                            style={{ fontFamily: "'Montserrat', sans-serif" }}
                          >
                            {item.product.name}
                          </p>
                          <div className="flex items-center gap-2 flex-wrap mb-2">
                            <span className="text-white/40 text-xs">
                              Tam: <strong className="text-white/70">{item.selectedSize}</strong>
                            </span>
                            <span className="flex items-center gap-1 text-xs text-white/40">
                              Cor:{" "}
                              <span
                                className="w-3 h-3 rounded-full border border-white/20 inline-block"
                                style={{ backgroundColor: item.selectedColor }}
                              />
                            </span>
                          </div>

                          {/* Qty + Price */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  onUpdateQuantity(
                                    item.product.id,
                                    item.selectedColor,
                                    item.selectedSize,
                                    item.quantity - 1
                                  )
                                }
                                className="w-6 h-6 rounded-full bg-white/10 text-white text-sm flex items-center justify-center hover:bg-white/20 transition-colors"
                              >
                                −
                              </button>
                              <span className="text-white text-sm font-bold w-4 text-center">
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
                                className="w-6 h-6 rounded-full bg-white/10 text-white text-sm flex items-center justify-center hover:bg-white/20 transition-colors"
                              >
                                +
                              </button>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-white font-black text-sm">
                                R$ {(item.product.price * item.quantity).toFixed(2).replace(".", ",")}
                              </span>
                              <button
                                onClick={() =>
                                  onRemoveItem(
                                    item.product.id,
                                    item.selectedColor,
                                    item.selectedSize
                                  )
                                }
                                className="text-white/30 hover:text-red-400 transition-colors"
                                aria-label="Remover item"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
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
              <div className="border-t border-white/10 px-6 py-5 space-y-4">
                {/* Total */}
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Total ({totalItems} {totalItems === 1 ? "item" : "itens"})
                  </span>
                  <span
                    className="text-white font-black text-xl"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    R$ {total.toFixed(2).replace(".", ",")}
                  </span>
                </div>

                {/* WhatsApp CTA */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleWhatsappCheckout}
                  className="w-full flex items-center justify-center gap-3 bg-[#25D366] text-white px-6 py-4 rounded-2xl font-bold text-base tracking-wide pulse-whatsapp transition-all duration-300 hover:bg-[#20bb5a]"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {/* WhatsApp Icon SVG */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 fill-current"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>Finalizar Pedido no WhatsApp</span>
                </motion.button>

                <p className="text-white/25 text-xs text-center leading-relaxed">
                  Você será redirecionado ao WhatsApp para combinar pagamento e entrega.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
