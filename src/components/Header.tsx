"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X, Search } from "lucide-react";
import AnimatedLogo from "./AnimatedLogo";
import { CartItem } from "@/types";

interface HeaderProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  onScrollToProducts: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function Header({
  cartItems,
  onOpenCart,
  onScrollToProducts,
  searchQuery,
  setSearchQuery,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Coleção", action: onScrollToProducts },
    { label: "Marcas", action: onScrollToProducts },
    { label: "Ofertas", action: onScrollToProducts },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/95 backdrop-blur-md border-b border-white/10 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <AnimatedLogo size="sm" />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={link.action}
              className="text-white/70 hover:text-white text-sm font-medium tracking-wider uppercase transition-colors duration-200 hover:text-glow"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {link.label}
            </button>
          ))}
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-white/50 absolute left-3" />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value) {
                  onScrollToProducts();
                }
              }}
              className="pl-9 pr-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm text-white focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all placeholder:text-white/30 w-48 focus:w-64"
            />
          </div>
        </nav>

        {/* Cart + Mobile Menu */}
        <div className="flex items-center gap-4">
          {/* Cart Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenCart}
            className="relative flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 hover:bg-white/90"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Carrinho</span>
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold"
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/98 border-t border-white/10 px-6 py-4 flex flex-col gap-4"
          >
            <div className="relative flex items-center mb-2">
              <Search className="w-4 h-4 text-white/50 absolute left-3" />
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value) {
                    onScrollToProducts();
                  }
                }}
                className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-white focus:outline-none focus:border-white/30 transition-all placeholder:text-white/30"
              />
            </div>
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  link.action();
                  setMobileMenuOpen(false);
                }}
                className="text-white/80 hover:text-white text-base font-medium tracking-wider uppercase text-left transition-colors duration-200"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
