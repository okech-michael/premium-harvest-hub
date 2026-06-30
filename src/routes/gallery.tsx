import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/PageHeader";
import factoryImg from "@/assets/factory.jpg";
import familyImg from "@/assets/family-meal.jpg";
import packagingImg from "@/assets/packaging.jpg";
import catfishImg from "@/assets/catfish-hero.jpg";
import heroImg from "@/assets/hero-main.jpg";
import semoImg from "@/assets/product-semo.jpg";
import garriImg from "@/assets/product-garri.jpg";
import plantainImg from "@/assets/product-plantain.jpg";
import yamImg from "@/assets/product-yam.jpg";
import babyImg from "@/assets/product-baby.jpg";

const images = [
  { src: heroImg, span: "lg:row-span-2", alt: "Premium Nigerian foods" },
  { src: factoryImg, alt: "Modern facility" },
  { src: catfishImg, span: "lg:col-span-2", alt: "Smoked catfish" },
  { src: familyImg, alt: "Family meal" },
  { src: packagingImg, alt: "Premium packaging" },
  { src: semoImg, alt: "Semo flour" },
  { src: garriImg, alt: "White garri" },
  { src: plantainImg, alt: "Plantain flour" },
  { src: yamImg, alt: "Yam flour" },
  { src: babyImg, alt: "Baby food" },
];

export const Route = createFileRoute("/gallery")({
  head: () => ({ meta: [{ title: "Gallery — SnowSea & ShoFirm Foods" }, { name: "description", content: "A look inside our facility, packaging, products and the families we serve." }] }),
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <>
      <PageHeader eyebrow="Gallery" title={<>Inside <span className="italic text-gold/90">SnowSea.</span></>} lede="Products, packaging, manufacturing, and the moments that bring it all together." />
      <section className="pb-24 lg:pb-32 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[220px] gap-3 lg:gap-4">
            {images.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: (i % 6) * 0.05 }}
                className={`relative rounded-2xl overflow-hidden bg-cream group ${img.span ?? ""}`}
              >
                <img src={img.src} alt={img.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}