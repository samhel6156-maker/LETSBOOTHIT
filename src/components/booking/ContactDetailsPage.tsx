// src/components/booking/ContactDetailsPage.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useBooking } from "./BookingContext";
import { StepProgress } from "./StepProgress";
import { OrderSummary } from "./OrderSummary";
import { PACKAGES } from "./BookingPage";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function FieldError({ show, message }: { show: boolean; message: string }) {
  if (!show) return null;
  return <p className="mt-1.5 text-xs text-red-400">{message}</p>;
}

export default function ContactDetailsPage() {
  const navigate = useNavigate();
  const { state, updateContactDetails } = useBooking();
  const pkg = PACKAGES.find((p) => p.value === state.packageId);
  const [attempted, setAttempted] = useState(false);

  useEffect(() => {
    if (!pkg) navigate("/booking");
  }, [pkg, navigate]);

  if (!pkg) return null;

  const errors = {
    fullName: !state.fullName.trim() ? "Please enter your full name." : "",
    email: !EMAIL_RE.test(state.email)
      ? "Please enter a valid email address."
      : "",
    phone:
      state.phone.trim().length < 7 ? "Please enter a valid phone number." : "",
  };

  const isValid = !Object.values(errors).some(Boolean);

  const inputError = (field: keyof typeof errors) =>
    attempted && !!errors[field]
      ? "border-red-500/50 focus-visible:ring-red-500/30"
      : "";

  const handleNext = () => {
    setAttempted(true);
    if (isValid) navigate("/booking/review");
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

        <div className="mt-6 flex flex-col gap-10 lg:flex-row">
          <div className="flex-1">
            <StepProgress currentStep={3} />

            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.15em] text-amber-500">
              Step 4 of 5
            </p>
            <h1 className="mt-1 font-serif text-3xl italic text-white">
              Your contact details.
            </h1>
            <p className="mt-2 max-w-lg text-sm text-gray-500">
              We&apos;ll send your booking confirmation here and reach out to
              finalize everything.
            </p>

            <div className="mt-6 space-y-5 rounded-2xl border border-white/8 bg-[#201f1c] p-5">
              <div>
                <Label htmlFor="customer-name">Full Name *</Label>
                <Input
                  id="customer-name"
                  type="text"
                  placeholder="e.g. Maria Santos"
                  value={state.fullName}
                  onChange={(e) =>
                    updateContactDetails({ fullName: e.target.value })
                  }
                  autoComplete="name"
                  className={inputError("fullName")}
                />
                <FieldError
                  show={attempted && !!errors.fullName}
                  message={errors.fullName}
                />
              </div>

              <div>
                <Label htmlFor="customer-email">Email Address *</Label>
                <Input
                  id="customer-email"
                  type="email"
                  placeholder="e.g. maria@example.com"
                  value={state.email}
                  onChange={(e) =>
                    updateContactDetails({ email: e.target.value })
                  }
                  autoComplete="email"
                  className={inputError("email")}
                />
                <FieldError
                  show={attempted && !!errors.email}
                  message={errors.email}
                />
              </div>

              <div>
                <Label htmlFor="customer-phone">Phone Number *</Label>
                <Input
                  id="customer-phone"
                  type="tel"
                  placeholder="e.g. 0917 123 4567"
                  value={state.phone}
                  onChange={(e) =>
                    updateContactDetails({ phone: e.target.value })
                  }
                  autoComplete="tel"
                  className={inputError("phone")}
                />
                <FieldError
                  show={attempted && !!errors.phone}
                  message={errors.phone}
                />
              </div>

              <p className="pt-1 text-xs leading-relaxed text-gray-600">
                By submitting, you agree that Let&apos;s Booth It may contact
                you regarding your booking. Your information will not be shared
                with third parties.
              </p>
            </div>

            {attempted && !isValid && (
              <p className="-mt-2 mt-2 text-sm text-red-400">
                Please fix the errors above before continuing.
              </p>
            )}

            <div className="mt-8 flex gap-3">
              <button
                onClick={() => navigate("/booking/package/package_1")}
                className="flex-1 rounded-full border border-white/20 py-4 text-base font-semibold text-white transition-colors hover:bg-white/5"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="flex-1 rounded-full bg-amber-500 py-4 text-base font-bold text-black transition-all hover:bg-amber-400 hover:shadow-[0_0_28px_rgba(245,158,11,0.35)]"
              >
                Continue to Review Booking
              </button>
            </div>
          </div>

          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
