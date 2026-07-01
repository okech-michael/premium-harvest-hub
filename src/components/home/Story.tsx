import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import factoryImg from "@/assets/factory.jpg";
import familyImg from "@/assets/family-meal.jpg";
import packagingImg from "@/assets/packaging.jpg";

export function Story() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [120, -40]);
  const y3 = useTransform(scrollYProgress, [0, 1], [-30, 100]);

  return (
    <section ref={ref} className="relative py-32 lg:py-44 bg-background overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <div className="relative h-[640px] hidden lg:block">
          <motion.div style={{ y: y1 }} className="absolute top-0 left-0 w-[58%] aspect-[3/4] rounded-3xl overflow-hidden shadow-[var(--shadow-elegant)]">
            <img src={factoryImg} alt="Modern food processing facility" loading="lazy" className="h-full w-full object-cover" />
          </motion.div>
          <motion.div style={{ y: y2 }} className="absolute top-20 right-0 w-[48%] aspect-[4/5] rounded-3xl overflow-hidden shadow-[var(--shadow-elegant)]">
            <img src={packagingImg} alt="Premium packaging" loading="lazy" className="h-full w-full object-cover" />
          </motion.div>
          <motion.div style={{ y: y3 }} className="absolute bottom-0 left-12 w-[52%] aspect-[5/4] rounded-3xl overflow-hidden shadow-[var(--shadow-elegant)]">
            <img src={familyImg} alt="Family enjoying a meal" loading="lazy" className="h-full w-full object-cover" />
          </motion.div>
        </div>

        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <span className="h-px w-10 bg-gold" />
            <span className="text-[11px] tracking-[0.3em] uppercase text-gold font-semibold">Our Story</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-extrabold text-navy text-balance leading-[0.98] tracking-tight text-[clamp(2.25rem,4.2vw,4rem)]"
          >
            Built on a single promise: <span className="italic text-gold/90">food families can trust.</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="mt-8 space-y-5 text-muted-foreground text-lg leading-relaxed text-pretty max-w-xl"
          >
            <p>
              SnowSea & ShoFirm Foods Limited was born from a simple belief - that the staples that nourish Nigerian homes deserve world-class care, from raw material to kitchen table.
            </p>
            <p>
              Today we craft premium swallow flours, staple foods and organically smoked catfish in modern, hygienic facilities. Every batch is inspected, packaged, and delivered with the kind of attention you'd expect from a brand built for the next generation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-10 grid grid-cols-3 gap-6 max-w-md"
          >
            {[
              { k: "13+", v: "Premium products" },
              { k: "36", v: "States served" },
              { k: "100%", v: "Hygiene certified" },
            ].map((s) => (
              <div key={s.v}>
                <div className="font-display font-extrabold text-navy text-3xl md:text-4xl">{s.k}</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{s.v}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}