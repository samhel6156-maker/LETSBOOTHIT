import { useState, useEffect, useRef } from 'react';

const galleryData = [
    { src: '/images/packages/package_1.png', title: 'Classic 4-Cut', category: 'Classic' },
    { src: '/images/packages/package_2.png', title: 'Big Frame', category: 'Premium' },
    { src: '/images/packages/package_3.png', title: 'Scrapbook Style', category: 'Creative' },
    { src: '/images/packages/package_4.png', title: 'Message Board', category: 'Creative' },
    { src: '/images/packages/package_5.png', title: 'Passport Strip', category: 'Classic' },
    { src: '/images/packages/package_6.jpg', title: 'Premium Layout', category: 'Premium' },
];

const categories = ['All', 'Classic', 'Premium', 'Creative'];

export function InteractiveGallery() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [current, setCurrent] = useState(0);
    const [isAutoPlay, setIsAutoPlay] = useState(true);
    const [isHovering, setIsHovering] = useState(false);
    const autoPlayIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const thumbsRef = useRef<HTMLDivElement | null>(null);

    const filtered = activeCategory === 'All'
        ? galleryData
        : galleryData.filter(g => g.category === activeCategory);

    useEffect(() => {
        if (!isAutoPlay || isHovering || filtered.length === 0) {
            if (autoPlayIntervalRef.current) clearInterval(autoPlayIntervalRef.current);
            return;
        }
        autoPlayIntervalRef.current = setInterval(() => {
            setCurrent(c => (c + 1) % filtered.length);
        }, 3000);
        return () => {
            if (autoPlayIntervalRef.current) clearInterval(autoPlayIntervalRef.current);
        };
    }, [isAutoPlay, isHovering, filtered.length]);

    useEffect(() => {
        setCurrent(0);
    }, [activeCategory]);

    useEffect(() => {
        if (thumbsRef.current && thumbsRef.current.children[current]) {
            const container = thumbsRef.current;
            const thumb = container.children[current] as HTMLElement;
            const scrollLeft = thumb.offsetLeft - container.offsetWidth / 2 + thumb.offsetWidth / 2;
            container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
        }
    }, [current]);

    const item = filtered[current] ?? filtered[0];

    return (
        <div className="w-full">
            <div className="flex flex-col gap-4">
                {/* Main Image */}
                <div
                    className="relative w-full rounded-2xl overflow-hidden h-[280px] sm:h-[400px] group"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                >
                    <img
                        key={current}
                        src={item.src}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Prev button */}
                    <button
                        type="button"
                        onClick={() => setCurrent(c => (c - 1 + filtered.length) % filtered.length)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition"
                    >
                        <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Next button */}
                    <button
                        type="button"
                        onClick={() => setCurrent(c => (c + 1) % filtered.length)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition"
                    >
                        <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Autoplay toggle */}
                    <button
                        type="button"
                        onClick={() => setIsAutoPlay(!isAutoPlay)}
                        className="absolute top-3 right-3 h-9 w-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition"
                    >
                        {isAutoPlay ? (
                            <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                            </svg>
                        ) : (
                            <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        )}
                    </button>

                    {/* Caption */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <p className="text-white font-semibold text-base">{item.title}</p>
                        <p className="text-white/70 text-sm">{item.category}</p>
                    </div>
                </div>

                {/* Categories - horizontal scroll on mobile */}
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                    {categories.map(cat => (
                        <button
                            type="button"
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeCategory === cat
                                    ? 'bg-amber-600 text-white'
                                    : 'bg-[#2a1f1a] text-gray-300 hover:bg-amber-900/30'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}

                    {/* Image counter */}
                    <div className="ml-auto shrink-0 flex items-center px-4 py-2 rounded-lg bg-amber-600 text-white text-sm font-medium">
                        {current + 1} / {filtered.length}
                    </div>
                </div>

                {/* Thumbnails */}
                <div>
                    <p className="text-xs tracking-[0.2em] text-amber-500 uppercase mb-3">Browse</p>
                    <div ref={thumbsRef} className="flex gap-3 overflow-x-auto pb-2 scroll-smooth">
                        {filtered.map((g, i) => (
                            <button
                                type="button"
                                key={`${activeCategory}-${i}`}
                                onClick={() => setCurrent(i)}
                                className={`shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border-2 transition-transform duration-200 ${current === i
                                        ? 'border-amber-500 scale-105 opacity-100'
                                        : 'border-transparent opacity-70 hover:opacity-100 hover:scale-105'
                                    }`}
                            >
                                <img src={g.src} alt={g.title} className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}