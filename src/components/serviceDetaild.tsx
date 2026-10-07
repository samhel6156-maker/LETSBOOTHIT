import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { services } from "@/data/services";

export default function ServiceDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.hash) return;
    const el = document.querySelector(location.hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen w-full bg-[#1b1b18] py-16 lg:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-8 inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-amber-500"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-amber-600/40 bg-amber-950/30 px-4 py-1.5 text-xs font-medium tracking-wide text-amber-500">
            Pricing
          </span>
          <h1 className="mt-5 text-3xl font-bold text-white sm:text-4xl">
            Our Packages
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-gray-400 sm:text-base">
            Every package includes setup, breakdown, and a booth attendant. Pick
            the experience that fits your event, or reach out for a custom
            quote.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.slug}
                id={service.slug}
                className="scroll-mt-24 rounded-2xl border border-white/10 bg-[#201f1c] p-6 sm:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-500">
                      {service.label}
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-white">
                      {service.title}
                    </h2>
                  </div>
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/5">
                    <IconComponent className="h-5 w-5 text-amber-500" />
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-gray-400">
                  {service.description}
                </p>

                <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Starting at
                </p>
                <p className="mt-1 text-4xl font-bold text-white">
                  {service.price}
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-white/5 p-3">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-gray-500">
                      Duration
                    </p>
                    <p className="mt-1 text-sm font-medium text-white">
                      {service.duration}
                    </p>
                  </div>
                  <div className="rounded-lg bg-white/5 p-3">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-gray-500">
                      Extra Hour
                    </p>
                    <p className="mt-1 text-sm font-medium text-white">
                      {service.extraHour}
                    </p>
                  </div>
                </div>

                <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Includes
                </p>
                <ul className="mt-3 space-y-2.5">
                  {service.details.map((detail) => (
                    <li
                      key={detail}
                      className="flex items-start gap-2.5 text-sm text-gray-300"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
