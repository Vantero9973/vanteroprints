"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Banner from "@/components/Banner";
import socials from "@/public/icon/socials";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/contact", label: "Contact" },
];

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

          {/* Desktop links + socials */}
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
            </div>
          </div>

          {/* Mobile burger */}
          <button
            className="md:hidden flex flex-col gap-2 p-1 cursor-pointer"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-px bg-[#ededed] transition-all duration-200 ${
                open ? "rotate-45 translate-y-[9px]" : ""
              }`}
            />
            <span
              className={`block w-6 h-px bg-[#ededed] transition-opacity duration-200 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-px bg-[#ededed] transition-all duration-200 ${
                open ? "-rotate-45 -translate-y-[9px]" : ""
              }`}
            />
          </button>
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
