// src/components/booking/PackageDetailPage.tsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { PACKAGES } from "./BookingPage";
import { useBooking } from "./BookingContext";
import BoothSelectionPage from "./BoothSelectionPage";
import { BackdropCard } from "./BackdropCard";

type BackdropOption = {
  value: string;
  label: string;
  price: number;
  available: boolean;
  image: string;
};

const CLASSIC_BACKDROP_OPTIONS: BackdropOption[] = [
  {
    value: "blue",
    label: "Blue",
    price: 0,
    available: true,
    image:
      "/Photobooth photos/Lets Booth it Photos/classic backdrop/23241738-1976-4AE2-AF37-F2297ED5B3ED.png",
  },
  {
    value: "red",
    label: "Red",
    price: 0,
    available: true,
    image:
      "/Photobooth photos/Lets Booth it Photos/classic backdrop/34A6F23F-A0A1-4233-A4E5-814C9EF96E7D.png",
  },
  {
    value: "white-sparkle",
    label: "White Sparkle",
    price: 0,
    available: true,
    image:
      "/Photobooth photos/Lets Booth it Photos/classic backdrop/B594E08D-0244-4FA8-9A47-04B62C21E8FE.png",
  },
  {
    value: "pink-sequin",
    label: "Pink Sequin",
    price: 0,
    available: true,
    image:
      "/Photobooth photos/Lets Booth it Photos/classic backdrop/BCBE293C-0568-40ED-91B3-9E2A25683E0B.png",
  },
  {
    value: "silver-sequin",
    label: "Silver Sequin",
    price: 0,
    available: true,
    image:
      "/Photobooth photos/Lets Booth it Photos/classic backdrop/E50A2B39-5858-476A-BB76-590795C2F3C6.png",
  },
  {
    value: "black-sequin",
    label: "Black Sequin",
    price: 0,
    available: true,
    image:
      "/Photobooth photos/Lets Booth it Photos/classic backdrop/E91CDD61-D439-4748-9F5C-3E7178FDF2F8.png",
  },
];

const PREMIUM_BACKDROP_OPTIONS: BackdropOption[] = [
  {
    value: "floral-wall",
    label: "Floral Wall",
    price: 0,
    available: true,
    image:
      "/Photobooth photos/Lets Booth it Photos/Premium Setup/6DE03476-D422-4DAA-95AD-6CC7316585D8.png",
  },
  {
    value: "gold-geometric-black",
    label: "Gold Geometric (Black)",
    price: 0,
    available: true,
    image:
      "/Photobooth photos/Lets Booth it Photos/Premium Setup/9401EF6B-D3C3-41DF-A08E-61043E668E48.png",
  },
  {
    value: "marble-pink",
    label: "Marble Pink",
    price: 0,
    available: true,
    image:
      "/Photobooth photos/Lets Booth it Photos/Premium Setup/BA9E5609-ADAB-4121-9D7D-22DB0E637A8D.png",
  },
  {
    value: "white-grid",
    label: "White Grid",
    price: 0,
    available: true,
    image:
      "/Photobooth photos/Lets Booth it Photos/Premium Setup/BDA3F184-F999-480F-9853-6FE81236F168.png",
  },
  {
    value: "gold-geometric-white",
    label: "Gold Geometric (White)",
    price: 0,
    available: true,
    image:
      "/Photobooth photos/Lets Booth it Photos/Premium Setup/E08B3508-533F-475D-A016-422030F7370F.png",
  },
];

const NO_BOOTH_SELECTION = [
  "package_7",
  "package_8",
  "package_9",
  "package_10",
];

