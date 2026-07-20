"use client";

import { motion } from "framer-motion";
import AnimatedLogo from "./AnimatedLogo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 pt-24 pb-12 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <div className="mb-6">
              <AnimatedLogo size="sm" color="#111111" />
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs" style={{ fontFamily: "'Inter', sans-serif" }}>
              A voz das ruas no alto padrão. Moda e cultura de favela com estilo e originalidade.
            </p>
          </div>

          {/* Ajuda */}
          <div>
            <h3 className="text-[#111111] text-lg font-bold tracking-[0.1em] uppercase mb-6" style={{ fontFamily: "var(--font-heading)" }}>
              Ajuda
            </h3>
            <ul className="space-y-4">
              {["Comprar", "Pagamentos", "Envios", "Trocas e Devoluções", "Minha Conta"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-500 text-sm hover:text-gold transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h3 className="text-[#111111] text-lg font-bold tracking-[0.1em] uppercase mb-6" style={{ fontFamily: "var(--font-heading)" }}>
              Empresa
            </h3>
            <ul className="space-y-4">
              {["Quem Somos", "Nossas Lojas", "Trabalhe Conosco", "Imprensa"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-500 text-sm hover:text-gold transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-[#111111] text-lg font-bold tracking-[0.1em] uppercase mb-6" style={{ fontFamily: "var(--font-heading)" }}>
              Contato
            </h3>
            <ul className="space-y-4">
              <li>
                <a href="https://wa.me/5511949488563" target="_blank" rel="noopener noreferrer" className="text-gray-500 text-sm hover:text-gold transition-colors">
                  WhatsApp: +55 11 94948-8563
                </a>
              </li>
              <li>
                <a href="https://instagram.com/boxxdosurf_" target="_blank" rel="noopener noreferrer" className="text-gray-500 text-sm hover:text-gold transition-colors">
                  Instagram: @boxxdosurf_
                </a>
              </li>
              <li className="text-gray-500 text-sm leading-relaxed mt-2">
                Rua Firminópolis, 102<br />
                Jardim Vista Alegre - SP
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-gray-100 pt-8 gap-4">
          <p className="text-gray-400 text-xs">
            © {currentYear} BOXXDOSURF. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            {["Termos de Uso", "Política de Privacidade"].map((item) => (
              <a key={item} href="#" className="text-gray-400 text-xs hover:text-black transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
