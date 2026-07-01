import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone, Clock } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — SnowSea & ShoFirm Foods" },
      { name: "description", content: "Get in touch about wholesale, distribution or general enquiries. We respond within one business day." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={<>Let's talk about <span className="italic text-gold/90">your order.</span></>}
        lede="Whether you're a household, restaurant, supermarket or distributor — we'd love to hear from you."
      />
      <section className="pb-24 lg:pb-32 bg-background">
        <div className="mx-auto max-w-6xl px-6 lg:px-10 grid lg:grid-cols-[1fr_400px] gap-10">
          <form className="p-8 lg:p-10 rounded-3xl bg-cream border border-border/40 space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Thanks! We'll be in touch shortly."); }}>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Your name"><input required className={input} /></Field>
              <Field label="Phone"><input required className={input} /></Field>
            </div>
            <Field label="Email"><input type="email" required className={input} /></Field>
            <Field label="Enquiry type">
              <select className={input}>
                <option>General enquiry</option>
                <option>Wholesale / Bulk order</option>
                <option>Distributor application</option>
                <option>Restaurant / Hotel supply</option>
              </select>
            </Field>
            <Field label="Message"><textarea rows={5} required className={input} /></Field>
            <button className="w-full h-12 rounded-full bg-navy text-white font-medium hover:bg-navy/90">Send message</button>
          </form>

          <div className="space-y-4">
            <InfoCard icon={MapPin} title="Visit us" lines={["Lagos, Nigeria", "Monday – Saturday"]} />
            <InfoCard icon={Phone} title="Call us" lines={["+2342223878"]} />
            <InfoCard icon={Mail} title="Email" lines={["shofirmfood@gmail.com"]} />
            <InfoCard icon={Clock} title="Hours" lines={["Mon – Fri: 9am – 6pm", "Sat: 10am – 4pm"]} />
            <a href="https://wa.me/2342223878" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 h-14 rounded-2xl bg-[#25D366] text-white font-medium">
              <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

const input = "w-full h-12 px-4 rounded-xl bg-white border border-border focus:border-gold focus:outline-none transition";
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><div className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 font-semibold">{label}</div>{children}</label>;
}
function InfoCard({ icon: Icon, title, lines }: { icon: React.ComponentType<{ className?: string }>; title: string; lines: string[] }) {
  return (
    <div className="p-6 rounded-2xl bg-cream border border-border/40 flex gap-4">
      <div className="h-10 w-10 rounded-xl bg-gold/15 text-gold grid place-items-center shrink-0"><Icon className="h-5 w-5" /></div>
      <div>
        <div className="font-display font-bold text-navy">{title}</div>
        {lines.map((l) => <div key={l} className="text-sm text-muted-foreground">{l}</div>)}
      </div>
    </div>
  );
}