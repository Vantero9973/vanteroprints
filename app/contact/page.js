export const metadata = {
  title: "Contact",
  description: "Get in touch with Vantero Prints.",
};

const socials = [
  { label: "TikTok", href: "https://tiktok.com/@vanteroprints" },
  { label: "Instagram", href: "https://instagram.com/vanteroprints" },
  { label: "YouTube", href: "https://youtube.com/@vanteroprints" },
];

export default function ContactPage() {
  return (
    <div className="pt-[122px] min-h-screen flex items-center">
      <div className="max-w-site mx-auto px-6 lg:px-16 py-24 w-full">
        <div className="max-w-xl">
          <span className="text-xs font-medium tracking-widest uppercase text-accent block mb-6">
            Contact
          </span>

          <h1 className="font-display text-5xl lg:text-7xl font-normal tracking-tight leading-none mb-8">
            Get in touch
          </h1>

          <p className="text-base text-text-secondary leading-loose mb-12 max-w-sm">
            Questions about a print, custom commissions, wholesale, or anything
            else — reach out directly.
          </p>

          <a
            href="mailto:hello@vanteroprints.com"
            className="group inline-flex items-center gap-3 text-text-primary hover:text-accent transition-colors"
          >
            <span className="font-display text-xl lg:text-2xl tracking-wide">
              hello@vanteroprints.com
            </span>
            <span className="text-text-muted group-hover:text-accent transition-colors text-lg">
              →
            </span>
          </a>

          <div className="mt-16 pt-16 border-t border-white/5">
            <p className="text-xs tracking-widest uppercase text-text-muted mb-6">
              Follow the work
            </p>
            <div className="flex gap-8">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors tracking-wide"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
