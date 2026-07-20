"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X, Search, User, Heart } from "lucide-react";
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
  const [searchOpen, setSearchOpen] = useState(false);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Novidades", action: onScrollToProducts },
    { label: "Tênis", action: onScrollToProducts },
    { label: "Camisetas", action: onScrollToProducts },
    { label: "Calças", action: onScrollToProducts },
    { label: "Bermudas", action: onScrollToProducts },
    { label: "Marcas", action: onScrollToProducts },
  ];

  const textColor = scrolled ? "text-[#111111]" : "text-white";
  const hoverColor = scrolled ? "hover:text-gold" : "hover:text-gold";
  const logoColor = scrolled ? "#111111" : "#ffffff";

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white shadow-sm py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Mobile Menu Toggle (Left on mobile) */}
        <button
          className={`lg:hidden ${textColor} hover:opacity-70 transition-opacity`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Logo (Center on mobile, Left on desktop) */}
        <div className="flex-shrink-0 absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
          <AnimatedLogo size="sm" color={logoColor} />
        </div>

        {/* Desktop Nav (Center) */}
        <nav className="hidden lg:flex flex-1 justify-center items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={link.action}
              className={`${textColor} ${hoverColor} text-xs font-semibold tracking-[0.1em] uppercase transition-colors duration-300`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Icons (Right) */}
        <div className={`flex items-center gap-5 ${textColor}`}>
          {/* Search */}
          <div className="relative hidden md:flex items-center">
            <AnimatePresence>
              {searchOpen && (
                <motion.input
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 200, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  type="text"
                  placeholder="Buscar..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (e.target.value) onScrollToProducts();
                  }}
                  className={`absolute right-8 border-b ${scrolled ? 'border-black/20 text-black' : 'border-white/40 text-white'} bg-transparent text-sm focus:outline-none focus:border-current pb-1 px-2 placeholder:text-current/50`}
                />
              )}
            </AnimatePresence>
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className={`${hoverColor} transition-colors`}
            >
              <Search className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>

          <button className={`hidden md:block ${hoverColor} transition-colors`}>
            <User className="w-5 h-5" strokeWidth={1.5} />
          </button>

          <button className={`hidden md:block ${hoverColor} transition-colors`}>
            <Heart className="w-5 h-5" strokeWidth={1.5} />
          </button>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            className={`relative flex items-center ${hoverColor} transition-colors`}
          >
            <ShoppingCart className="w-5 h-5" strokeWidth={1.5} />
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className={`absolute -top-2 -right-2 w-4 h-4 ${scrolled ? 'bg-black text-white' : 'bg-white text-black'} text-[9px] rounded-full flex items-center justify-center font-bold`}
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 flex flex-col"
          >
            <div className="p-6 flex-1 overflow-y-auto">
              <div className="relative flex items-center mb-8">
                <Search className="w-5 h-5 text-gray-400 absolute left-3" strokeWidth={1.5} />
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (e.target.value) onScrollToProducts();
                  }}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-lg text-sm text-black focus:outline-none focus:bg-gray-100 transition-all placeholder:text-gray-400"
                />
              </div>
              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => {
                      link.action();
                      setMobileMenuOpen(false);
                    }}
                    className="text-[#111111] text-lg font-medium tracking-wide text-left"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
              <div className="mt-10 flex gap-6 border-t border-gray-100 pt-8">
                <button className="flex items-center gap-2 text-gray-600 font-medium">
                  <User className="w-5 h-5" strokeWidth={1.5} />
                  Conta
                </button>
                <button className="flex items-center gap-2 text-gray-600 font-medium">
                  <Heart className="w-5 h-5" strokeWidth={1.5} />
                  Favoritos
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
