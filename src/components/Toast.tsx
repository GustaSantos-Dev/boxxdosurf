"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

interface ToastProps {
  message: string;
  isVisible: boolean;
}

export default function Toast({ message, isVisible }: ToastProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 80, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 80, x: "-50%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-8 left-1/2 z-[100] flex items-center gap-3 bg-white text-black px-5 py-3 rounded-full shadow-2xl font-semibold text-sm"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          <Check className="w-4 h-4 text-green-600" />
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
