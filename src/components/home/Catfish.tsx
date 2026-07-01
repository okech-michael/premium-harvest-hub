import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import catfishHero from "@/assets/catfish-hero.jpg";

export function Catfish() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1.25]);

  const features = [
    "Hand-selected organic catfish",
    "Slow-smoked over hardwood",
    "Zero chemicals or preservatives",
    "Vacuum-sealed for freshness",
    "Long shelf life, restaurant-grade",
  ];

  return (
    <section ref={ref} className="relative min-h-[100svh] bg-navy text-white overflow-hidden">
      <motion.div style={{ scale }} className="absolute inset-0">
        <img src={catfishHero} alt="Organically smoked catfish" loading="lazy" className="h-full w-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-32 lg:py-44 grid lg:grid-cols-2 gap-16">
        <div className="lg:max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <span className="h-px w-10 bg-gold" />
            <span className="text-[11px] tracking-[0.3em] uppercase text-gold font-semibold">Signature Product</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-extrabold text-balance leading-[0.98] tracking-tight text-[clamp(2.5rem,5vw,5rem)]"
          >
            Organic Smoked Catfish.<br />
            <span className="italic text-gold">Crafted the right way.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="mt-8 text-white/75 text-lg leading-relaxed max-w-lg"
          >
            We don't take shortcuts with catfish. Every fish is hand-selected, naturally cured, and slow-smoked over hardwood - never chemically treated. The result is a deep, rich flavour and a clean conscience.
          </motion.p>
          <motion.ul
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="mt-8 space-y-3"
          >
            {features.map((f, i) => (
              <motion.li
                key={f}
                initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                className="flex items-center gap-3 text-white/85"
              >
                <span className="h-7 w-7 rounded-full bg-gold/15 text-gold grid place-items-center shrink-0"><Check className="h-4 w-4" /></span>
                {f}
              </motion.li>
            ))}
          </motion.ul>
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10"
          >
            <Link to="/products/$slug" params={{ slug: "smoked-catfish" }} className="inline-flex h-14 items-center gap-3 px-8 rounded-full bg-gold text-navy font-medium shadow-[var(--shadow-gold)] hover:-translate-y-0.5 transition-all">
              Order Smoked Catfish
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}