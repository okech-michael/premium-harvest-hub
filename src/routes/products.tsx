import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Search, ArrowUpRight } from "lucide-react";
import { productsQuery } from "@/lib/products.queries";
import { formatNaira, getImage } from "@/lib/products";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Shop Premium Nigerian Foods - SnowSea & ShoFirm" },
      { name: "description", content: "Browse our premium catalogue: swallow flours, garri, smoked catfish, baby food and more. Nationwide delivery." },
      { property: "og:title", content: "Shop - SnowSea & ShoFirm Foods" },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(productsQuery),
  component: ProductsPage,
});

function ProductsPage() {
  const { data: products = [] } = useQuery(productsQuery);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("all");

  const categories = useMemo(() => ["all", ...Array.from(new Set(products.map((p) => p.category)))], [products]);
  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat = cat === "all" || p.category === cat;
      const matchQ = q === "" || p.name.toLowerCase().includes(q.toLowerCase()) || p.short_description.toLowerCase().includes(q.toLowerCase());
      return matchCat && matchQ;
    });
  }, [products, q, cat]);

  return (
    <>
      <PageHeader
        eyebrow="Product Catalogue"
        title={<>Every staple, <span className="italic text-gold/90">crafted to perfection.</span></>}
        lede="Browse our full collection of premium flours, staples, baby foods and organically smoked catfish."
      />

      <section className="bg-background py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col md:flex-row gap-4 mb-10">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search products..."
                className="w-full h-12 pl-12 pr-5 rounded-full bg-muted border border-transparent focus:border-gold focus:bg-background focus:outline-none transition"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`h-12 px-5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    cat === c ? "bg-navy text-white" : "bg-muted text-navy/70 hover:bg-muted/70"
                  }`}
                >
                  {c === "all" ? "All Products" : c}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6">
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (i % 8) * 0.05 }}
              >
                <Link to="/products/$slug" params={{ slug: p.slug }} className="group block">
                  <div className="relative aspect-square rounded-3xl overflow-hidden bg-cream shadow-[var(--shadow-lift)] hover:shadow-[var(--shadow-elegant)] transition-all">
                    <img src={getImage(p.image_path)} alt={p.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    {p.badge && (
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gold text-navy text-[10px] uppercase tracking-wider font-bold">{p.badge}</div>
                    )}
                    <div className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/90 backdrop-blur grid place-items-center opacity-0 group-hover:opacity-100 transition-all">
                      <ArrowUpRight className="h-4 w-4 text-navy" />
                    </div>
                  </div>
                  <div className="mt-5 px-1">
                    <div className="text-[10px] tracking-[0.2em] uppercase text-gold mb-1.5 font-semibold">{p.category}</div>
                    <div className="font-display font-bold text-navy text-lg group-hover:text-gold transition-colors">{p.name}</div>
                    <div className="mt-1 text-sm text-muted-foreground line-clamp-1">{p.short_description}</div>
                    <div className="mt-3 font-display font-extrabold text-navy">From {formatNaira(p.base_price)}</div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">No products match your search.</div>
          )}
        </div>
      </section>
    </>
  );
}