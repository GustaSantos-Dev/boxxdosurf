"use client";

import { useState, useRef, useCallback } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import BrandsSection from "@/components/BrandsSection";
import ProductsSection from "@/components/ProductsSection";
import CartDrawer from "@/components/CartDrawer";
import ProductModal from "@/components/ProductModal";
import Footer from "@/components/Footer";
import Toast from "@/components/Toast";
import GsapReveal from "@/components/GsapReveal";
import { CartItem, Product } from "@/types";

export default function Home() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeBrand, setActiveBrand] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [toast, setToast] = useState({ visible: false, message: "" });

  const productsRef = useRef<HTMLElement>(null);

  const scrollToProducts = useCallback(() => {
    productsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const showToast = (message: string) => {
    setToast({ visible: true, message });
    setTimeout(() => setToast({ visible: false, message: "" }), 2500);
  };

  const addToCart = useCallback(
    (product: Product, selectedColor: string, selectedSize: string) => {
      setCartItems((prev) => {
        const existingIdx = prev.findIndex(
          (item) =>
            item.product.id === product.id &&
            item.selectedColor === selectedColor &&
            item.selectedSize === selectedSize
        );

        if (existingIdx >= 0) {
          const updated = [...prev];
          updated[existingIdx] = {
            ...updated[existingIdx],
            quantity: updated[existingIdx].quantity + 1,
          };
          return updated;
        }

        return [
          ...prev,
          {
            product,
            selectedColor,
            selectedSize,
            quantity: 1,
          },
        ];
      });

      showToast(`${product.name} adicionado ao carrinho!`);
    },
    []
  );

  const removeItem = useCallback(
    (id: string, color: string, size: string) => {
      setCartItems((prev) =>
        prev.filter(
          (item) =>
            !(
              item.product.id === id &&
              item.selectedColor === color &&
              item.selectedSize === size
            )
        )
      );
    },
    []
  );

  const updateQuantity = useCallback(
    (id: string, color: string, size: string, qty: number) => {
      if (qty <= 0) {
        removeItem(id, color, size);
        return;
      }
      setCartItems((prev) =>
        prev.map((item) =>
          item.product.id === id &&
          item.selectedColor === color &&
          item.selectedSize === size
            ? { ...item, quantity: qty }
            : item
        )
      );
    },
    [removeItem]
  );

  const handleBrandSelect = useCallback((brand: string) => {
    setActiveBrand(brand);
    // Scroll to products after a short delay
    setTimeout(() => {
      productsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }, []);

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {/* Header */}
      <Header
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        onScrollToProducts={scrollToProducts}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Hero */}
      <HeroSection onScrollToProducts={scrollToProducts} />

      <GsapReveal>
        {/* Brands Marquee + Filter */}
        <BrandsSection
          activeBrand={activeBrand}
          onSelectBrand={handleBrandSelect}
        />
      </GsapReveal>

      <GsapReveal delay={0.1}>
        {/* Products Grid */}
        <ProductsSection
          ref={productsRef}
          activeBrand={activeBrand}
          searchQuery={searchQuery}
          onAddToCart={addToCart}
          onOpenProduct={(product) => setSelectedProduct(product)}
        />
      </GsapReveal>

      <GsapReveal delay={0.1}>
        {/* Footer */}
        <Footer />
      </GsapReveal>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={removeItem}
        onUpdateQuantity={updateQuantity}
        onSelectProduct={(product) => {
          setSelectedProduct(product);
          setIsCartOpen(false);
        }}
      />

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(product, color, size) => {
          addToCart(product, color, size);
          setSelectedProduct(null);
          setTimeout(() => setIsCartOpen(true), 300);
        }}
      />

      {/* Toast notification */}
      <Toast message={toast.message} isVisible={toast.visible} />
    </main>
  );
}
