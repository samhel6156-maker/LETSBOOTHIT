export interface PackageVariantOption {
  label: string;
  priceDelta: number;
  available: boolean;
}

export interface PackageVariantGroup {
  name: string;
  selectionType: "single";
  options: PackageVariantOption[];
}

export interface Package {
  slug: string;
  title: string;
  basePrice: number;
  description: string;
  badge?: string;
  image: string;
  variants: PackageVariantGroup[];
}

export const packages: Package[] = [
  {
    slug: "classic-booth",
    title: "Classic Booth",
    basePrice: 5000,
    badge: "Popular",
    description:
      "Our signature enclosed booth experience with a sleek setup and premium lighting. Perfect for intimate gatherings, formal events, and anywhere you want a classic photobooth vibe.",
    image: "https://images.unsplash.com/photo-1640351695258-37fa66bc8bc9?w=800&h=500&fit=crop&auto=format",
    variants: [
      {
        name: "Backdrop Style",
        selectionType: "single",
        options: [
          { label: "Solid Color", priceDelta: 0, available: true },
          { label: "Sequin Glam", priceDelta: 500, available: true },
          { label: "Floral Wall", priceDelta: 800, available: false },
        ],
      },
      {
        name: "Session Duration",
        selectionType: "single",
        options: [
          { label: "2 Hours", priceDelta: 0, available: true },
          { label: "3 Hours", priceDelta: 1500, available: true },
          { label: "4 Hours", priceDelta: 3000, available: true },
        ],
      },
    ],
  },
  {
    slug: "open-air",
    title: "Open Air",
    basePrice: 6500,
    description:
      "A modern open-air setup that fits any space and allows larger groups to pose together freely. No enclosed walls — just great shots and good energy.",
    image: "https://images.unsplash.com/photo-1768776184289-76f09269c91f?w=800&h=500&fit=crop&auto=format",
    variants: [
      {
        name: "Backdrop Style",
        selectionType: "single",
        options: [
          { label: "Solid Color", priceDelta: 0, available: true },
          { label: "Sequin Glam", priceDelta: 500, available: true },
          { label: "Neon Lights", priceDelta: 1200, available: true },
        ],
      },
      {
        name: "Session Duration",
        selectionType: "single",
        options: [
          { label: "2 Hours", priceDelta: 0, available: true },
          { label: "3 Hours", priceDelta: 1500, available: true },
          { label: "4 Hours", priceDelta: 3000, available: true },
        ],
      },
    ],
  },
  {
    slug: "roaming-booth",
    title: "Roaming Booth",
    basePrice: 8000,
    badge: "New",
    description:
      "Our attendant roams your event with a handheld camera system, capturing spontaneous moments everywhere — at tables, the dance floor, or anywhere the party is.",
    image: "https://images.unsplash.com/photo-1766086893043-d38b06175015?w=800&h=500&fit=crop&auto=format",
    variants: [
      {
        name: "Coverage Area",
        selectionType: "single",
        options: [
          { label: "Single Venue", priceDelta: 0, available: true },
          { label: "Indoor + Outdoor", priceDelta: 1000, available: true },
        ],
      },
      {
        name: "Session Duration",
        selectionType: "single",
        options: [
          { label: "2 Hours", priceDelta: 0, available: true },
          { label: "3 Hours", priceDelta: 1500, available: true },
          { label: "4 Hours", priceDelta: 3000, available: false },
        ],
      },
    ],
  },
  {
    slug: "glam-booth",
    title: "Glam Booth",
    basePrice: 9500,
    badge: "Premium",
    description:
      "The full glamour treatment — beauty ring lighting, high-res prints, and a luxury prop collection. Designed for red-carpet moments at weddings, debuts, and upscale events.",
    image: "https://images.unsplash.com/photo-1706941525117-017677c2cf85?w=800&h=500&fit=crop&auto=format",
    variants: [
      {
        name: "Print Style",
        selectionType: "single",
        options: [
          { label: "Standard Print", priceDelta: 0, available: true },
          { label: "Foil Print", priceDelta: 800, available: true },
          { label: "Metallic Print", priceDelta: 1200, available: true },
        ],
      },
      {
        name: "Session Duration",
        selectionType: "single",
        options: [
          { label: "3 Hours", priceDelta: 0, available: true },
          { label: "4 Hours", priceDelta: 1500, available: true },
          { label: "5 Hours", priceDelta: 3000, available: true },
        ],
      },
    ],
  },
  {
    slug: "mirror-booth",
    title: "Mirror Booth",
    basePrice: 11000,
    description:
      "A stunning full-length interactive mirror with touch screen, animated effects, and voice guidance. Guests touch, sign, and smile — the mirror does the rest.",
    image: "https://images.unsplash.com/photo-1785336872679-68dc5a374172?w=800&h=500&fit=crop&auto=format",
    variants: [
      {
        name: "Frame Theme",
        selectionType: "single",
        options: [
          { label: "Gold Frame", priceDelta: 0, available: true },
          { label: "Rose Gold Frame", priceDelta: 500, available: true },
          { label: "Custom Vinyl Wrap", priceDelta: 2000, available: false },
        ],
      },
      {
        name: "Session Duration",
        selectionType: "single",
        options: [
          { label: "3 Hours", priceDelta: 0, available: true },
          { label: "4 Hours", priceDelta: 1500, available: true },
          { label: "5 Hours", priceDelta: 3000, available: true },
        ],
      },
    ],
  },
  {
    slug: "360-booth",
    title: "360° Booth",
    basePrice: 13500,
    badge: "🔥 Trending",
    description:
      "The ultimate showstopper. Guests step onto our platform and a spinning arm captures dramatic slow-motion video from every angle — perfect for Reels and TikTok moments.",
    image: "https://images.unsplash.com/photo-1738156684532-b79bfb589344?w=800&h=500&fit=crop&auto=format",
    variants: [
      {
        name: "Platform Size",
        selectionType: "single",
        options: [
          { label: "Standard (up to 4 pax)", priceDelta: 0, available: true },
          { label: "Large (up to 6 pax)", priceDelta: 2000, available: true },
        ],
      },
      {
        name: "Session Duration",
        selectionType: "single",
        options: [
          { label: "2 Hours", priceDelta: 0, available: true },
          { label: "3 Hours", priceDelta: 2000, available: true },
          { label: "4 Hours", priceDelta: 4000, available: true },
        ],
      },
    ],
  },
];
