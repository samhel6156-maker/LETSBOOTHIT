import { Camera, Sparkles, Users, Palette, type LucideIcon } from "lucide-react";

export type ServiceItem = {
  slug: string;
  icon: LucideIcon;
  label: string;
  title: string;
  description: string;
  details: string[];
  images: { src: string; alt: string }[];
  price: string;
  duration: string;
  extraHour: string;
};

export const services: ServiceItem[] = [
  {
    slug: "classic-booth",
    icon: Camera,
    label: "Our Services",
    title: "Classic Booth",
    description:
      "Timeless elegance with our signature enclosed photobooth experience. Perfect for weddings and formal events.",
    details: [
      "Unlimited shots",
      "4R standee prints",
      "1 backdrop option",
      "Digital copies via QR",
      "1 booth attendant",
    ],
    images: [
      { src: "https://picsum.photos/seed/classic1/600/400", alt: "Classic enclosed photobooth" },
      { src: "https://picsum.photos/seed/classic2/600/400", alt: "Guests inside classic booth" },
      { src: "https://picsum.photos/seed/classic3/600/400", alt: "Classic booth photo prints" },
    ],
    price: "₱2,500",
    duration: "2 hours",
    extraHour: "+₱1,200",
  },
  {
    slug: "video-booth",
    icon: Sparkles,
    label: "Experience",
    title: "360° Video Booth",
    description:
      "Immersive rotating platform capturing every angle of your moment. The most popular choice for parties.",
    details: [
      "Unlimited shots",
      "Slow-motion 360° video",
      "2 backdrop options",
      "Instant digital sharing via QR",
      "1 booth attendant",
    ],
    images: [
      { src: "https://picsum.photos/seed/video1/600/400", alt: "360 video booth platform" },
      { src: "https://picsum.photos/seed/video2/600/400", alt: "Guest on 360 platform" },
      { src: "https://picsum.photos/seed/video3/600/400", alt: "Slow-motion capture moment" },
    ],
    price: "₱3,500",
    duration: "2 hours",
    extraHour: "+₱1,700",
  },
  {
    slug: "open-air-setup",
    icon: Users,
    label: "Group Fun",
    title: "Open Air Setup",
    description:
      "Perfect for large groups with stunning custom backdrops. Great for corporate events and galas.",
    details: [
      "Unlimited shots",
      "4R group prints",
      "Custom backdrop of your choice",
      "Props table included",
      "1 booth attendant",
    ],
    images: [
      { src: "https://picsum.photos/seed/openair1/600/400", alt: "Open air photobooth setup" },
      { src: "https://picsum.photos/seed/openair2/600/400", alt: "Large group photo" },
      { src: "https://picsum.photos/seed/openair3/600/400", alt: "Custom backdrop display" },
    ],
    price: "₱3,000",
    duration: "2 hours",
    extraHour: "+₱1,500",
  },
  {
    slug: "branded-events",
    icon: Palette,
    label: "Branding",
    title: "Branded Events",
    description:
      "Custom designed experiences tailored to your brand identity. Make every snapshot on-brand.",
    details: [
      "Unlimited shots",
      "Custom branded print template",
      "Logo/brand overlay on photos",
      "Optional guest data capture",
      "1 booth attendant",
    ],
    images: [
      { src: "https://picsum.photos/seed/branded1/600/400", alt: "Branded backdrop setup" },
      { src: "https://picsum.photos/seed/branded2/600/400", alt: "Custom branded photo strip" },
      { src: "https://picsum.photos/seed/branded3/600/400", alt: "On-brand event photobooth" },
    ],
    price: "₱4,000",
    duration: "2 hours",
    extraHour: "+₱1,800",
  },
];