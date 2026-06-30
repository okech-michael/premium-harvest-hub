import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  image: string;
  sizeLabel: string;
  unitPrice: number;
  quantity: number;
};

type CartCtx = {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (item: CartItem) => void;
  setQty: (slug: string, sizeLabel: string, qty: number) => void;
  remove: (slug: string, sizeLabel: string) => void;
  clear: () => void;
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const Ctx = createContext<CartCtx | null>(null);
const STORAGE = "snowsea-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(STORAGE, JSON.stringify(items)); } catch {}
  }, [items, hydrated]);

  const add = useCallback((item: CartItem) => {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.slug === item.slug && i.sizeLabel === item.sizeLabel);
      if (idx > -1) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + item.quantity };
        return next;
      }
      return [...prev, item];
    });
    setIsOpen(true);
  }, []);

  const setQty = useCallback((slug: string, sizeLabel: string, qty: number) => {
    setItems((prev) =>
      prev
        .map((i) => (i.slug === slug && i.sizeLabel === sizeLabel ? { ...i, quantity: qty } : i))
        .filter((i) => i.quantity > 0),
    );
  }, []);

  const remove = useCallback((slug: string, sizeLabel: string) => {
    setItems((prev) => prev.filter((i) => !(i.slug === slug && i.sizeLabel === sizeLabel)));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartCtx>(() => {
    const subtotal = items.reduce((s, i) => s + i.unitPrice * i.quantity, 0);
    const count = items.reduce((s, i) => s + i.quantity, 0);
    return {
      items, subtotal, count, add, setQty, remove, clear,
      isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false),
    };
  }, [items, isOpen, add, setQty, remove, clear]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}