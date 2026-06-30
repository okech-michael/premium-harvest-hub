import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function PageHeader({ eyebrow, title, lede, children }: { eyebrow: string; title: ReactNode; lede?: string; children?: ReactNode }) {
  return (
    <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-28 bg-cream overflow-hidden">
      <div className="absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-gold/15 blur-[120px]" />
      <div className="relative mx-auto max-w-5xl px-6 lg:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-6"
        >
          <span className="h-px w-10 bg-gold" />
          <span className="text-[11px] tracking-[0.3em] uppercase text-gold font-semibold">{eyebrow}</span>
          <span className="h-px w-10 bg-gold" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display font-extrabold text-navy text-balance leading-[1] tracking-tight text-[clamp(2.5rem,5.5vw,5rem)]"
        >
          {title}
        </motion.h1>
        {lede && (
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-muted-foreground text-lg max-w-2xl mx-auto text-pretty"
          >{lede}</motion.p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}