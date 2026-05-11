"use client";

import { useState } from "react";

export default function Banner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="relative border-b dark:border-white/10 border-black/20 px-6 py-3 flex items-center justify-center">
      <p className="text-xs tracking-widest uppercase text-accent text-center">
        Free shipping on US orders of 2 or more prints
      </p>
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-4 text-accent/50 hover:text-accent transition-colors text-xl leading-none cursor-pointer"
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  );
}
