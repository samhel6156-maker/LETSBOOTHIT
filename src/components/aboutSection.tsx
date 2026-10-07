"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/section-header";

type Chapter = {
  number: string;
  title: string;
  eyebrow: string;
  heading: string;
  body: string;
};

const chapters: Chapter[] = [
  {
    number: "01",
    title: "How It Started",
    eyebrow: "A little side project",
    heading:
      "It started with two people, a little extra time, and an idea to build something together.",
    body: "We're a married couple and both computer engineers, so Let's Booth It started as a small side project we could enjoy together outside of work. What began as a simple way to spend our free time — and maybe earn a little extra for our dates and adventures — slowly became something we genuinely loved.\n\nWe never expected it to grow into what it is today. But somewhere between setting up booths, helping guests pose, and watching people laugh in front of the camera, we realized we had created something worth keeping.",
  },
  {
    number: "02",
    title: "Why We Stayed",
    eyebrow: "It became more than a side project",
    heading:
      "Somewhere along the way, it became more than just a side project.",
    body: "What kept us going wasn't just the business. It was the people.\n\nWe loved seeing families celebrate together, friends being silly, couples making memories, and guests taking home something they could keep long after the event. Being part of those little moments made the work feel meaningful.\n\nThat's when we decided to take Let's Booth It more seriously — not by making it feel bigger or more corporate, but by keeping the same personal touch that made us love it in the first place.",
  },
  {
    number: "03",
    title: "What We Bring",
    eyebrow: "Engineers behind the lens",
    heading: "We bring the details, so you can enjoy the moment.",
    body: "As computer engineers, we naturally pay attention to the little things. We care about making sure the setup works smoothly, the photos look great, and the experience feels easy and enjoyable for everyone.\n\nBut beyond the technology and equipment, we bring something personal to every event: genuine care.\n\nWe want your guests to feel comfortable, have fun, and leave with memories they'll actually want to keep. We believe quality doesn't have to mean complicated — and a great experience should still feel warm and approachable.",
  },
  {
    number: "04",
    title: "Our Promise",
    eyebrow: "What you can expect",
    heading: "Your celebration should feel like yours.",
    body: "Let's Booth It is our little way of spreading joy, laughter, and togetherness.\n\nWe promise to put the same care into your celebration that we would into our own — from the setup and photos to the experience we create for you and your guests.\n\nWe may be a small, part-time business, but we take every event seriously. We're honored every time someone chooses us to be part of their special moments, and we'll always do our best to make those moments worth remembering.",
  },
];

export function AboutSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = chapters[activeIndex];

  return (
    <section className="bg-[#1b1b18] py-24 px-6 text-white">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          pill="Our Story"
          highlight="About"
          title="Us"
          subtitle="A photobooth experience built by two people who believe the best memories are the ones you make together."
        />

        {/* Content */}
        <div className="mt-4 grid grid-cols-1 gap-10 border-t border-white/10 pt-10 md:grid-cols-[1fr_2fr] md:gap-16">
          {/* Left: chapter nav */}
          <nav aria-label="About Us sections">
            <ul className="flex flex-col">
              {chapters.map((chapter, index) => {
                const isActive = index === activeIndex;
                return (
                  <li key={chapter.number}>
                    <button
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      aria-current={isActive}
                      className={`group flex w-full items-center justify-between border-l-2 py-4 pl-5 pr-2 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 ${
                        isActive
                          ? "border-amber-500"
                          : "border-white/10 hover:border-amber-500/40"
                      }`}
                    >
                      <span
                        className={`text-sm font-semibold tracking-wide transition-colors ${
                          isActive
                            ? "text-white"
                            : "text-gray-500 group-hover:text-gray-300"
                        }`}
                      >
                        {chapter.title.toUpperCase()}
                      </span>
                      <span
                        className={`text-sm tabular-nums transition-colors ${
                          isActive ? "text-amber-400" : "text-gray-600"
                        }`}
                      >
                        {chapter.number}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right: active chapter content */}
          <div key={active.number} className="animate-in fade-in duration-300">
            <p className="text-xs font-semibold tracking-widest text-amber-500 uppercase">
              {active.eyebrow}
            </p>
            <h3 className="mt-4 whitespace-pre-line text-3xl font-bold leading-tight sm:text-4xl">
              {active.heading}
            </h3>
            <p className="mt-6 max-w-xl whitespace-pre-line text-gray-400 leading-relaxed">
              {active.body}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
