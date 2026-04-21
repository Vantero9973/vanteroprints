import Link from "next/link";
import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 pt-16 pb-8">
      <div className="max-w-site mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 pb-12 border-b border-white/5">
          <div>
            <span className="font-display text-base tracking-widest block mb-3">
              vanteroprints
            </span>
            <p className="text-sm text-text-muted leading-relaxed">
              Hand-carved Japanese woodblock prints.
            </p>
          </div>
          <div>
            <p className="text-xs tracking-widest uppercase text-text-muted mb-4">
              New prints. No noise.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-8">
          <div className="flex gap-6">
            {["/shop", "/contact"].map((href) => (
              <Link
                key={href}
                href={href}
                className="text-xs tracking-widest uppercase text-text-muted hover:text-text-primary transition-colors"
              >
                {href.replace("/", "")}
              </Link>
            ))}
          </div>
          <div className="flex gap-6">
            {[
              { label: "TikTok", href: "https://tiktok.com/@vanteroprints" },
              {
                label: "Instagram",
                href: "https://instagram.com/vanteroprints",
              },
              { label: "YouTube", href: "https://youtube.com/@vanteroprints" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs tracking-widest uppercase text-text-muted hover:text-text-primary transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
          <p className="text-xs tracking-widest text-text-muted hover:text-text-primary transition-colors">
            © {new Date().getFullYear()} vanteroprints
          </p>
        </div>
      </div>
    </footer>
  );
}
