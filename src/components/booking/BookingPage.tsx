// src/pages/booking/BookingPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const PACKAGES = [
  {
    value: "package_1",
    name: "4R Standee",
    price: 2500,
    image: "/images/booth-classic.jpg",
    badge: null as "New" | "Popular" | null,
  },
  {
    value: "package_2",
    name: "4R Magnetic",
    price: 3500,
    image: "/images/booth-open-air.jpg",
    badge: null,
  },
  {
    value: "package_3",
    name: "4R Strip/Dedication",
    price: 2700,
    image: "/images/booth-roaming.jpg",
    badge: null,
  },
  {
    value: "package_4",
    name: "Polaroid Standee",
    price: 4500,
    image: "/images/booth-glam.jpg",
    badge: null,
  },
  {
    value: "package_5",
    name: "Keychain",
    price: 5000,
    image: "/images/booth-mirror.jpg",
    badge: null,
  },
  {
    value: "package_6",
    name: "Mirror Booth",
    price: 10000,
    image: "/images/booth-360.jpg",
    badge: "Popular",
  },
  {
    value: "package_7",
    name: "360° Video Booth",
    price: 10000,
    image: "/images/booth-classic.jpg",
    badge: "Popular",
  },
  {
    value: "package_8",
    name: "High Angle",
    price: 10000,
    image: "/images/booth-open-air.jpg",
    badge: "Popular",
  },
  {
    value: "package_9",
    name: "Magazine Booth",
    price: 10000,
    image: "/images/booth-roaming.jpg",
    badge: "Popular",
  },
  {
    value: "package_10",
    name: "Photoman",
    price: 5000,
    image: "/images/booth-glam.jpg",
    badge: null,
  },
] as const;

function BookingHeader() {
  const navigate = useNavigate();
  return (
    <div className="backdrop-blur-[8px] bg-[#1b1b18]/95 border-b border-white/8 sticky top-0 z-20">
      <div className="mx-auto flex h-14 max-w-[1152px] items-center justify-between px-6">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </button>
        <p className="font-open-sans text-lg font-bold text-white">
          Let&apos;s <span className="text-amber-500">Booth</span> It
        </p>
        <div className="w-[112px]" />
      </div>
    </div>
  );
}

function PackageCard({
  pkg,
  onSelect,
}: {
  pkg: (typeof PACKAGES)[number];
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-[#201f1c] text-left transition-colors hover:border-amber-600/50"
    >
      <div className="relative h-[267px] w-full overflow-hidden">
        <img
          src={pkg.image}
          alt={pkg.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
        {pkg.badge && (
          <span
            className={cn(
              "absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-bold text-black",
              pkg.badge === "New" ? "bg-amber-500" : "bg-amber-500",
            )}
          >
            {pkg.badge}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2 p-4">
        <h3 className="font-serif text-lg italic font-semibold text-white">
          {pkg.name}
        </h3>
        <p className="text-sm font-semibold text-amber-500">
          Starting at ₱{pkg.price.toLocaleString()}
        </p>
        <div className="flex items-center gap-1 pt-1 text-xs text-gray-500">
          View details
          <ArrowRight className="h-3 w-3" />
        </div>
      </div>
    </button>
  );
}

export default function BookingPage() {
  const [step] = useState(1);
  const navigate = useNavigate();

  const selectPackage = (value: string) => {
    navigate(`/booking/package/${value}`);
  };

  return (
    <div className="min-h-screen bg-[#1b1b18]">
      <BookingHeader />
      <div className="mx-auto max-w-[1152px] px-6 py-8">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-amber-500">
          Step {step} of 5
        </p>
        <h1 className="mt-3 font-serif text-4xl italic text-white sm:text-5xl">
          Choose your package.
        </h1>
        <p className="mt-2 max-w-xl text-gray-400">
          Tap a package to view full details, customize your options, and see
          your running total before committing to anything.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PACKAGES.map((pkg) => (
            <PackageCard
              key={pkg.value}
              pkg={pkg}
              onSelect={() => selectPackage(pkg.value)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
