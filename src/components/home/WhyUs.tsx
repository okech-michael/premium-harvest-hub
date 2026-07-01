import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, Factory, Truck, Leaf, Tag, Award, Boxes } from "lucide-react";

const items = [
  { icon: Sparkles, title: "Premium Ingredients", text: "Hand-selected raw materials inspected before they ever enter our facility." },
  { icon: ShieldCheck, title: "Certified Food Safety", text: "Modern hygiene protocols on every batch, every day, without exception." },
  { icon: Factory, title: "Modern Manufacturing", text: "Stainless-steel processing lines built for consistency at scale." },
  { icon: Truck, title: "Nationwide Distribution", text: "Reliable logistics serving homes and businesses across all 36 states." },
  { icon: Leaf, title: "Organic Processing", text: "Chemical-free smoke curing and natural preservation techniques." },
  { icon: Tag, title: "Honest Pricing", text: "Premium quality without the premium markup - fair pricing always." },
  { icon: Award, title: "Customer Satisfaction", text: "Trusted by thousands of households, restaurants and supermarkets." },
  { icon: Boxes, title: "Wholesale Supply", text: "Reliable bulk supply for retailers, restaurants and distributors." },
];

export function WhyUs() {
  return (
    <section className="relative py-32 lg:py-40 bg-navy text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.76_0.15_78/0.18),transparent_55%)]" />
      <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-gold/10 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="h-px w-10 bg-gold" />
            <span className="text-[11px] tracking-[0.3em] uppercase text-gold font-semibold">Why Choose Us</span>
            <span className="h-px w-10 bg-gold" />
          </div>
          <h2 className="font-display font-extrabold text-balance leading-[1] tracking-tight text-[clamp(2.25rem,4.4vw,4.25rem)]">
            Eight reasons families choose <span className="italic text-gold">SnowSea</span>.
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.08 }}
              whileHover={{ y: -4 }}
              className="group relative p-7 rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-sm hover:bg-white/[0.07] hover:border-gold/30 transition-all"
            >
              <div className="h-12 w-12 rounded-xl bg-gold/15 text-gold grid place-items-center mb-5 group-hover:bg-gold group-hover:text-navy transition-colors">
                <it.icon className="h-5 w-5" />
              </div>
              <div className="font-display font-bold text-lg mb-2">{it.title}</div>
              <div className="text-sm text-white/60 leading-relaxed">{it.text}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}