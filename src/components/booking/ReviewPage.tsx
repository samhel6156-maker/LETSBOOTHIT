// src/components/booking/ReviewPage.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  MapPin,
  Mail,
  Phone,
  Sparkles,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useBooking } from "./BookingContext";
import { StepProgress } from "./StepProgress";
import { PACKAGES } from "./BookingPage";
import { TermsDialog } from "./TermsDialog";

console.log("🔍 API URL is:", import.meta.env.VITE_API_URL);

const BACKDROP_LABELS: Record<string, string> = {
  solid: "Solid Color",
  sequin: "Sequin Glam",
  floral: "Floral Wall",
};

const DURATION_LABELS: Record<string, string> = {
  "2h": "2 Hours",
  "3h": "3 Hours",
  "4h": "4 Hours",
};

function BACKDROP_PRICE(value: string) {
  return { solid: 0, sequin: 500, floral: 800 }[value] ?? 0;
}
function DURATION_PRICE(value: string) {
  return { "2h": 0, "3h": 1500, "4h": 3000 }[value] ?? 0;
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 shrink-0 rounded-lg bg-white/6 p-1.5 text-gray-400">
        {icon}
      </div>
      <div>
        <p className="text-[11px] uppercase tracking-wide text-gray-500">
          {label}
        </p>
        <p className="mt-0.5 text-sm font-medium text-white">{value}</p>
      </div>
    </div>
  );
}

function maskPhone(phone: string) {
  if (phone.length <= 2) return phone;
  return phone.slice(0, 2) + "*".repeat(Math.max(phone.length - 2, 0));
}

