"use client";

// SVG-based brand logo components

export function NikeLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 50" className={className} fill="currentColor">
      {/* Nike Swoosh */}
      <path d="M 5 35 Q 40 10 80 20 Q 100 25 110 18 Q 120 12 115 22 Q 108 32 70 28 Q 30 24 5 35 Z" />
    </svg>
  );
}

export function AdidasLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 90 60" className={className} fill="currentColor">
      {/* Three stripes + mountain triangle */}
      <polygon points="45,5 85,55 5,55" fill="none" stroke="currentColor" strokeWidth="6" strokeLinejoin="round" />
      <line x1="26" y1="55" x2="45" y2="22" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      <line x1="45" y1="55" x2="57" y2="34" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}

export function PumaLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 50" className={className} fill="currentColor">
      {/* PUMA text stylized */}
      <text x="5" y="38" fontFamily="'Montserrat',sans-serif" fontWeight="900" fontSize="32" letterSpacing="2">PUMA</text>
    </svg>
  );
}

export function NewBalanceLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 60" className={className} fill="currentColor">
      {/* N stylized */}
      <text x="5" y="52" fontFamily="'Montserrat',sans-serif" fontWeight="900" fontSize="58" letterSpacing="-2">N</text>
      <text x="36" y="52" fontFamily="'Montserrat',sans-serif" fontWeight="700" fontSize="20">B</text>
    </svg>
  );
}

export function LacosteLogoSVG({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 50" className={className} fill="currentColor">
      {/* Crocodile silhouette + LACOSTE */}
      <path d="M 5 28 C 5 20, 10 15, 18 16 C 22 16, 25 18, 28 20 C 30 22, 35 24, 40 22 C 45 20, 50 16, 55 18 C 60 20, 62 26, 60 30 C 58 34, 52 35, 48 32 C 44 29, 40 28, 36 30 C 32 32, 28 34, 24 33 C 18 32, 12 35, 8 32 C 5 30, 4 30, 5 28 Z" />
      <circle cx="14" cy="22" r="2" fill="black" />
      <text x="68" y="36" fontFamily="'Montserrat',sans-serif" fontWeight="800" fontSize="16" letterSpacing="2">LACOSTE</text>
    </svg>
  );
}

export function PoloWearLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 130 50" className={className} fill="currentColor">
      <text x="5" y="36" fontFamily="'Montserrat',sans-serif" fontWeight="900" fontSize="18" letterSpacing="1">POLO</text>
      <text x="5" y="48" fontFamily="'Montserrat',sans-serif" fontWeight="400" fontSize="12" letterSpacing="3">WEAR</text>
    </svg>
  );
}

export function OakleyLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 130 50" className={className} fill="currentColor">
      {/* O ellipse icon */}
      <ellipse cx="22" cy="25" rx="18" ry="22" fill="none" stroke="currentColor" strokeWidth="4" transform="rotate(-15 22 25)" />
      <text x="48" y="34" fontFamily="'Montserrat',sans-serif" fontWeight="800" fontSize="18" letterSpacing="1">OAKLEY</text>
    </svg>
  );
}

export function FilaLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 50" className={className} fill="currentColor">
      {/* FILA with red F bar */}
      <rect x="0" y="0" width="80" height="50" rx="3" fill="currentColor" />
      <text x="8" y="38" fontFamily="'Montserrat',sans-serif" fontWeight="900" fontSize="34" fill="white" letterSpacing="1">FILA</text>
    </svg>
  );
}

export function OnbongoLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 50" className={className} fill="currentColor">
      <text x="5" y="36" fontFamily="'Montserrat',sans-serif" fontWeight="900" fontSize="20" letterSpacing="2">ONBONGO</text>
      {/* Wave decoration */}
      <path d="M 5 44 Q 20 38, 35 44 Q 50 50, 65 44 Q 80 38, 95 44" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
