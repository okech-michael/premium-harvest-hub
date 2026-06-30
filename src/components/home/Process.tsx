import { motion } from "framer-motion";

const steps = [
  { n: "01", title: "Raw Material Selection", text: "Only the finest grains, tubers and catfish make the cut." },
  { n: "02", title: "Cleaning", text: "Multi-stage washing removes every trace of dirt and impurity." },
  { n: "03", title: "Processing", text: "Stone-milling and smoke-curing using methods proven over generations." },
  { n: "04", title: "Quality Inspection", text: "Every batch is tested before it leaves the production floor." },
  { n: "05", title: "Packaging", text: "Sealed in hygienic, resealable packs that preserve freshness." },
  { n: "06", title: "Storage", text: "Climate-controlled warehousing keeps quality consistent." },
  { n: "07", title: "Distribution", text: "Delivered to your home or store, nationwide, on schedule." },
];

export function Process() {
  return (
    <section className="relative py-32 lg:py-40 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="h-px w-10 bg-gold" />
            <span className="text-[11px] tracking-[0.3em] uppercase text-gold font-semibold">Our Process</span>
          </div>
          <h2 className="font-display font-extrabold text-navy text-balance leading-[1] tracking-tight text-[clamp(2.25rem,4.4vw,4.25rem)]">
            From raw harvest to your kitchen, in <span className="italic text-gold/90">seven careful steps.</span>
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-gold via-gold/30 to-transparent md:left-1/2 md:-translate-x-1/2" />
          <div className="space-y-12 md:space-y-20">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className={`relative flex items-start gap-6 md:gap-12 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                <div className="relative z-10 shrink-0 md:flex-1 md:basis-0" />
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 h-16 w-16 rounded-full bg-gold grid place-items-center font-display font-extrabold text-navy text-lg shadow-[var(--shadow-gold)]">
                  {s.n}
                </div>
                <div className={`flex-1 pl-24 md:pl-0 ${i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                  <h3 className="font-display font-extrabold text-navy text-2xl md:text-3xl mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed max-w-md md:inline-block">{s.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}