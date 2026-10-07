import { useEffect, useState } from "react";

type ServiceCarouselProps = {
  images: { src: string; alt: string }[];
  label: string;
};

export function ServiceCarousel({ images, label }: ServiceCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [images.length]);

  return (
    <div
      className="relative h-48 w-full overflow-hidden rounded-lg bg-[#2a1f1a]"
      aria-label={`${label} photo gallery`}
    >
      {images.map((image, index) => (
        <img
          key={image.src}
          src={image.src}
          alt={image.alt}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
            index === activeIndex ? "z-10 opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div
        className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-black/60 to-transparent"
        aria-hidden="true"
      />
      <span className="absolute bottom-3 left-3 z-30 text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-white">
        {label}
      </span>
    </div>
  );
}
