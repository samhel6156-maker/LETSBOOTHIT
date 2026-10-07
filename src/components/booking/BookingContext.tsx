import { createContext, useContext, useState, type ReactNode } from "react";
import { PACKAGES } from "./BookingPage";

type BoothType = "classic" | "premium";

type BookingState = {
  packageId: string | null;
  backdrop: string;
  duration: string;
  boothType: BoothType;
  eventDate: string;
  startTime: string;
  eventType: string;
  venue: string;
  guestCount: string;
  specialRequests: string;
  dedicationText: string;
  fullName: string;
  email: string;
  phone: string;
  paymentMethod: string;
  confirmationRef: string | null;
  agreedToTerms: boolean;
};

type EventDetailsFields = {
  eventDate: string;
  startTime: string;
  eventType: string;
  venue: string;
  guestCount: string;
  specialRequests: string;
};

type ContactDetailsFields = {
  fullName: string;
  email: string;
  phone: string;
};

type BookingContextType = {
  state: BookingState;
  setPackage: (id: string, backdrop: string, duration: string) => void;
  setBoothType: (type: BoothType) => void;
  updateEventDetails: (fields: Partial<EventDetailsFields>) => void;
  updateContactDetails: (fields: Partial<ContactDetailsFields>) => void;
  setDedicationText: (text: string) => void;
  setPaymentMethod: (method: string) => void;
  setConfirmationRef: (ref: string) => void;
  setAgreedToTerms: (agreed: boolean) => void;
  resetBooking: () => void;
  total: number;
};

const BookingContext = createContext<BookingContextType | null>(null);

// ---- Pricing (shared — imported by PackageDetailPage.tsx and ReviewPage.tsx too) ----

export const DURATION_PRICES: Record<string, Record<string, number>> = {
  package_1: { "2h": 0, "3h": 1000, "4h": 2000, "5h": 3000, "6h": 4000 },
  package_2: { "2h": 0, "3h": 1500, "4h": 3000, "5h": 4500, "6h": 6000 },
  package_3: { "2h": 0, "3h": 1500, "4h": 3000, "5h": 4500, "6h": 6000 },
  package_4: { "2h": 0, "3h": 1500, "4h": 3000, "5h": 4500, "6h": 6000 },
  package_5: { "2h": 0, "3h": 1500, "4h": 3000, "5h": 4500, "6h": 6000 },
  package_6: { "2h": 0, "3h": 1500, "4h": 3000, "5h": 4500, "6h": 6000 },
  package_7: { "2h": 0, "3h": 1500, "4h": 3000, "5h": 4500, "6h": 6000 },
  package_8: { "2h": 0, "3h": 1500, "4h": 3000, "5h": 4500, "6h": 6000 },
  package_9: { "2h": 0, "3h": 1500, "4h": 3000, "5h": 4500, "6h": 6000 },
  package_10: { "2h": 0, "3h": 1500, "4h": 3000, "5h": 4500, "6h": 6000 },
  package_11: { "2h": 0, "3h": 1500, "4h": 3000, "5h": 4500, "6h": 6000 },
  package_12: { "2h": 0, "3h": 1500, "4h": 3000, "5h": 4500, "6h": 6000 },
};

export const THREE_HOUR_BASE_PACKAGES: string[] = [];

export function getBaseHours(packageId: string | null | undefined): number {
  return packageId && THREE_HOUR_BASE_PACKAGES.includes(packageId) ? 3 : 2;
}

export function getDurationPrice(
  packageId: string | null | undefined,
  duration: string,
): number {
  return (DURATION_PRICES[packageId ?? ""] ?? {})[duration] ?? 0;
}

export function getMaxExtraHours(packageId: string | null | undefined): number {
  const prices = DURATION_PRICES[packageId ?? ""] ?? {};
  const hours = Object.keys(prices).map((key) => parseInt(key, 10));
  if (hours.length === 0) return 0;
  const base = getBaseHours(packageId);
  return Math.max(0, Math.max(...hours) - base);
}

export const PREMIUM_BOOTH_PRICE = 1000;

// ---- Booking state ----

const INITIAL_STATE: BookingState = {
  packageId: null,
  backdrop: "solid",
  duration: "2h",
  boothType: "classic",
  eventDate: "",
  startTime: "",
  eventType: "",
  venue: "",
  guestCount: "",
  specialRequests: "",
  dedicationText: "",
  fullName: "",
  email: "",
  phone: "",
  paymentMethod: "",
  confirmationRef: null,
  agreedToTerms: false,
};

export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<BookingState>(INITIAL_STATE);

  const setPackage = (id: string, backdrop: string, duration: string) =>
    setState((prev) => ({
      ...prev,
      packageId: id,
      backdrop,
      duration,
      boothType: "classic",
    }));

  const setBoothType = (type: BoothType) =>
    setState((prev) => ({ ...prev, boothType: type }));

  const updateEventDetails = (fields: Partial<EventDetailsFields>) =>
    setState((prev) => ({ ...prev, ...fields }));

  const updateContactDetails = (fields: Partial<ContactDetailsFields>) =>
    setState((prev) => ({ ...prev, ...fields }));

  const setDedicationText = (text: string) =>
    setState((prev) => ({ ...prev, dedicationText: text }));

  const setPaymentMethod = (method: string) =>
    setState((prev) => ({ ...prev, paymentMethod: method }));

  const setConfirmationRef = (ref: string) =>
    setState((prev) => ({ ...prev, confirmationRef: ref }));

  const setAgreedToTerms = (agreed: boolean) =>
    setState((prev) => ({ ...prev, agreedToTerms: agreed }));

  const resetBooking = () => setState(INITIAL_STATE);

  const pkg = PACKAGES.find((p) => p.value === state.packageId);
  const durationPrice = getDurationPrice(state.packageId, state.duration);
  const total =
    (pkg?.price ?? 0) +
    durationPrice +
    (state.boothType === "premium" ? PREMIUM_BOOTH_PRICE : 0);

  return (
    <BookingContext.Provider
      value={{
        state,
        setPackage,
        setBoothType,
        updateEventDetails,
        updateContactDetails,
        setDedicationText,
        setPaymentMethod,
        setConfirmationRef,
        setAgreedToTerms,
        resetBooking,
        total,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within a BookingProvider");
  return ctx;
}
