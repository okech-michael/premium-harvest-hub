import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Check, ShieldCheck } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatNaira, NIGERIAN_STATES } from "@/lib/products";
import { placeOrder } from "@/lib/orders.functions";

const schema = z.object({
  name: z.string().min(2, "Required").max(120),
  phone: z.string().min(7, "Phone is required").max(40),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  address: z.string().min(5, "Delivery address required").max(400),
  city: z.string().min(2, "City required").max(120),
  state: z.string().min(2, "Select a state"),
  deliveryInstructions: z.string().max(500).optional(),
  notes: z.string().max(800).optional(),
  preferredContact: z.enum(["phone", "email", "whatsapp"]),
  paymentMethod: z.enum(["pay_on_delivery", "bank_transfer"]),
});
type FormData = z.infer<typeof schema>;

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — SnowSea & ShoFirm Foods" }] }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const [confirmed, setConfirmed] = useState<{ reference: string; total: number } | null>(null);
  const place = useServerFn(placeOrder);
  const m = useMutation({
    mutationFn: place,
    onSuccess: (r) => { setConfirmed(r); clear(); },
  });

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { preferredContact: "phone", paymentMethod: "pay_on_delivery" },
  });

  const onSubmit = (values: FormData) => {
    if (items.length === 0) return;
    m.mutate({ data: { customer: values, items: items.map((i) => ({
      productId: i.productId, name: i.name, sizeLabel: i.sizeLabel, unitPrice: i.unitPrice, quantity: i.quantity,
    })) } });
  };

  if (confirmed) {
    return (
      <section className="pt-32 pb-32 min-h-screen bg-cream">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <div className="h-20 w-20 mx-auto rounded-full bg-gold grid place-items-center mb-6 shadow-[var(--shadow-gold)]">
            <Check className="h-9 w-9 text-navy" />
          </div>
          <h1 className="font-display font-extrabold text-navy text-4xl lg:text-5xl mb-4">Order received!</h1>
          <p className="text-muted-foreground text-lg">Thank you for choosing SnowSea & ShoFirm. We've received your order and our team will reach out shortly to confirm delivery.</p>
          <div className="mt-8 p-6 rounded-3xl bg-white border border-border/50 inline-block">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Order reference</div>
            <div className="font-display font-extrabold text-navy text-2xl">{confirmed.reference}</div>
            <div className="mt-3 text-sm">Total: <span className="font-display font-bold">{formatNaira(confirmed.total)}</span></div>
          </div>
          <div className="mt-10">
            <button onClick={() => navigate({ to: "/products" })} className="inline-flex h-12 items-center px-8 rounded-full bg-navy text-white font-medium">Continue Shopping</button>
          </div>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="pt-32 pb-32 min-h-screen grid place-items-center text-center">
        <div>
          <h1 className="font-display font-extrabold text-navy text-3xl mb-3">Your cart is empty</h1>
          <button onClick={() => navigate({ to: "/products" })} className="text-gold">Browse products</button>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-32 pb-24 min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <h1 className="font-display font-extrabold text-navy text-4xl lg:text-5xl mb-2">Checkout</h1>
        <p className="text-muted-foreground mb-10">No account required — just delivery details.</p>
        <form onSubmit={handleSubmit(onSubmit)} className="grid lg:grid-cols-[1fr_380px] gap-10">
          <div className="space-y-8">
            <Section title="Contact details">
              <Field label="Full name" error={errors.name?.message}><input {...register("name")} className={input} /></Field>
              <Field label="Phone number" error={errors.phone?.message}><input {...register("phone")} className={input} placeholder="0801 234 5678" /></Field>
              <Field label="Email (optional)" error={errors.email?.message}><input {...register("email")} className={input} /></Field>
              <Field label="Preferred contact method">
                <select {...register("preferredContact")} className={input}>
                  <option value="phone">Phone call</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="email">Email</option>
                </select>
              </Field>
            </Section>

            <Section title="Delivery address">
              <Field label="Address" error={errors.address?.message}><input {...register("address")} className={input} /></Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="City" error={errors.city?.message}><input {...register("city")} className={input} /></Field>
                <Field label="State" error={errors.state?.message}>
                  <select {...register("state")} className={input} defaultValue="">
                    <option value="" disabled>Select state</option>
                    {NIGERIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </Field>
              </div>
              <Field label="Delivery instructions (optional)"><textarea {...register("deliveryInstructions")} rows={2} className={input} /></Field>
            </Section>

            <Section title="Payment">
              <Field label="Payment method">
                <select {...register("paymentMethod")} className={input}>
                  <option value="pay_on_delivery">Pay on delivery</option>
                  <option value="bank_transfer">Bank transfer</option>
                </select>
              </Field>
              <Field label="Order notes (optional)"><textarea {...register("notes")} rows={2} className={input} /></Field>
            </Section>

            {m.isError && <div className="text-sm text-destructive">Could not place order. Please try again.</div>}
          </div>

          <aside className="p-6 lg:p-8 rounded-3xl bg-navy text-white h-fit lg:sticky lg:top-28">
            <div className="font-display font-extrabold text-xl mb-6">Your order</div>
            <ul className="space-y-3 mb-6 max-h-64 overflow-auto pr-2">
              {items.map((i) => (
                <li key={`${i.slug}-${i.sizeLabel}`} className="flex gap-3 text-sm">
                  <img src={i.image} alt={i.name} className="h-12 w-12 rounded-lg object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="truncate">{i.name}</div>
                    <div className="text-white/60 text-xs">{i.sizeLabel} × {i.quantity}</div>
                  </div>
                  <div className="text-white/90">{formatNaira(i.unitPrice * i.quantity)}</div>
                </li>
              ))}
            </ul>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-white/70">Subtotal</span><span>{formatNaira(subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-white/70">Delivery</span><span>Quoted separately</span></div>
              <div className="h-px bg-white/10 my-3" />
              <div className="flex justify-between font-display font-extrabold text-lg"><span>Total</span><span className="text-gold">{formatNaira(subtotal)}</span></div>
            </div>
            <button type="submit" disabled={m.isPending} className="mt-6 w-full h-12 rounded-full bg-gold text-navy font-medium inline-flex items-center justify-center gap-2 hover:-translate-y-0.5 transition-all disabled:opacity-60">
              {m.isPending ? <><Loader2 className="h-4 w-4 animate-spin" /> Placing order...</> : "Place Order"}
            </button>
            <div className="mt-4 flex items-center gap-2 text-xs text-white/60"><ShieldCheck className="h-3.5 w-3.5 text-gold" /> Your details are secure.</div>
          </aside>
        </form>
      </div>
    </section>
  );
}

const input = "w-full h-12 px-4 rounded-xl bg-muted border border-transparent focus:border-gold focus:bg-background focus:outline-none transition";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-6 lg:p-8 rounded-3xl bg-cream border border-border/40 space-y-4">
      <div className="font-display font-extrabold text-navy text-lg">{title}</div>
      {children}
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 font-semibold">{label}</div>
      {children}
      {error && <div className="text-xs text-destructive mt-1">{error}</div>}
    </label>
  );
}