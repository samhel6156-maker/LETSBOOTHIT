// src/components/booking/TermsDialog.tsx
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const SECTIONS = [
  {
    title: "1. Booking and Payment",
    body: "A 20% down payment is required to reserve your date. Please note that the down payment is non-refundable. The remaining balance must be settled on or before the event date. Payments can be made via cash or online transfer.",
  },
  {
    title: "2. Event Details and Service Start Time",
    body: "The event details must be carefully reviewed by the Client. The Client is responsible for ensuring that all information provided—including the event date, time, venue, and access requirements—is accurate. Any changes must be communicated at least two (2) days prior to the event. The time indicated in the booking is the official service start time. For example, if the Client books the service to start at 2:00 PM, the photobooth service will officially begin at 2:00 PM, and the agreed service duration will be counted from that time. Any delays caused by the Client, guests, venue, late access, or other circumstances beyond the control of Let's Booth It will not extend the agreed service period. The Client is responsible for ensuring that the venue is accessible and ready for setup prior to the scheduled service start time.",
  },
  {
    title: "3. Liability",
    body: "Let's Booth It shall not be held liable for any damage, injury, or loss during the event. The Client shall be responsible for any damage to the photobooth equipment caused by guests.",
  },
  {
    title: "4. Image Usage",
    body: "Unless requested otherwise in writing, Let's Booth It may use photos taken during the event for promotional and social media purposes.",
  },
  {
    title: "5. Guest Conduct",
    body: "The Client is responsible for ensuring proper use of the photobooth by guests. Any intentional damage or misuse will be charged to the Client.",
  },
  {
    title: "6. Internet Connectivity & Uploading (Mirror Booth & 360 Booth)",
    body: "For Mirror Booth services, Let's Booth It will provide a pocket Wi-Fi device equipped with multiple network SIM cards and will make reasonable efforts to connect to the strongest available network at the venue to enable guests to scan a QR code and download their photos instantly. For 360 Booth services, videos may be transferred immediately to Apple users via AirDrop, subject to device compatibility and proximity. Android users may access and download their videos through the provided QR code, provided that a stable internet connection/signal is available at the venue. The Client acknowledges that internet connectivity is dependent on factors beyond the control of Let's Booth It, including but not limited to venue location, signal strength, and network availability. In the event that available networks cannot support real-time uploading or downloading during the event, all photos and videos will be uploaded after the event and provided to the Client via Google Drive. Such circumstances shall not be considered a failure of service and shall not be grounds for refund, cancellation, or any form of compensation.",
  },
  {
    title: "7. Layout Approval",
    body: "Let's Booth It will provide the layout design for the Client's review prior to the event. The Client is responsible for carefully checking all details in the layout, including but not limited to names, dates, and text content. Any revisions must be communicated before final approval. Once the layout has been approved by the Client, Let's Booth It shall not be held liable for any errors, including but not limited to misspellings, incorrect names, dates, or other information reflected in the final output.",
  },
  {
    title: "8. Technical Issues",
    body: "In the event of technical difficulties, immediate action will be taken to resolve the issue. No refunds shall be issued for issues beyond our control, including but not limited to power interruptions, equipment malfunction due to external factors, or network issues.",
  },
  {
    title: "9. Indemnification",
    body: "The Client agrees to release and hold Let's Booth It free and harmless from any claims, demands, or liabilities arising from the event.",
  },
  {
    title: "10. Outdoor Events",
    body: "For outdoor events, the Client must provide a backup indoor area in case of bad weather or unsafe conditions. If no backup area is available, Let's Booth It reserves the right to cancel the service on-site, and full payment shall still apply.",
  },
  {
    title: "11. Service Termination",
    body: "Let's Booth It reserves the right to stop or remove the photobooth setup if guests behave inappropriately or if the Client fails to comply with these terms and conditions.",
  },
  {
    title: "12. Force Majeure",
    body: "Let's Booth It shall not be held liable for failure to perform due to events beyond its control, including but not limited to natural disasters, government restrictions, emergencies, or acts of God.",
  },
  {
    title: "13. Acceptance of Terms",
    body: "By proceeding with the booking, making payment, or allowing the event and services to proceed, the Client acknowledges that they have read, understood, and agreed to all the terms and conditions stated in this contract. This agreement shall be considered valid and binding even without a physical signature.",
  },
];

export function TermsDialog({
  open,
  onOpenChange,
  onAgree,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAgree: () => void;
}) {
  const [reachedEnd, setReachedEnd] = useState(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 24) {
      setReachedEnd(true);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex h-[85vh] w-[calc(100vw-2rem)] max-w-[600px] flex-col overflow-hidden bg-[#201f1c] p-5 text-white sm:h-auto sm:max-h-[85vh] sm:p-6">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl italic text-white">
            Terms &amp; Conditions
          </DialogTitle>
        </DialogHeader>

        <div
          onScroll={handleScroll}
          className="min-h-0 flex-1 space-y-4 overflow-y-auto pr-1 text-sm leading-relaxed text-gray-400"
        >
          {SECTIONS.map((s) => (
            <div key={s.title}>
              <p className="mb-1 font-semibold text-white">{s.title}</p>
              <p>{s.body}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t border-white/8 pt-4">
          {!reachedEnd && (
            <p className="text-center text-xs text-gray-500 sm:text-left">
              Scroll to the bottom to continue
            </p>
          )}
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <button
              onClick={() => onOpenChange(false)}
              className="rounded-lg border border-white/20 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/5"
            >
              Cancel
            </button>
            <button
              disabled={!reachedEnd}
              onClick={() => {
                onAgree();
                onOpenChange(false);
              }}
              className="rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-black hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              I Agree
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
