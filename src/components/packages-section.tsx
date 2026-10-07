import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Camera,
  Sparkles,
  Users,
  Palette,
  Video,
  Star,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const packages = [
  {
    id: "package_1",
    label: "CLASSIC",
    icon: Camera,
    title: "4R Standee",
    description:
      "Classic 4R standee prints. Perfect for weddings, birthdays, and intimate gatherings.",
    price: "₱2,500",
    duration: "2 hours",
    additionalHour: "₱1,200",
    includes: [
      "Unlimited shots",
      "4R standee prints",
      "1 backdrop option",
      "Digital copies via QR",
      "1 booth attendant",
    ],
  },
  {
    id: "package_2",
    label: "MAGNETIC",
    icon: Zap,
    title: "4R Magnetic",
    description:
      "Sleek magnetic prints that guests can collect as premium keepsakes from your event.",
    price: "₱3,500",
    duration: "2 hours",
    additionalHour: "₱1,700",
    includes: [
      "Unlimited shots",
      "4R magnetic prints",
      "2 backdrop options",
      "Digital copies via QR",
      "1 booth attendant",
    ],
  },
  {
    id: "package_3",
    label: "STRIP",
    icon: Star,
    title: "4R Strip / Dedication",
    description:
      "Strip prints with optional dedication text — a heartfelt keepsake for every guest.",
    price: "₱2,700",
    duration: "2 hours",
    additionalHour: "₱1,200",
    includes: [
      "Unlimited shots",
      "4R strip prints",
      "Custom dedication text",
      "1 backdrop option",
      "Digital copies via QR",
    ],
  },
  {
    id: "package_4",
    label: "POLAROID",
    icon: Sparkles,
    title: "Polaroid Standee",
    description:
      "Iconic polaroid-style prints that bring a vintage, nostalgic feel to your celebration.",
    price: "₱4,500",
    duration: "2 hours",
    additionalHour: "₱2,500",
    includes: [
      "Unlimited shots",
      "Polaroid standee prints",
      "2 backdrop options",
      "+₱1,000 for magnetic option",
      "Digital copies via QR",
    ],
  },
  {
    id: "package_5",
    label: "KEYCHAIN",
    icon: Star,
    title: "Keychain",
    description:
      "Mini keychain prints — fun, portable, and the most unique souvenir your guests will love.",
    price: "₱5,000",
    duration: "2 hours",
    additionalHour: "₱2,500",
    includes: [
      "Unlimited shots",
      "Keychain photo prints",
      "2 backdrop options",
      "Digital copies via QR",
      "1 booth attendant",
    ],
  },
  {
    id: "package_6",
    label: "MIRROR",
    icon: Sparkles,
    title: "Mirror Booth",
    description:
      "Full-length interactive mirror with touch screen animations and on-screen graphics.",
    price: "₱10,000",
    duration: "3 hours",
    additionalHour: "₱1,500",
    includes: [
      "Unlimited shots",
      "Touch screen mirror",
      "3 backdrop options",
      "On-screen animations",
      "Digital sharing station",
    ],
    featured: true,
  },
  {
    id: "package_7",
    label: "360°",
    icon: Video,
    title: "360° Video Booth",
    description:
      "Spinning arm captures stunning slow-motion 360° videos your guests can share instantly.",
    price: "₱10,000",
    duration: "3 hours",
    additionalHour: "₱2,000",
    includes: [
      "Unlimited shots",
      "360° slow-mo videos",
      "Instant sharing via QR",
      "3 backdrop options",
      "2 booth attendants",
    ],
    featured: true,
  },
  {
    id: "package_8",
    label: "HIGH ANGLE",
    icon: Camera,
    title: "High Angle",
    description:
      "Overhead camera setup delivering breathtaking flat-lay and bird's-eye perspective shots.",
    price: "₱10,000",
    duration: "3 hours",
    additionalHour: "₱2,000",
    includes: [
      "Unlimited shots",
      "Overhead camera rig",
      "3 backdrop options",
      "Digital copies via QR",
      "2 booth attendants",
    ],
    featured: true,
  },
  {
    id: "package_9",
    label: "MAGAZINE",
    icon: Palette,
    title: "Magazine Booth",
    description:
      "Magazine cover-style prints that make every guest feel like a celebrity on the cover.",
    price: "₱10,000",
    duration: "3 hours",
    additionalHour: "₱2,000",
    includes: [
      "Unlimited shots",
      "Magazine cover prints",
      "Custom masthead design",
      "3 backdrop options",
      "Digital copies via QR",
    ],
    featured: true,
  },
  {
    id: "package_10",
    label: "PHOTOMAN",
    icon: Users,
    title: "Photoman",
    description:
      "Roving photobooth attendant that brings the camera to your guests anywhere in the venue.",
    price: "₱5,000",
    duration: "2 hours",
    additionalHour: "₱2,500",
    includes: [
      "Unlimited shots",
      "Roving booth setup",
      "+₱2,000 for magnetic",
      "Digital copies via QR",
      "1 roving attendant",
    ],
  },
];

interface PackageCardProps {
  pkg: (typeof packages)[0];
  onBook: () => void;
}

