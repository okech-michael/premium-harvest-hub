import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { productsQuery } from "@/lib/products.queries";
import { getImage } from "@/lib/products";

export function Collections() {
  const isBrowser = typeof window !== "undefined";
  const { data: products = [] } = useQuery({
    ...productsQuery,
    enabled: isBrowser,
    refetchOnWindowFocus: false,
  });
  const grid = products.slice(0, 8);

  return (
    <section className="relative py-32 lg:py-40 bg-cream">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-5">
              <span className="h-px w-10 bg-gold" />
              <span className="text-[11px] tracking-[0.3em] uppercase text-gold font-semibold">Product Collections</span>
            </div>
            <h2 className="font-display font-extrabold text-navy text-balance leading-[1] tracking-tight text-[clamp(2.25rem,4.4vw,4.25rem)]">
              Every staple,<br />
              <span className="italic text-gold/90">crafted to perfection.</span>
            </h2>
          </div>
          <Link to="/products" className="gold-underline self-start md:self-end inline-flex items-center gap-2 text-navy font-medium">
            Shop the full catalogue <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {grid.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link to="/products/$slug" params={{ slug: p.slug }} className="group block">
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-white shadow-[var(--shadow-lift)] hover:shadow-[var(--shadow-elegant)] transition-all duration-500">
                  <motion.img
                    src={getImage(p.image_path)}
                    alt={p.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/10 to-transparent opacity-90" />
                  {p.badge && (
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gold text-navy text-[10px] uppercase tracking-wider font-bold">
                      {p.badge}
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <div className="text-[10px] tracking-[0.25em] uppercase text-gold/90 mb-1.5">{p.category}</div>
                    <div className="font-display font-bold text-xl leading-tight">{p.name}</div>
                    <div className="mt-3 flex items-center justify-between text-xs">
                      <span className="text-white/70 line-clamp-1">{p.short_description}</span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}