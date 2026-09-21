"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ServiceCarousel } from "@/components/service-carousel";
import { SectionHeader } from "@/components/section-header";
import { services, type ServiceItem } from "@/data/services";

/* ---------- ScrollReveal ----------
   Uses the .scroll-animate* / .animate-in-view / .delay-* classes
   already defined in globals.css. */

type ScrollRevealProps = {
  children: ReactNode;
  animation?: "up" | "left" | "right" | "scale";
  delay?: number;
};

function ScrollReveal({
  children,
  animation = "up",
  delay = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const animationClass = {
    up: "scroll-animate",
    left: "scroll-animate-left",
    right: "scroll-animate-right",
    scale: "scroll-animate-scale",
  }[animation];

  const delaySteps = [0, 100, 200, 300, 400, 500];
  const nearestDelay = delaySteps.reduce((prev, curr) =>
    Math.abs(curr - delay) < Math.abs(prev - delay) ? curr : prev,
  );
  const delayClass = nearestDelay > 0 ? `delay-${nearestDelay}` : "";

  return (
    <div
      ref={ref}
      className={`${animationClass} ${delayClass} ${isVisible ? "animate-in-view" : ""}`}
    >
      {children}
    </div>
  );
}

/* ---------- ServiceDetailsLink ---------- */

function ServiceDetailsLink({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-3 text-xs font-semibold uppercase tracking-wide text-amber-500 underline-offset-4 transition-colors hover:text-amber-400 hover:underline"
    >
      See Full Details
    </button>
  );
}

/* ---------- ServiceDetailsModal ---------- */

function ServiceDetailsModal({
  service,
  onClose,
}: {
  service: ServiceItem;
  onClose: () => void;
}) {
  const IconComponent = service.icon;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div
        className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-lg border border-amber-600/30 bg-[#1b1b18] p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close details"
          className="absolute right-4 top-4 text-gray-400 transition-colors hover:text-amber-500"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-start justify-between gap-4 pr-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-500">
              {service.label}
            </p>
            <h4 className="mt-2 text-2xl font-semibold text-white">
              {service.title}
            </h4>
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
        <p className="mt-1 text-4xl font-bold text-white">{service.price}</p>

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
        {service.addOns && service.addOns.length > 0 && (
          <>
            <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Optional Add-ons
            </p>
            <ul className="mt-3 space-y-3">
              {service.addOns.map((addOn) => (
                <li key={addOn.label} className="rounded-lg bg-white/5 p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-white">
                      {addOn.label}
                    </p>
                    <p className="text-sm font-semibold text-amber-500">
                      {addOn.price}
                    </p>
                  </div>
                  <p className="mt-1 text-xs text-gray-400">
                    {addOn.description}
                  </p>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

/* ---------- ServicesSection ---------- */

export function ServicesSection() {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(
    null,
  );

  return (
    <div id="services" className="w-full bg-[#1b1b18] py-16 lg:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="up">
          <SectionHeader
            pill="What We Offer"
            highlight="Premium"
            title="Photobooth Experiences"
            subtitle="From intimate weddings and birthday parties to grand corporate celebrations, we've got the perfect setup to match your event and keep your guests smiling, posing, and having a great time."
          />
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[#333]" />
          {services.map((service, index) => {
            const IconComponent = service.icon;
            const isLeft = index % 2 === 0;
            return (
              <ScrollReveal
                key={service.slug}
                animation={isLeft ? "left" : "right"}
                delay={
                  index === 0 ? 0 : index === 1 ? 100 : index === 2 ? 200 : 300
                }
              >
                <div className="relative mb-20 grid grid-cols-[1fr_60px_1fr] items-center gap-6">
                  <div className={isLeft ? "text-right" : ""}>
                    {isLeft ? (
                      <>
                        <p className="mb-2 text-xs tracking-[0.2em] text-amber-500 uppercase">
                          {service.label}
                        </p>
                        <h3 className="mb-3 text-2xl font-semibold text-white sm:text-3xl">
                          {service.title}
                        </h3>
                        <p className="ml-auto max-w-xs text-sm leading-relaxed text-gray-400">
                          {service.description}
                        </p>
                        <ServiceDetailsLink
                          onClick={() => setSelectedService(service)}
                        />
                      </>
                    ) : (
                      <ServiceCarousel
                        images={service.images}
                        label={service.title}
                      />
                    )}
                  </div>
                  <div className="relative flex justify-center">
                    <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border-2 border-amber-600 bg-[#1b1b18]">
                      <IconComponent className="h-5 w-5 text-amber-500" />
                    </div>
                  </div>
                  <div>
                    {!isLeft ? (
                      <>
                        <p className="mb-2 text-xs tracking-[0.2em] text-amber-500 uppercase">
                          {service.label}
                        </p>
                        <h3 className="mb-3 text-2xl font-semibold text-white sm:text-3xl">
                          {service.title}
                        </h3>
                        <p className="max-w-xs text-sm leading-relaxed text-gray-400">
                          {service.description}
                        </p>
                        <ServiceDetailsLink
                          onClick={() => setSelectedService(service)}
                        />
                      </>
                    ) : (
                      <ServiceCarousel
                        images={service.images}
                        label={service.title}
                      />
                    )}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal animation="up" delay={200}>
          <div className="mt-4 flex justify-center">
            <Button
              size="lg"
              className="uppercase"
              onClick={() => navigate("/booking")}
            >
              View All Packages
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </ScrollReveal>
      </div>

      {selectedService && (
        <ServiceDetailsModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </div>
  );
}
