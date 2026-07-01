import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-navy text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(0.76_0.15_78/0.2),transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-24 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[oklch(0.82_0.14_82)] to-[oklch(0.65_0.18_68)] grid place-items-center font-display font-black text-navy text-xl">S</div>
              <div className="font-display font-extrabold leading-tight">
                <div>SnowSea & ShoFirm</div>
                <div className="text-[10px] tracking-[0.25em] uppercase text-gold/80 font-medium">Premium Foods</div>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Premium Nigerian foods, crafted with quality, delivered with trust to homes and businesses nationwide.
            </p>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.25em] text-gold/80 font-semibold mb-5">Products</div>
            <ul className="space-y-3 text-sm text-white/70">
              <li><Link to="/products" className="hover:text-gold transition-colors">Swallow Flour</Link></li>
              <li><Link to="/products" className="hover:text-gold transition-colors">Premium Flours</Link></li>
              <li><Link to="/products" className="hover:text-gold transition-colors">Smoked Catfish</Link></li>
              <li><Link to="/products" className="hover:text-gold transition-colors">Baby Foods</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.25em] text-gold/80 font-semibold mb-5">Company</div>
            <ul className="space-y-3 text-sm text-white/70">
              <li><Link to="/about" className="hover:text-gold transition-colors">Our Story</Link></li>
              <li><Link to="/gallery" className="hover:text-gold transition-colors">Gallery</Link></li>
              <li><Link to="/faq" className="hover:text-gold transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-gold transition-colors">Wholesale</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.25em] text-gold/80 font-semibold mb-5">Contact</div>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2.5"><MapPin className="h-4 w-4 text-gold mt-0.5 shrink-0" /> Lagos, Nigeria</li>
              <li className="flex items-center gap-2.5"><Phone className="h-4 w-4 text-gold shrink-0" /> +2342223878</li>
              <li className="flex items-center gap-2.5"><Mail className="h-4 w-4 text-gold shrink-0" /> shofirmfood@gmail.com</li>
            </ul>
            <div className="flex items-center gap-2 mt-5">
              <a href="#" aria-label="Instagram" className="h-10 w-10 grid place-items-center rounded-full bg-white/5 hover:bg-gold hover:text-navy transition-colors"><Instagram className="h-4 w-4" /></a>
              <a href="#" aria-label="Facebook" className="h-10 w-10 grid place-items-center rounded-full bg-white/5 hover:bg-gold hover:text-navy transition-colors"><Facebook className="h-4 w-4" /></a>
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row gap-4 items-center justify-between text-xs text-white/50">
          <div>© {new Date().getFullYear()} SnowSea & ShoFirm Foods Limited. All rights reserved.</div>
          <div className="tracking-[0.2em] uppercase text-gold/70">Food You Can Trust.</div>
        </div>
      </div>
    </footer>
  );
}