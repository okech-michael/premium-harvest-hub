import { motion } from "framer-motion";
import { Home, Store, Building2, Utensils, Hotel, ShoppingCart, Truck, ChefHat } from "lucide-react";

const audiences = [
  { icon: Home, label: "Homes" },
  { icon: Store, label: "Retailers" },
  { icon: Truck, label: "Wholesalers" },
  { icon: Utensils, label: "Restaurants" },
  { icon: Hotel, label: "Hotels" },
  { icon: ShoppingCart, label: "Supermarkets" },
  { icon: Building2, label: "Distributors" },
  { icon: ChefHat, label: "Food Vendors" },
];

export function Serve() {
  return (
    <section className="py-32 lg:py-40 bg-cream">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="h-px w-10 bg-gold" />
            <span className="text-[11px] tracking-[0.3em] uppercase text-gold font-semibold">Who We Serve</span>
            <span className="h-px w-10 bg-gold" />
          </div>
          <h2 className="font-display font-extrabold text-navy text-balance leading-[1] tracking-tight text-[clamp(2.25rem,4.2vw,4rem)]">
            From home kitchens to <span className="italic text-gold/90">five-star restaurants.</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-5">
          {audiences.map((a, i) => (
            <motion.div
              key={a.label}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
              whileHover={{ y: -6 }}
              className="group p-8 lg:p-10 rounded-3xl bg-white border border-border/60 hover:border-gold/40 hover:shadow-[var(--shadow-lift)] text-center transition-all"
            >
              <div className="mx-auto h-14 w-14 rounded-2xl bg-gold/10 text-gold grid place-items-center mb-5 group-hover:bg-gold group-hover:text-navy transition-colors">
                <a.icon className="h-6 w-6" />
              </div>
              <div className="font-display font-bold text-navy text-lg">{a.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}