import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Truck, Leaf, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero-main.jpg";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const trust = [
    { icon: ShieldCheck, label: "Safe Processing" },
    { icon: Leaf, label: "Organically Sourced" },
    { icon: Truck, label: "Nationwide Delivery" },
    { icon: Sparkles, label: "Premium Quality" },
  ];

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[680px] w-full overflow-hidden bg-navy">
      <motion.div style={{ scale }} className="absolute inset-0">
        <img src={heroImg} alt="Premium Nigerian foods" className="h-full w-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-navy/40 via-navy/30 to-navy/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/70 via-navy/20 to-transparent" />

      <motion.div style={{ y, opacity }} className="relative z-10 h-full mx-auto max-w-7xl px-6 lg:px-10 flex flex-col justify-start pt-36 md:pt-44 lg:pt-48 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 self-start px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 mb-8"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
          <span className="text-[11px] tracking-[0.3em] uppercase text-white/90 font-medium">Food You Can Trust</span>
        </motion.div>

        <h1 className="font-display font-extrabold text-white leading-[1.05] md:leading-[1.1] tracking-[-0.03em] text-[clamp(2.5rem,6vw,5.5rem)] max-w-full sm:max-w-3xl lg:max-w-5xl break-words">
          {["Premium", "Nigerian", "Foods"].map((w, i) => (
            <motion.span
              key={w}
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.35 + i * 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block mr-[0.25em]"
            >
              {w}
            </motion.span>
          ))}
          <br />
          <motion.span
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="block mt-4 bg-gradient-to-r from-[oklch(0.88_0.13_85)] via-gold to-[oklch(0.68_0.17_70)] bg-clip-text text-transparent italic font-display"
          >
            crafted with quality.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.8 }}
          className="mt-8 text-white/80 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed text-pretty"
        >
          From premium swallow flours and staple foods to organically smoked catfish - safe, nutritious, hygienically processed foods trusted by families, retailers, and distributors across Nigeria.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7 }}
          className="mt-10 flex flex-wrap gap-3"
        >
          <Link to="/products" className="group inline-flex h-14 items-center gap-3 px-8 rounded-full bg-gold text-navy font-medium shadow-[var(--shadow-gold)] hover:shadow-[0_25px_60px_-15px_oklch(0.76_0.15_78/0.65)] hover:-translate-y-0.5 transition-all">
            Shop Products
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link to="/contact" className="inline-flex h-14 items-center gap-3 px-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium hover:bg-white/20 transition-all">
            Become a Distributor
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4 text-white/70 text-xs uppercase tracking-[0.2em]"
        >
          {trust.map((t) => (
            <div key={t.label} className="inline-flex items-center gap-2">
              <t.icon className="h-4 w-4 text-gold" />
              {t.label}
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 text-[10px] uppercase tracking-[0.3em]"
      >
        Scroll
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity }} className="h-8 w-px bg-white/40" />
      </motion.div>
    </section>
  );
}