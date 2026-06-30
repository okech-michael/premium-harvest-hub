import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";

export function CTA() {
  return (
    <section className="relative py-32 lg:py-44 bg-navy text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.76_0.15_78/0.25),transparent_60%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="relative mx-auto max-w-5xl px-6 lg:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 mb-8 justify-center">
            <span className="h-px w-10 bg-gold" />
            <span className="text-[11px] tracking-[0.3em] uppercase text-gold font-semibold">Ready to order</span>
            <span className="h-px w-10 bg-gold" />
          </div>
          <h2 className="font-display font-extrabold text-balance leading-[0.98] tracking-tight text-[clamp(2.5rem,6vw,5.5rem)]">
            Premium foods<br />
            <span className="italic text-gold">you can trust.</span>
          </h2>
          <p className="mt-8 text-white/70 text-lg max-w-xl mx-auto">
            Browse the catalogue, place an order in minutes — no account required. We'll deliver nationwide.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <Link to="/products" className="group inline-flex h-14 items-center gap-3 px-8 rounded-full bg-gold text-navy font-medium shadow-[var(--shadow-gold)] hover:-translate-y-0.5 transition-all">
              Shop Now <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/contact" className="inline-flex h-14 items-center gap-3 px-8 rounded-full bg-white/10 border border-white/20 text-white font-medium hover:bg-white/20 transition-all">
              Contact Us
            </Link>
            <a href="https://wa.me/2348000000000" target="_blank" rel="noopener noreferrer" className="inline-flex h-14 items-center gap-3 px-8 rounded-full bg-[#25D366] text-white font-medium hover:-translate-y-0.5 transition-all">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}