function DurationStepper({
  extraHours,
  onChange,
  pricePerHour = 1500,
  baseHours = 2,
  maxExtraHours = 4,
}: {
  extraHours: number;
  onChange: (value: number) => void;
  pricePerHour?: number;
  baseHours?: number;
  maxExtraHours?: number;
}) {
  const totalHours = baseHours + extraHours;
  const extraCost = extraHours * pricePerHour;

  return (
    <div className="mt-5 rounded-2xl border border-white/8 bg-[#201f1c] p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-white">Session Duration</h3>
        <span className="rounded-full bg-white/8 px-2.5 py-1 text-xs text-gray-500">
          {baseHours}h included
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between rounded-xl border border-white/10 bg-[#2a2926] px-4 py-3.5">
        <div>
          <p className="text-sm font-medium text-white">{totalHours} Hours</p>
          <p className="mt-0.5 text-xs text-gray-500">
            {extraHours === 0
              ? "Included"
              : `+${extraHours}h · +₱${extraCost.toLocaleString()}`}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onChange(Math.max(0, extraHours - 1))}
            disabled={extraHours === 0}
            className={cn(
              "flex size-9 items-center justify-center rounded-full border text-lg font-semibold transition-colors",
              extraHours === 0
                ? "border-white/10 text-gray-600 cursor-not-allowed"
                : "border-white/20 text-white hover:bg-white/10",
            )}
          >
            −
          </button>
          <span className="w-4 text-center text-sm font-semibold text-white">
            {extraHours}
          </span>
          <button
            type="button"
            onClick={() => onChange(Math.min(maxExtraHours, extraHours + 1))}
            disabled={extraHours === maxExtraHours}
            className={cn(
              "flex size-9 items-center justify-center rounded-full border text-lg font-semibold transition-colors",
              extraHours === maxExtraHours
                ? "border-white/10 text-gray-600 cursor-not-allowed"
                : "border-amber-500/40 bg-amber-500/15 text-amber-400 hover:bg-amber-500/25",
            )}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PackageDetailPage() {
  const { packageId } = useParams<{ packageId: string }>();
  const navigate = useNavigate();
  const { state, setPackage } = useBooking();
  const pkg = PACKAGES.find((p) => p.value === packageId);

  const BACKDROP_OPTIONS =
    state.boothType === "premium"
      ? PREMIUM_BACKDROP_OPTIONS
      : CLASSIC_BACKDROP_OPTIONS;

  const [backdrop, setBackdrop] = useState(BACKDROP_OPTIONS[0].value);
  const [extraHours, setExtraHours] = useState(0);

  useEffect(() => {
    setBackdrop(BACKDROP_OPTIONS[0].value);
  }, [state.boothType]);

  const total = useMemo(() => {
    if (!pkg) return 0;
    const backdropPrice =
      BACKDROP_OPTIONS.find((o) => o.value === backdrop)?.price ?? 0;
    const durationPrice = extraHours * 1500;
    return pkg.price + backdropPrice + durationPrice;
  }, [pkg, backdrop, extraHours, BACKDROP_OPTIONS]);

  if (!pkg) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#1b1b18] text-white">
        Package not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1b1b18] pb-32">
      {/* Header */}
      <div className="sticky top-0 z-20 border-b border-white/8 bg-[#1b1b18]/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-[1152px] items-center justify-between px-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back to Home</span>
          </button>
          <p className="font-serif text-lg italic font-bold text-white">
            Let&apos;s <span className="text-amber-500">Booth</span> It
          </p>
          <div className="w-[112px]" />
        </div>
      </div>

      <div className="mx-auto max-w-[1152px] px-0 py-8 sm:px-6">
        {/* Hero image + title/price/description as ONE card — full-bleed on mobile, rounded/contained from sm up */}
        <div className="overflow-hidden border border-white/10 sm:rounded-2xl">
          <div className="relative aspect-[16/9] w-full sm:aspect-[16/7]">
            <img
              src={pkg.image}
              alt={pkg.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <button
              onClick={() => navigate("/booking")}
              className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-2 text-sm font-medium text-white backdrop-blur-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
          </div>

          <div className="bg-[#201f1c] p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <h1 className="font-serif text-xl italic font-bold leading-tight text-white sm:text-2xl">
                {pkg.name}
              </h1>
              <div className="shrink-0 text-right">
                <p className="text-lg font-bold text-white sm:text-xl">
                  ₱{pkg.price.toLocaleString()}
                </p>
                <p className="mt-0.5 text-xs uppercase tracking-wide text-gray-500">
                  Base Price
                </p>
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-gray-400">
              Our signature enclosed booth experience with a sleek setup and
              premium lighting. Perfect for intimate gatherings, formal events,
              and anywhere you want a classic photobooth vibe.
            </p>
          </div>
        </div>

        {!NO_BOOTH_SELECTION.includes(pkg.value) && (
          <div className="px-4 sm:px-0">
            <BoothSelectionPage />
          </div>
        )}

        <div className="px-4 sm:px-0">
          {/* Backdrop Style */}
          <div className="mt-5 rounded-2xl border border-white/8 bg-[#201f1c] p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-white">
                Backdrop Style
              </h3>
              <span className="rounded-full bg-white/8 px-2.5 py-1 text-xs text-gray-500">
                Choose one
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {BACKDROP_OPTIONS.map((opt) => (
                <BackdropCard
                  key={opt.value}
                  image={opt.image}
                  label={opt.label}
                  priceLabel={
                    opt.price === 0
                      ? "Included"
                      : `+₱${opt.price.toLocaleString()}`
                  }
                  selected={backdrop === opt.value}
                  disabled={!opt.available}
                  onSelect={() => setBackdrop(opt.value)}
                />
              ))}
            </div>
          </div>

          {/* Session Duration */}
          <DurationStepper extraHours={extraHours} onChange={setExtraHours} />
        </div>
      </div>

      {/* Sticky footer */}
      <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-white/10 bg-[#1b1b18]/95 p-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-[768px] items-center gap-4">
          <div className="flex-1">
            <p className="text-xs uppercase tracking-wide text-gray-500">
              Running Total
            </p>
            <p className="text-lg font-bold text-amber-400">
              ₱{total.toLocaleString()}
            </p>
          </div>
          <button
            onClick={() => {
              setPackage(pkg.value, backdrop, `${2 + extraHours}h`);
              navigate("/booking/event");
            }}
            className="flex-1 rounded-full bg-amber-500 py-4 text-base font-bold text-black hover:bg-amber-400 transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
