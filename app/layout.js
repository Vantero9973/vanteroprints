import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/context/CartContext";
import FloatingCartButton from "@/components/CartButton";

export const metadata = {
  title: {
    default: "vanteroprints",
    template: "%s | vanteroprints",
  },
  description:
    "Original hand-carved woodblock prints and mokuhanga art by vanteroprints.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="text-text-primary font-body font-light min-h-screen container mx-auto">
        <CartProvider>
          <Navigation />
          <CartDrawer />
          <FloatingCartButton />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
