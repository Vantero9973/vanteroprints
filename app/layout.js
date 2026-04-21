import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata = {
  title: {
    default: "vanteroprints",
    template: "%s | Vantero Prints",
  },
  description:
    "Hand-carved, hand-pulled Japanese woodblock prints. Original mokuhanga and giclée reproductions.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-ink text-text-primary font-body font-light min-h-screen container mx-auto">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
