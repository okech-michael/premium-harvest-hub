import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Check, Minus, Plus, ShoppingBag, ArrowLeft } from "lucide-react";
import { productBySlugQuery, productsQuery } from "@/lib/products.queries";
import { formatNaira, getImage } from "@/lib/products";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/products/$slug")({
  loader: async ({ context, params }) => {
    const p = await context.queryClient.ensureQueryData(productBySlugQuery(params.slug));
    if (!p) throw notFound();
    context.queryClient.ensureQueryData(productsQuery);
    return p;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} — SnowSea & ShoFirm Foods` },
          { name: "description", content: loaderData.short_description },
          { property: "og:title", content: loaderData.name },
          { property: "og:description", content: loaderData.short_description },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center pt-20">
      <div className="text-center">
        <div className="font-display font-extrabold text-navy text-3xl mb-3">Product not found</div>
        <Link to="/products" className="text-gold">Back to all products</Link>
      </div>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="min-h-screen grid place-items-center pt-20 text-center">
      <div>
        <div className="font-display font-extrabold text-navy text-2xl mb-3">Something went wrong</div>
        <button onClick={reset} className="text-gold">Try again</button>
      </div>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useParams();
  const { data: product } = useQuery(productBySlugQuery(slug));
  const { data: all = [] } = useQuery(productsQuery);
  const cart = useCart();
  const sizes = product?.sizes ?? [];
  const [sizeIdx, setSizeIdx] = useState(0);
  const [qty, setQty] = useState(1);

  if (!product) return null;
  const size = sizes[sizeIdx] ?? { label: "", price: product.base_price };
  const related = all.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  return (
    <>
      <section className="pt-32 pb-20 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Link to="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-navy mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to products
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-square rounded-3xl overflow-hidden bg-cream shadow-[var(--shadow-elegant)]"
            >
              <img src={getImage(product.image_path)} alt={product.name} className="h-full w-full object-cover" />
              {product.badge && (
                <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-gold text-navy text-xs uppercase tracking-wider font-bold">{product.badge}</div>
              )}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
              <div className="text-[11px] tracking-[0.3em] uppercase text-gold font-semibold mb-3">{product.category}</div>
              <h1 className="font-display font-extrabold text-navy text-balance leading-[1.05] tracking-tight text-[clamp(2rem,4vw,3.5rem)]">{product.name}</h1>
              <p className="mt-5 text-muted-foreground text-lg leading-relaxed">{product.short_description}</p>
              {product.long_description && (
                <p className="mt-4 text-muted-foreground leading-relaxed">{product.long_description}</p>
              )}

              {product.benefits && product.benefits.length > 0 && (
                <div className="mt-8 grid grid-cols-2 gap-3">
                  {product.benefits.map((b) => (
                    <div key={b} className="flex items-center gap-2.5 text-sm text-navy/80">
                      <span className="h-6 w-6 shrink-0 rounded-full bg-gold/15 text-gold grid place-items-center"><Check className="h-3.5 w-3.5" /></span>
                      {b}
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-10 p-6 lg:p-8 rounded-3xl bg-cream border border-border/50">
                {sizes.length > 0 && (
                  <>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3 font-semibold">Choose size</div>
                    <div className="flex flex-wrap gap-2">
                      {sizes.map((s, i) => (
                        <button
                          key={s.label}
                          onClick={() => setSizeIdx(i)}
                          className={`px-5 h-11 rounded-full text-sm font-medium transition-all ${
                            i === sizeIdx ? "bg-navy text-white" : "bg-white border border-border text-navy hover:border-gold"
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </>
                )}
                <div className="mt-6 flex items-end justify-between gap-4">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Price</div>
                    <div className="font-display font-extrabold text-navy text-3xl">{formatNaira(size.price)}</div>
                  </div>
                  <div className="inline-flex items-center rounded-full bg-white border border-border">
                    <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-12 w-12 grid place-items-center"><Minus className="h-4 w-4" /></button>
                    <span className="w-10 text-center font-display font-bold">{qty}</span>
                    <button onClick={() => setQty((q) => q + 1)} className="h-12 w-12 grid place-items-center"><Plus className="h-4 w-4" /></button>
                  </div>
                </div>
                <button
                  onClick={() =>
                    cart.add({
                      productId: product.id, slug: product.slug, name: product.name,
                      image: getImage(product.image_path), sizeLabel: size.label, unitPrice: size.price, quantity: qty,
                    })
                  }
                  className="mt-6 w-full h-14 rounded-full bg-gold text-navy font-medium inline-flex items-center justify-center gap-2 hover:-translate-y-0.5 shadow-[var(--shadow-gold)] transition-all"
                >
                  <ShoppingBag className="h-4 w-4" /> Add to Cart — {formatNaira(size.price * qty)}
                </button>
              </div>
            </motion.div>
          </div>

          {related.length > 0 && (
            <div className="mt-32">
              <h2 className="font-display font-extrabold text-navy text-3xl mb-10">You may also like</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                {related.map((p) => (
                  <Link key={p.id} to="/products/$slug" params={{ slug: p.slug }} className="group">
                    <div className="aspect-square rounded-3xl overflow-hidden bg-cream">
                      <img src={getImage(p.image_path)} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>
                    <div className="mt-3 font-display font-bold text-navy group-hover:text-gold transition-colors">{p.name}</div>
                    <div className="text-sm text-muted-foreground">From {formatNaira(p.base_price)}</div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}