export default function ReviewPage() {
  const navigate = useNavigate();
  const { state, total, setConfirmationRef, setAgreedToTerms } = useBooking();
  const pkg = PACKAGES.find((p) => p.value === state.packageId);
  const [submitting, setSubmitting] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  useEffect(() => {
    if (!pkg) navigate("/booking");
  }, [pkg, navigate]);

  if (!pkg) return null;

  const boothLabel =
    state.boothType === "premium" ? "Premium Booth" : "Classic Booth";

  const handleSubmit = async () => {
    if (!state.agreedToTerms) {
      toast.error("Please agree to the Terms and Conditions to continue.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          package: pkg.value,
          booth_type: state.boothType,
          backdrop: state.backdrop,
          duration: state.duration,
          event_date: state.eventDate,
          start_time: state.startTime,
          event_type: state.eventType,
          venue: state.venue,
          guest_count: state.guestCount,
          special_requests: state.specialRequests,
          full_name: state.fullName,
          email: state.email,
          phone: state.phone,
          total,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setConfirmationRef(
          data.reference ?? `LBI-${Date.now().toString().slice(-6)}`,
        );
        navigate("/booking/confirmation");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch {
      toast.error(
        "Cannot connect to server. Please check if backend is running.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1b1b18] pb-24 lg:pb-16">
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

      <div className="mx-auto max-w-[1152px] px-6 py-8">
        <div className="flex items-center justify-between rounded-2xl border border-white/8 bg-[#201f1c] px-4 py-3">
          <div className="flex items-center gap-3">
            <img
              src={pkg.image}
              alt={pkg.name}
              className="size-10 rounded-xl object-cover"
            />
            <div>
              <p className="text-[11px] uppercase tracking-wide text-gray-500">
                Selected Package
              </p>
              <p className="font-serif text-sm italic font-semibold text-white">
                {pkg.name}
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate(`/booking/package/${pkg.value}`)}
            className="rounded-lg px-3 py-1.5 text-xs font-semibold text-amber-500 hover:bg-white/5"
          >
            Change
          </button>
        </div>

        <div className="mt-6 max-w-[744px] mx-auto">
          <StepProgress currentStep={4} />

          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.15em] text-amber-500">
            Step 5 of 5
          </p>
          <h1 className="mt-1 font-serif text-3xl italic text-white">
            Review your booking.
          </h1>
          <p className="mt-2 max-w-lg text-sm text-gray-500">
            Everything look right? Submit your request and we&apos;ll confirm
            within 24 hours.
          </p>

          {/* Package summary */}
          <div className="mt-6 overflow-hidden rounded-2xl border border-white/8 bg-[#201f1c]">
            <div className="border-b border-white/8 p-5">
              <p className="mb-3 text-[11px] uppercase tracking-wide text-gray-500">
                Package
              </p>
              <div className="flex items-center justify-between">
                <span className="font-serif text-base italic font-bold text-white">
                  {boothLabel}
                </span>
                <span className="text-base font-semibold text-white">
                  ₱{pkg.price.toLocaleString()}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm text-gray-400">
                  {BACKDROP_LABELS[state.backdrop] ?? state.backdrop} Backdrop
                  Style
                </span>
                <span className="text-sm text-gray-300">
                  {state.backdrop === "solid"
                    ? "Included"
                    : `+₱${BACKDROP_PRICE(state.backdrop).toLocaleString()}`}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm text-gray-400">
                  {DURATION_LABELS[state.duration] ?? state.duration} Session
                  Duration
                </span>
                <span className="text-sm text-gray-300">
                  {state.duration === "2h"
                    ? "Included"
                    : `+₱${DURATION_PRICE(state.duration).toLocaleString()}`}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between bg-amber-500/5 p-5">
              <span className="text-lg font-bold text-white">Total</span>
              <span className="text-2xl font-bold text-amber-400">
                ₱{total.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Event details */}
          <div className="mt-6 rounded-2xl border border-white/8 bg-[#201f1c] p-5">
            <p className="mb-4 text-[11px] uppercase tracking-wide text-gray-500">
              Event Details
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InfoRow
                icon={<Calendar className="size-3.5" />}
                label="Date"
                value={state.eventDate}
              />
              <InfoRow
                icon={<Clock className="size-3.5" />}
                label="Start Time"
                value={state.startTime}
              />
              <InfoRow
                icon={<Users className="size-3.5" />}
                label="Event Type"
                value={state.eventType}
              />
              <InfoRow
                icon={<MapPin className="size-3.5" />}
                label="Venue"
                value={state.venue}
              />
              {state.guestCount && (
                <InfoRow
                  icon={<Users className="size-3.5" />}
                  label="Estimated Guests"
                  value={`${state.guestCount} guests`}
                />
              )}
            </div>
            {state.specialRequests && (
              <div className="mt-4 border-t border-white/8 pt-4">
                <p className="mb-2 text-[11px] uppercase tracking-wide text-gray-500">
                  Special Requests
                </p>
                <p className="text-sm leading-relaxed text-gray-300">
                  {state.specialRequests}
                </p>
              </div>
            )}
          </div>

          {/* Contact details */}
          <div className="mt-6 rounded-2xl border border-white/8 bg-[#201f1c] p-5">
            <p className="mb-4 text-[11px] uppercase tracking-wide text-gray-500">
              Contact Details
            </p>
            <div className="flex flex-col gap-4">
              <InfoRow
                icon={<User className="size-3.5" />}
                label="Name"
                value={state.fullName}
              />
              <InfoRow
                icon={<Mail className="size-3.5" />}
                label="Email"
                value={state.email}
              />
              <InfoRow
                icon={<Phone className="size-3.5" />}
                label="Phone"
                value={maskPhone(state.phone)}
              />
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-white/8 bg-[#201f1c] p-4">
            <button
              type="button"
              onClick={() => !state.agreedToTerms && setTermsOpen(true)}
              className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded border ${
                state.agreedToTerms
                  ? "border-amber-500 bg-amber-500"
                  : "border-white/20"
              }`}
              aria-label="Agree to Terms and Conditions"
            >
              {state.agreedToTerms && (
                <svg
                  viewBox="0 0 16 16"
                  className="size-3.5 fill-none stroke-black stroke-[2.5]"
                >
                  <path
                    d="M3 8.5l3 3 7-7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
            <p className="text-sm text-gray-300">
              I have read and agree to the{" "}
              <button
                type="button"
                onClick={() => setTermsOpen(true)}
                className="font-semibold text-amber-500 underline underline-offset-2 hover:text-amber-400"
              >
                Terms and Conditions
              </button>
              .
            </p>
          </div>

          <TermsDialog
            open={termsOpen}
            onOpenChange={setTermsOpen}
            onAgree={() => setAgreedToTerms(true)}
          />

          <div className="mt-8 flex gap-3">
            <Button
              variant="outline"
              onClick={() => navigate("/booking/details")}
              className="flex-1"
            >
              Back
            </Button>
            <button
              onClick={handleSubmit}
              disabled={submitting || !state.agreedToTerms}
              className="flex flex-[2] items-center justify-center gap-2 rounded-full bg-amber-500 py-4 text-base font-bold text-black transition-all hover:bg-amber-400 hover:shadow-[0_0_28px_rgba(245,158,11,0.35)] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
            >
              {submitting ? (
                <>
                  <span className="size-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                  Submitting…
                </>
              ) : (
                <>
                  <Sparkles className="size-4" />
                  Request Booking
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
