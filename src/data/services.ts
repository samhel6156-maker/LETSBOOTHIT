import {
  Camera,
  Star,
  Video,
  Users,
  Sparkles,
  Newspaper,
  Footprints,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

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
  addOns?: {
    label: string;
    price: string;
    description: string;
  }[];
  promoLabel?: string;
};

export const services: ServiceItem[] = [
  {
    slug: "classic-booth",
    icon: Camera,
    label: "Timeless Classic",
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
        src: "/Photobooth photos/Lets Booth it Photos/Photobooth setups/Classic Setup.png",
        alt: "Classic Booth setup",
      },
      {
        src: "/Photobooth photos/.../Classic Setup 2.png",
        alt: "Classic Booth setup - angle 2",
      },
      {
        src: "/Photobooth photos/.../Classic Setup 3.png",
        alt: "Classic Booth setup - angle 3",
      },
    ],
    price: "₱2,500",
    duration: "2 hours",
    extraHour: "+₱1,000",
  },
  {
    slug: "premium-booth",
    icon: Star,
    label: "Premium Pick",
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
        src: "/Photobooth photos/Lets Booth it Photos/Photobooth setups/Premium Setup.png",
        alt: "Premium Booth setup",
      },
      {
        src: "/Photobooth photos/Lets Booth it Photos/Photobooth setups/Premium Setup 2.png",
        alt: "Premium Booth setup - angle 2",
      },
      {
        src: "/Photobooth photos/Lets Booth it Photos/Photobooth setups/Premium Setup 3.png",
        alt: "Premium Booth setup - angle 3",
      },
    ],
    price: "₱3,500",
    duration: "2 hours",
    extraHour: "+₱1,000",
  },
  {
    slug: "video-booth",
    icon: Video,
    label: "360 Experience",
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
    promoLabel: "+1 hr if you book today",
    images: [
      {
        src: "/Photobooth photos/Lets Booth it Photos/Photobooth setups/360 Video Booth.png",
        alt: "360° Video Booth setup",
      },
      {
        src: "/Photobooth photos/Lets Booth it Photos/Photobooth setups/....png",
        alt: "360° Video Booth setup",
      },
      {
        src: "/Photobooth photos/Lets Booth it Photos/Photobooth setups/....png",
        alt: "360° Video Booth setup",
      },
    ],
    price: "₱10,000",
    duration: "2 hours",
    extraHour: "+₱2,000",
  },
  {
    slug: "high-angle",
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
        src: "/Photobooth photos/Lets Booth it Photos/Photobooth setups/High Angle.png",
        alt: "High Angle setup",
      },
      {
        src: "/Photobooth photos/.../High Angle 2.png",
        alt: "High Angle setup - angle 2",
      },
      {
        src: "/Photobooth photos/.../High Angle 3.png",
        alt: "High Angle setup - angle 3",
      },
    ],
    price: "₱10,000",
    duration: "2 hours",
    extraHour: "+₱2,000",
  },
  {
    slug: "mirror-booth",
    icon: Sparkles,
    label: "Mirror Magic",
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
    promoLabel: "+1 hr if you book today",
    images: [
      {
        src: "/Photobooth photos/Lets Booth it Photos/Photobooth setups/Mirror Booth.png",
        alt: "Mirror Booth setup",
      },
      {
        src: "/Photobooth photos/.../Mirror Booth 2.png",
        alt: "Mirror Booth setup - angle 2",
      },
      {
        src: "/Photobooth photos/.../Mirror Booth 3.png",
        alt: "Mirror Booth setup - angle 3",
      },
    ],
    price: "₱10,000",
    duration: "2 hours",
    extraHour: "+₱1,500",
  },
  {
    slug: "magazine-booth",
    icon: Newspaper,
    label: "Cover Story",
    title: "Magazine Booth",
    description:
      "A 7 × 7 ft photo booth that turns your photos into personalized magazine covers. ",
    details: [
      "2-3 booth attendants",
      "Instant QR code sharing with photographer add-on",
      "Fun Props",
      "Free transportation within QC ",
    ],
    promoLabel: "+1 hr if you book today",
    addOns: [
      {
        label: "Photographer",
        price: "+₱3,000",
        description:
          "Includes professional photo coverage and 4 × 6-inch photo prints with a cardboard standee frame.",
      },
      {
        label: "Magnetic Prints",
        price: "+₱2,000",
        description: "Upgrade your prints to magnetic photo keepsakes.",
      },
    ],
    images: [
      {
        src: "/Photobooth photos/Lets Booth it Photos/Photobooth setups/Magazine Booth.png",
        alt: "Magazine Booth setup",
      },
      {
        src: "/Photobooth photos/.../Magazine Booth 2.png",
        alt: "Magazine Booth setup - angle 2",
      },
      {
        src: "/Photobooth photos/.../Magazine Booth 3.png",
        alt: "Magazine Booth setup - angle 3",
      },
    ],
    price: "₱10,000",
    duration: "3 hours",
    extraHour: "+₱2,000",
  },
  {
    slug: "photoman",
    icon: Footprints,
    label: "On The Move",
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
    addOns: [
      {
        label: "Magnetic Upgrade (1mm)",
        price: "+₱1,000",
        description: "Want your photo to be magnetic? Upgrade for just ₱1,000.",
      },
    ],
    images: [
      {
        src: "/Photobooth photos/Lets Booth it Photos/Packages/Photoman.png",
        alt: "Photoman roaming booth",
      },
      {
        src: "/Photobooth photos/.../Photoman 2.png",
        alt: "Photoman roaming booth - angle 2",
      },
      {
        src: "/Photobooth photos/.../Photoman 3.png",
        alt: "Photoman roaming booth - angle 3",
      },
    ],
    price: "₱5,000",
    duration: "2 hours",
    extraHour: "+₱2,500",
  },
];
