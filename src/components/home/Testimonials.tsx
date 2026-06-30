import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote } from "lucide-react";

const t = [
  { quote: "SnowSea garri is the only one we keep in the house now. The texture and freshness are simply unmatched.", name: "Mrs. Adebanjo", role: "Lagos" },
  { quote: "Our restaurant has been sourcing their pando yam flour for over a year. Consistent quality on every order.", name: "Chef Emeka", role: "Owner, Ofada Republic" },
  { quote: "The smoked catfish is restaurant-grade. Clean smell, clean smoke, and beautifully packed.", name: "Mrs. Okonkwo", role: "Abuja" },
  { quote: "Delivery to Port Harcourt was exactly on time and the wholesale pricing is fair. Highly recommended.", name: "Chinedu R.", role: "Distributor" },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((v) => (v + 1) % t.length), 5500);
    return () => clearInterval(id);
  }, [paused]);

  const cur = t[i];
  return (
    <section onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} className="relative py-32 lg:py-40 bg-background overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-gold/10 blur-[120px]" />
      <div className="relative mx-auto max-w-4xl px-6 lg:px-10 text-center">
        <div className="inline-flex items-center gap-2 mb-8 justify-center">
          <span className="h-px w-10 bg-gold" />
          <span className="text-[11px] tracking-[0.3em] uppercase text-gold font-semibold">Loved Nationwide</span>
          <span className="h-px w-10 bg-gold" />
        </div>
        <Quote className="h-12 w-12 mx-auto text-gold/40 mb-8" />
        <div className="relative min-h-[260px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-display font-bold text-navy text-balance text-[clamp(1.5rem,2.6vw,2.5rem)] leading-tight tracking-tight">
                "{cur.quote}"
              </p>
              <div className="mt-10">
                <div className="font-display font-extrabold text-navy">{cur.name}</div>
                <div className="text-sm text-muted-foreground">{cur.role}</div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-10 flex justify-center gap-2">
          {t.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Show testimonial ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all ${idx === i ? "w-10 bg-gold" : "w-1.5 bg-navy/20"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}