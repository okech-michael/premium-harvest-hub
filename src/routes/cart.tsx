import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatNaira } from "@/lib/products";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Cart — SnowSea & ShoFirm Foods" }] }),
  component: CartPage,
});

function CartPage() {
  const { items, setQty, remove, subtotal } = useCart();
  return (
    <section className="pt-32 pb-24 min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <h1 className="font-display font-extrabold text-navy text-4xl lg:text-5xl mb-8">Your Cart</h1>
        {items.length === 0 ? (
          <div className="py-24 text-center">
            <div className="text-muted-foreground mb-6">Your cart is empty.</div>
            <Link to="/products" className="inline-flex h-12 items-center px-8 rounded-full bg-navy text-white font-medium">Browse Products</Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_360px] gap-10">
            <ul className="space-y-4">
              {items.map((i) => (
                <li key={`${i.slug}-${i.sizeLabel}`} className="flex gap-4 p-4 lg:p-5 rounded-3xl bg-cream border border-border/40">
                  <img src={i.image} alt={i.name} className="h-24 w-24 rounded-2xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="font-display font-bold text-navy">{i.name}</div>
                    <div className="text-sm text-muted-foreground">{i.sizeLabel}</div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="inline-flex items-center rounded-full bg-white border border-border">
                        <button onClick={() => setQty(i.slug, i.sizeLabel, i.quantity - 1)} className="h-9 w-9 grid place-items-center"><Minus className="h-3.5 w-3.5" /></button>
                        <span className="w-8 text-center text-sm font-medium">{i.quantity}</span>
                        <button onClick={() => setQty(i.slug, i.sizeLabel, i.quantity + 1)} className="h-9 w-9 grid place-items-center"><Plus className="h-3.5 w-3.5" /></button>
                      </div>
                      <div className="font-display font-bold text-navy">{formatNaira(i.unitPrice * i.quantity)}</div>
                    </div>
                  </div>
                  <button onClick={() => remove(i.slug, i.sizeLabel)} aria-label="Remove" className="h-9 w-9 grid place-items-center text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
            <aside className="p-6 lg:p-8 rounded-3xl bg-navy text-white h-fit sticky top-28">
              <div className="font-display font-extrabold text-xl mb-6">Order Summary</div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-white/70">Subtotal</span><span>{formatNaira(subtotal)}</span></div>
                <div className="flex justify-between"><span className="text-white/70">Delivery</span><span className="text-white/70">Calculated at checkout</span></div>
                <div className="h-px bg-white/10 my-4" />
                <div className="flex justify-between font-display font-extrabold text-lg"><span>Total</span><span className="text-gold">{formatNaira(subtotal)}</span></div>
              </div>
              <Link to="/checkout" className="mt-6 block text-center w-full h-12 leading-[3rem] rounded-full bg-gold text-navy font-medium">Proceed to Checkout</Link>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}