function PackageCard({ pkg, onBook }: PackageCardProps) {
  const IconComponent = pkg.icon;

  return (
    <div
      className={cn(
        "relative flex h-full flex-col rounded-2xl border p-6 transition-all duration-300",
        pkg.featured
          ? "border-amber-500/60 bg-gradient-to-b from-amber-950/40 to-[#1b1b18]"
          : "border-white/10 bg-[#222220]",
      )}
    >
      {pkg.featured && (
        <div className="absolute -top-3 left-6">
          <span className="rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-black">
            Popular
          </span>
        </div>
      )}

      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div>
          <p className="mb-1 text-xs tracking-[0.2em] text-amber-500 uppercase">
            {pkg.label}
          </p>
          <h3 className="text-2xl font-bold text-white">{pkg.title}</h3>
        </div>
        <div
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
            pkg.featured ? "bg-amber-500/20" : "bg-white/5",
          )}
        >
          <IconComponent
            className={cn(
              "h-6 w-6",
              pkg.featured ? "text-amber-400" : "text-gray-400",
            )}
          />
        </div>
      </div>

      {/* Description */}
      <p className="mb-6 text-sm leading-relaxed text-gray-400">
        {pkg.description}
      </p>

      {/* Price */}
      <div className="mb-6">
        <p className="text-xs text-gray-500 uppercase tracking-wider">
          Starting at
        </p>
        <p
          className={cn(
            "text-4xl font-bold",
            pkg.featured ? "text-amber-400" : "text-white",
          )}
        >
          {pkg.price}
        </p>
      </div>

      {/* Meta */}
      <div className="mb-6 grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-white/5 p-3">
          <p className="text-xs text-gray-500 uppercase tracking-wider">
            Duration
          </p>
          <p className="mt-1 text-sm font-medium text-white">{pkg.duration}</p>
        </div>
        <div className="rounded-lg bg-white/5 p-3">
          <p className="text-xs text-gray-500 uppercase tracking-wider">
            Extra Hour
          </p>
          <p className="mt-1 text-sm font-medium text-white">
            +{pkg.additionalHour}
          </p>
        </div>
      </div>

      {/* Includes */}
      <div className="mb-6 flex-1">
        <p className="mb-3 text-xs tracking-[0.15em] text-gray-500 uppercase">
          Includes
        </p>
        <ul className="space-y-2">
          {pkg.includes.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-gray-300"
            >
              <Check
                className={cn(
                  "mt-0.5 h-4 w-4 shrink-0",
                  pkg.featured ? "text-amber-500" : "text-gray-500",
                )}
              />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

interface PackagesSectionProps {
  onBookOpen?: () => void;
}

export function PackagesSection({ onBookOpen }: PackagesSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);

  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 640) setCardsPerView(1);
      else if (window.innerWidth < 1024) setCardsPerView(2);
      else setCardsPerView(3);
    };
    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  const maxIndex = packages.length - cardsPerView;

  const prev = () => setCurrentIndex((i) => Math.max(0, i - 1));
  const next = () => setCurrentIndex((i) => Math.min(maxIndex, i + 1));

  const cardWidth =
    cardsPerView === 1
      ? "w-full"
      : cardsPerView === 2
        ? "w-[calc(50%-10px)]"
        : "w-[calc(33.333%-14px)]";

  const gap = 20;

  return (
    <div id="packages" className="w-full bg-[#1b1b18] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <p className="mb-2 text-xs tracking-[0.25em] text-amber-500 uppercase">
            Pricing
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                Available <span className="text-amber-500">Packages</span>
              </h2>
              <p className="mt-2 text-sm text-gray-400">
                {packages.length} packages found
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={prev}
                disabled={currentIndex === 0}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-all hover:border-amber-500 hover:text-amber-500 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={next}
                disabled={currentIndex >= maxIndex}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-all hover:border-amber-500 hover:text-amber-500 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Progress dots */}
          <div className="mt-4 flex gap-1.5">
            {packages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(Math.min(i, maxIndex))}
                className={cn(
                  "h-1 rounded-full transition-all duration-300",
                  i >= currentIndex && i < currentIndex + cardsPerView
                    ? "w-6 bg-amber-500"
                    : "w-1.5 bg-white/20",
                )}
              />
            ))}
          </div>
        </div>

        {/* Cards carousel */}
        <div
          className="overflow-hidden px-1 pt-4"
          onTouchStart={(e) => {
            (e.currentTarget as any)._startX = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            const diff =
              e.changedTouches[0].clientX - (e.currentTarget as any)._startX;
            if (Math.abs(diff) > 50) {
              if (diff < 0) next();
              else prev();
            }
          }}
          onPointerDown={(e) => {
            const el = e.currentTarget;
            el.setPointerCapture(e.pointerId);
            (el as any)._startX = e.clientX;
            (el as any)._dragging = true;
            (el as any)._dragOffset = 0;
          }}
          onPointerMove={(e) => {
            const el = e.currentTarget;
            if (!(el as any)._dragging) return;
            const diff = e.clientX - (el as any)._startX;
            (el as any)._dragOffset = diff;
          }}
          onPointerUp={(e) => {
            const el = e.currentTarget;
            if (!(el as any)._dragging) return;
            (el as any)._dragging = false;
            const diff = (el as any)._dragOffset;
            if (Math.abs(diff) > 50) {
              if (diff < 0) next();
              else prev();
            }
          }}
        >
          <div
            data-carousel-inner
            className="flex gap-5 transition-transform duration-500 ease-in-out select-none"
            style={{
              transform: `translateX(calc(${currentIndex} * (-100% / ${cardsPerView}) - ${currentIndex * 20}px))`,
            }}
          >
            {packages.map((pkg) => (
              <div key={pkg.id} className={cn("shrink-0", cardWidth)}>
                <PackageCard pkg={pkg} onBook={() => onBookOpen?.()} />
              </div>
            ))}
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-gray-600 sm:hidden">
          Swipe or use arrows to browse all packages
        </p>
      </div>
    </div>
  );
}
