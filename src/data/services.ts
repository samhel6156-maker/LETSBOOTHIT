import {
  Camera,
  Sparkles,
  Users,
  Palette,
  type LucideIcon,
  Book,
} from "lucide-react";

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
      "1 backdrop",
      "1-2 Booth attendant",
      "Fun Props",
      "Free transportation within QC ",
    ],
    images: [
      {
        src: "https://picsum.photos/seed/classic1/600/400",
        alt: "Classic enclosed photobooth",
      },
      {
        src: "https://picsum.photos/seed/classic2/600/400",
        alt: "Guests inside classic booth",
      },
      {
        src: "https://picsum.photos/seed/classic3/600/400",
        alt: "Classic booth photo prints",
      },
    ],
    price: "₱2,500",
    duration: "2 hours",
    extraHour: "+₱1,000",
  },
  {
    slug: "Premium-booth",
    icon: Camera,
    label: "Our Services",
    title: "Premium Booth",
    description:
      "Timeless elegance with our signature enclosed photobooth experience. Perfect for weddings and formal events.",
    details: [
      "Unlimited shots",
      "4R standee prints",
      "1 backdrop",
      "1-2 Booth attendant",
      "Fun Props",
      "Free transportation within QC ",
    ],
    images: [
      {
        src: "https://picsum.photos/seed/classic1/600/400",
        alt: "Classic enclosed photobooth",
      },
      {
        src: "https://picsum.photos/seed/classic2/600/400",
        alt: "Guests inside classic booth",
      },
      {
        src: "https://picsum.photos/seed/classic3/600/400",
        alt: "Classic booth photo prints",
      },
    ],
    price: "₱3,500",
    duration: "2 hours",
    extraHour: "+₱1,000",
  },
  {
    slug: "video-booth",
    icon: Sparkles,
    label: "Experience",
    title: "360° Video Booth",
    description:
      "Capture 360° videos as our camera rotates around you and your guests on a stationary platform. Each session can accommodate up to 4 guests.",
    details: [
      "Unlimited 360° videos",
      "Fun Propso",
      "Instant QR code sharing",
      "2-3 booth attendants",
      "AirDrop available for iPhone users",
      "Free Transportation within Quezon City ",
    ],
    images: [
      {
        src: "https://picsum.photos/seed/video1/600/400",
        alt: "360 video booth platform",
      },
      {
        src: "https://picsum.photos/seed/video2/600/400",
        alt: "Guest on 360 platform",
      },
      {
        src: "https://picsum.photos/seed/video3/600/400",
        alt: "Slow-motion capture moment",
      },
    ],
    price: "₱10,000",
    duration: "3 hours",
    extraHour: "+₱2,000",
  },
  {
    slug: "High Angle",
    icon: Users,
    label: "Group Fun",
    title: "High Angle",
    description:
      "Capture stylish, wide-angle photos from above—perfect for creative poses, group shots, and fun, share-worthy moments. Framed by elegant, heavy red curtain walls, it adds a dramatic yet timeless touch to every shot.",
    details: [
      "Unlimited shots",
      "4R group prints",
      "Fun Props",
      "Instant digital copies via QR",
      "Overhead high-angle photos",
      "2-3 booth attendants",
      "Free Transportation within Quezon City ",
    ],
    images: [
      {
        src: "https://picsum.photos/seed/openair1/600/400",
        alt: "Open air photobooth setup",
      },
      {
        src: "https://picsum.photos/seed/openair2/600/400",
        alt: "Large group photo",
      },
      {
        src: "https://picsum.photos/seed/openair3/600/400",
        alt: "Custom backdrop display",
      },
    ],
    price: "₱10,000",
    duration: "2 hours",
    extraHour: "+₱2,000",
  },
  {
    slug: "Magazine Booth",
    icon: Palette,
    label: "Branding",
    title: "Mirror Booth",
    description:
      "An interactive mirror booth that lets guests choose from different photo layouts, including 4R, Strips and Polaroid prints. Add keychain prints for an additional charge. Your photos come as magnetic prints, perfect for displaying on your fridge or any magnetic surface.",
    details: [
      "Unlimited shots",
      "1 Premium Backdrop ",
      "1-2 Booth Attendant ",
      "Fun Props ",
      "Customized Photo Layout",
      "Digital copies via QR",
      "Red carpet with Stanchions",
      "Free Transportation within Quezon City ",
    ],
    images: [
      {
        src: "https://picsum.photos/seed/branded1/600/400",
        alt: "Branded backdrop setup",
      },
      {
        src: "https://picsum.photos/seed/branded2/600/400",
        alt: "Custom branded photo strip",
      },
      {
        src: "https://picsum.photos/seed/branded3/600/400",
        alt: "On-brand event photobooth",
      },
    ],
    price: "₱10,000",
    duration: "2 hours",
    extraHour: "+₱1,500",
  },
  {
    slug: "Magazine Booth",
    icon: Book,
    label: "Our Services",
    title: "Magazine Booth",
    description:
      "A 7 × 7 ft photo booth that turns your photos into personalized magazine covers. ",
    details: [
      "2-3 booth attendants",
      "Instant QR code sharing with photographer add-on",
      "Fun Props",
      "Free transportation within QC ",
    ],
    images: [
      {
        src: "https://picsum.photos/seed/classic1/600/400",
        alt: "Classic enclosed photobooth",
      },
      {
        src: "https://picsum.photos/seed/classic2/600/400",
        alt: "Guests inside classic booth",
      },
      {
        src: "https://picsum.photos/seed/classic3/600/400",
        alt: "Classic booth photo prints",
      },
    ],
    price: "₱10,000",
    duration: "3 hours",
    extraHour: "+₱2,000",
  },
  {
    slug: "Photoman",
    icon: Camera,
    label: "Our Services",
    title: "Photoman",
    description:
      "A professional roaming photo booth experience that brings the camera directly to your guests. Our Photoman captures candid, engaging moments throughout your event, with each session producing 4 × 6-inch photo prints presented in a cardboard standee frame—a fun and memorable keepsake your guests can take home and display.",
    details: [
      "Unlimited Shots",
      "2-3 booth attendants",
      "Instant QR code sharing with photographer add-on",
      "Fun Props",
      "Free transportation within QC ",
    ],
    images: [
      {
        src: "https://picsum.photos/seed/classic1/600/400",
        alt: "Classic enclosed photobooth",
      },
      {
        src: "https://picsum.photos/seed/classic2/600/400",
        alt: "Guests inside classic booth",
      },
      {
        src: "https://picsum.photos/seed/classic3/600/400",
        alt: "Classic booth photo prints",
      },
    ],
    price: "₱5,000",
    duration: "2 hours",
    extraHour: "+₱2,500",
  },
];
