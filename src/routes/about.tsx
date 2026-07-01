import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/PageHeader";
import factoryImg from "@/assets/factory.jpg";
import familyImg from "@/assets/family-meal.jpg";
import packagingImg from "@/assets/packaging.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story - SnowSea & ShoFirm Foods Limited" },
      { name: "description", content: "The story, mission, and food safety standards behind Nigeria's premium food manufacturer." },
      { property: "og:title", content: "Our Story - SnowSea & ShoFirm Foods" },
    ],
  }),
  component: AboutPage,
});

const values = [
  { t: "Quality first", d: "We refuse to ship a product we wouldn't serve our own family." },
  { t: "Hygiene always", d: "Every facility, every batch, every shift - without compromise." },
  { t: "Honest sourcing", d: "Direct partnerships with farmers we know and trust." },
  { t: "Community", d: "Nigerian foods, made by Nigerians, for the world." },
];

function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Story"
        title={<>Food families <span className="italic text-gold/90">can trust.</span></>}
        lede="SnowSea & ShoFirm Foods Limited is a modern Nigerian food manufacturer built on a single promise - that the staples that nourish our homes deserve world-class care."
      />

      <section className="py-24 lg:py-32 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="text-[11px] tracking-[0.3em] uppercase text-gold font-semibold mb-4">Our Mission</div>
            <h2 className="font-display font-extrabold text-navy text-4xl lg:text-5xl leading-tight">To set a new standard for Nigerian food manufacturing.</h2>
            <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
              Our mission is to make premium, hygienically processed Nigerian staples accessible to every family, restaurant and retailer - without compromise on quality, safety or value.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We pair generations of culinary wisdom with modern food science, equipping every batch with the consistency, safety, and care our customers deserve.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="aspect-[4/5] rounded-3xl overflow-hidden shadow-[var(--shadow-elegant)]">
            <img src={factoryImg} alt="Manufacturing" loading="lazy" className="h-full w-full object-cover" />
          </motion.div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-[11px] tracking-[0.3em] uppercase text-gold font-semibold mb-4">Our Values</div>
            <h2 className="font-display font-extrabold text-navy text-4xl lg:text-5xl">What guides every decision.</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <motion.div key={v.t} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }} className="p-7 rounded-3xl bg-white">
                <div className="font-display font-extrabold text-gold text-3xl mb-3">0{i + 1}</div>
                <div className="font-display font-bold text-navy text-xl mb-2">{v.t}</div>
                <div className="text-sm text-muted-foreground">{v.d}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="aspect-[4/5] rounded-3xl overflow-hidden shadow-[var(--shadow-elegant)] lg:order-2">
            <img src={familyImg} alt="Family enjoying food" loading="lazy" className="h-full w-full object-cover" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="lg:order-1">
            <div className="text-[11px] tracking-[0.3em] uppercase text-gold font-semibold mb-4">Food Safety</div>
            <h2 className="font-display font-extrabold text-navy text-4xl lg:text-5xl leading-tight">Hygiene built into every step.</h2>
            <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
              From raw material inspection to sealed packaging, every stage of our process is governed by strict food safety protocols. We use stainless-steel processing lines, climate-controlled storage and rigorous batch testing.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-6">
              <Stat k="100%" v="Batches inspected" />
              <Stat k="36" v="States served" />
              <Stat k="0" v="Artificial additives" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="aspect-[16/7] rounded-3xl overflow-hidden">
            <img src={packagingImg} alt="Packaging warehouse" loading="lazy" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <div className="font-display font-extrabold text-navy text-3xl">{k}</div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{v}</div>
    </div>
  );
}