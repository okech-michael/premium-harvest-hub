import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
import { Story } from "@/components/home/Story";
import { Collections } from "@/components/home/Collections";
import { WhyUs } from "@/components/home/WhyUs";
import { Process } from "@/components/home/Process";
import { Catfish } from "@/components/home/Catfish";
import { Serve } from "@/components/home/Serve";
import { Testimonials } from "@/components/home/Testimonials";
import { CTA } from "@/components/home/CTA";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SnowSea & ShoFirm Foods — Premium Nigerian Foods Online" },
      { name: "description", content: "Premium swallow flours, staple foods, baby food and organically smoked catfish. Order online, delivered nationwide. Food you can trust." },
      { property: "og:title", content: "SnowSea & ShoFirm Foods — Premium Nigerian Foods" },
      { property: "og:description", content: "Crafted with quality. Delivered with trust. Nationwide." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <Story />
      <Collections />
      <WhyUs />
      <Process />
      <Catfish />
      <Serve />
      <Testimonials />
      <CTA />
    </>
  );
}
