import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/faq")({
  head: () => ({ meta: [{ title: "FAQ - SnowSea & ShoFirm Foods" }, { name: "description", content: "Answers to common questions about delivery, wholesale, food safety and orders." }] }),
  component: FAQPage,
});

const faqs = [
  { q: "Do I need to create an account to order?", a: "No. Ordering is completely account-free - just add items to your cart and provide your delivery details at checkout." },
  { q: "Where do you deliver?", a: "We deliver to all 36 states of Nigeria including the FCT. Delivery times and fees vary by location and are confirmed by our team after you place your order." },
  { q: "How long does delivery take?", a: "Lagos orders: 1–2 business days. Other major cities: 2–4 business days. Remote locations may take longer. Wholesale shipments are scheduled separately." },
  { q: "How is the smoked catfish processed?", a: "Our catfish is hand-selected, naturally cured, and slow-smoked over hardwood. No chemicals, no preservatives - just clean, traditional smoking." },
  { q: "Do you offer wholesale or distributor pricing?", a: "Yes. Reach out via our contact page or WhatsApp with the products and quantities you're interested in, and we'll send a tailored quote." },
  { q: "How are products packaged?", a: "Flours and staples come in sealed, resealable packs. Smoked catfish is vacuum-sealed for maximum freshness and shelf life." },
  { q: "What's your return policy?", a: "If a product arrives damaged or below the quality we promise, contact us within 48 hours of delivery and we'll replace it." },
  { q: "Is your facility food-safety certified?", a: "Yes. We follow strict food-safety protocols across processing, packaging and storage, and every batch is inspected before dispatch." },
];

function FAQPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <>
      <PageHeader eyebrow="FAQ" title={<>Questions, <span className="italic text-gold/90">answered.</span></>} lede="Everything you'd want to know about ordering, delivery, food safety and wholesale." />
      <section className="pb-24 lg:pb-32 bg-background">
        <div className="mx-auto max-w-3xl px-6 lg:px-10 space-y-3">
          {faqs.map((f, i) => (
            <div key={f.q} className="rounded-2xl bg-cream border border-border/40 overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full p-6 flex items-center justify-between gap-6 text-left">
                <span className="font-display font-bold text-navy">{f.q}</span>
                <span className="h-9 w-9 shrink-0 rounded-full bg-white grid place-items-center text-navy">
                  {open === i ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                    <div className="px-6 pb-6 text-muted-foreground leading-relaxed">{f.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}