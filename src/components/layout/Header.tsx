import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { motion, AnimatePresence } from "framer-motion";

const nav = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/about", label: "Our Story" },
  { to: "/gallery", label: "Gallery" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const cart = useCart();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  const onHome = pathname === "/";
  const transparent = onHome && !scrolled;

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          backgroundColor: transparent ? "rgba(11, 35, 65, 0)" : "rgba(250, 250, 248, 0.85)",
          boxShadow: scrolled ? "0 8px 30px -10px rgba(11,35,65,0.12)" : "0 0 0 rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 ${scrolled ? "glass-nav" : ""}`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex h-20 items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5 group">
              <motion.div
                whileHover={{ scale: 1.06, rotate: -3 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="h-10 w-10 rounded-xl bg-gradient-to-br from-[oklch(0.82_0.14_82)] to-[oklch(0.65_0.18_68)] grid place-items-center font-display font-black text-navy text-lg shadow-[var(--shadow-gold)]"
              >S</motion.div>
              <div className={`leading-tight font-display font-extrabold tracking-tight ${transparent ? "text-white" : "text-navy"}`}>
                <div className="text-base">SnowSea & ShoFirm</div>
                <div className="text-[10px] tracking-[0.25em] uppercase opacity-70 font-medium">Premium Foods</div>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-9">
              {nav.map((n) => {
                const active = pathname === n.to;
                return (
                  <Link
                    key={n.to}
                    to={n.to}
                    className={`relative text-sm font-medium tracking-wide transition-colors ${transparent ? "text-white/90 hover:text-white" : "text-navy/80 hover:text-navy"}`}
                  >
                    {n.label}
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-gold rounded-full"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={cart.open}
                aria-label="Open cart"
                className={`relative h-11 w-11 grid place-items-center rounded-full transition-all ${transparent ? "bg-white/10 hover:bg-white/20 text-white" : "bg-navy/5 hover:bg-navy/10 text-navy"}`}
              >
                <ShoppingBag className="h-5 w-5" />
                {cart.count > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 min-w-5 px-1 grid place-items-center rounded-full bg-gold text-navy text-[10px] font-bold">
                    {cart.count}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                className={`lg:hidden h-11 w-11 grid place-items-center rounded-full ${transparent ? "bg-white/10 text-white" : "bg-navy/5 text-navy"}`}
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-navy"
          >
            <div className="absolute inset-0 bg-[var(--gradient-hero)] opacity-60" />
            <div className="relative h-full flex flex-col p-8">
              <div className="flex justify-end">
                <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="h-12 w-12 grid place-items-center rounded-full bg-white/10 text-white">
                  <X className="h-6 w-6" />
                </button>
              </div>
              <nav className="flex-1 flex flex-col justify-center gap-6">
                {nav.map((n, i) => (
                  <motion.div
                    key={n.to}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1, transition: { delay: 0.1 + i * 0.06, ease: [0.22, 1, 0.36, 1] } }}
                  >
                    <Link to={n.to} className="text-4xl font-display font-extrabold text-white tracking-tight">
                      {n.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="text-white/60 text-sm">Food You Can Trust.</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}