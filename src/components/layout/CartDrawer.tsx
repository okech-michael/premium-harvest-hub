import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatNaira } from "@/lib/products";

export function CartDrawer() {
  const { isOpen, close, items, setQty, remove, subtotal } = useCart();
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
            className="fixed inset-0 z-[70] bg-navy/40 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 32 }}
            className="fixed top-0 right-0 bottom-0 z-[71] w-full sm:w-[440px] bg-background flex flex-col shadow-[var(--shadow-elegant)]"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <div className="font-display font-extrabold text-navy text-lg">Your Cart ({items.length})</div>
              <button onClick={close} aria-label="Close cart" className="h-10 w-10 grid place-items-center rounded-full hover:bg-muted">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="h-full grid place-items-center text-center">
                  <div>
                    <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground/40 mb-3" />
                    <div className="font-display font-bold text-navy mb-1">Your cart is empty</div>
                    <div className="text-sm text-muted-foreground mb-5">Add premium foods you can trust.</div>
                    <Link to="/products" onClick={close} className="inline-flex h-11 px-6 items-center rounded-full bg-navy text-white text-sm font-medium">
                      Shop Products
                    </Link>
                  </div>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((i) => (
                    <li key={`${i.slug}-${i.sizeLabel}`} className="flex gap-4 p-3 rounded-2xl hover:bg-muted/60 transition-colors">
                      <div className="h-20 w-20 rounded-xl overflow-hidden bg-muted shrink-0">
                        <img src={i.image} alt={i.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-navy truncate">{i.name}</div>
                        <div className="text-xs text-muted-foreground">{i.sizeLabel}</div>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="inline-flex items-center rounded-full border border-border">
                            <button onClick={() => setQty(i.slug, i.sizeLabel, i.quantity - 1)} className="h-8 w-8 grid place-items-center text-navy/70 hover:text-navy"><Minus className="h-3.5 w-3.5" /></button>
                            <span className="w-7 text-center text-sm font-medium">{i.quantity}</span>
                            <button onClick={() => setQty(i.slug, i.sizeLabel, i.quantity + 1)} className="h-8 w-8 grid place-items-center text-navy/70 hover:text-navy"><Plus className="h-3.5 w-3.5" /></button>
                          </div>
                          <div className="font-display font-bold text-navy">{formatNaira(i.unitPrice * i.quantity)}</div>
                        </div>
                      </div>
                      <button onClick={() => remove(i.slug, i.sizeLabel)} aria-label="Remove" className="text-muted-foreground hover:text-destructive text-xs">Remove</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {items.length > 0 && (
              <div className="border-t border-border px-6 py-5 space-y-4">
                <div className="flex justify-between text-sm text-muted-foreground"><span>Subtotal</span><span className="font-display font-bold text-navy text-base">{formatNaira(subtotal)}</span></div>
                <div className="text-xs text-muted-foreground">Delivery calculated at checkout.</div>
                <Link
                  to="/checkout"
                  onClick={close}
                  className="block text-center w-full h-12 leading-[3rem] rounded-full bg-navy text-white font-medium hover:bg-navy/90 transition-colors"
                >
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}