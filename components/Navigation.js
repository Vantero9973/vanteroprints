"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Banner from "@/components/Banner";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/contact", label: "Contact" },
];

const socials = [
  {
    label: "TikTok",
    href: "https://tiktok.com/@vanteroprints",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.27 8.27 0 0 0 4.83 1.55V6.79a4.85 4.85 0 0 1-1.06-.1z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com/vanteroprints",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@vanteroprints",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
      </svg>
    ),
  },
];

function CartButton() {
  const { itemCount, setOpen } = useCart();

  return (
    <button
      onClick={() => setOpen(true)}
      className="relative text-text-secondary hover:text-text-primary transition-colors"
      aria-label="Open cart"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
      {itemCount > 0 && (
        <span className="absolute -top-1.5 -right-1.5 bg-accent text-ink text-[10px] font-medium w-4 h-4 rounded-full flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </button>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <Banner />
      <div className="py-5 transition-all duration-300 bg-black border-b border-white/10">
        <div className="container mx-auto px-6 lg:px-16 h-full flex items-center justify-between">
          <Link href="/" className="flex items-baseline gap-2">
            <span className="font-display text-4xl text-text-primary tracking-wider">
              vanteroprints
            </span>
          </Link>

          {/* Desktop links + socials + cart */}
          <div className="hidden md:flex items-center gap-10">
            <ul className="flex gap-10 list-none">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`text-sm tracking-widest uppercase transition-colors relative group ${
                      pathname === l.href
                        ? "text-text-primary"
                        : "text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    {l.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-200 ${
                        pathname === l.href
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4 border-l border-white/10 pl-10">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-text-muted hover:text-text-primary transition-colors"
                >
                  {s.icon}
                </a>
              ))}
              <div className="border-l border-white/10 pl-4">
                <CartButton />
              </div>
            </div>
          </div>

          {/* Mobile right side — cart + burger */}
          <div className="md:hidden flex items-center gap-4">
            <CartButton />
            <button
              className="flex flex-col gap-1.5 p-1"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              <span
                className={`block w-5 h-px bg-text-primary transition-transform duration-200 ${
                  open ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block w-5 h-px bg-text-primary transition-opacity duration-200 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block w-5 h-px bg-text-primary transition-transform duration-200 ${
                  open ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden bg-ink border-t border-white/5 px-6 py-6 flex flex-col gap-5">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-display text-xl text-text-secondary"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <div className="flex gap-5 pt-2 border-t border-white/5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-text-muted hover:text-text-primary transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
