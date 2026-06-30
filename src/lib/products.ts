import semoImg from "@/assets/product-semo.jpg";
import garriImg from "@/assets/product-garri.jpg";
import pupuruImg from "@/assets/product-pupuru.jpg";
import cassavaImg from "@/assets/product-cassava.jpg";
import plantainImg from "@/assets/product-plantain.jpg";
import yamImg from "@/assets/product-yam.jpg";
import pandoImg from "@/assets/product-pando.jpg";
import cocoyamImg from "@/assets/product-cocoyam.jpg";
import sweetPotatoImg from "@/assets/product-sweet-potato.jpg";
import wheatImg from "@/assets/product-wheat.jpg";
import babyImg from "@/assets/product-baby.jpg";
import catfishImg from "@/assets/product-catfish.jpg";

export const productImages: Record<string, string> = {
  "product-semo.jpg": semoImg,
  "product-garri.jpg": garriImg,
  "product-pupuru.jpg": pupuruImg,
  "product-cassava.jpg": cassavaImg,
  "product-plantain.jpg": plantainImg,
  "product-yam.jpg": yamImg,
  "product-pando.jpg": pandoImg,
  "product-cocoyam.jpg": cocoyamImg,
  "product-sweet-potato.jpg": sweetPotatoImg,
  "product-wheat.jpg": wheatImg,
  "product-baby.jpg": babyImg,
  "product-catfish.jpg": catfishImg,
};

export type ProductSize = { label: string; price: number };

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  short_description: string;
  long_description: string | null;
  benefits: string[] | null;
  base_price: number;
  sizes: ProductSize[];
  image_path: string;
  badge: string | null;
  in_stock: boolean;
  featured: boolean;
  sort_order: number;
};

export function getImage(path: string): string {
  return productImages[path] ?? "";
}

export function formatNaira(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

export const NIGERIAN_STATES = [
  "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno",
  "Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT - Abuja","Gombe",
  "Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos",
  "Nasarawa","Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto",
  "Taraba","Yobe","Zamfara",
];