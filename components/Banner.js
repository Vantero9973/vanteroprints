"use client";

import { useState } from "react";

export default function Banner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="relative bg-black border-b border-white/10 px-6 py-3 flex items-center justify-center">
      <p className="text-xs tracking-widest uppercase text-accent text-center">
        Free shipping on all orders
      </p>
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-4 text-accent/50 hover:text-accent transition-colors text-lg leading-none"
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  );
}
