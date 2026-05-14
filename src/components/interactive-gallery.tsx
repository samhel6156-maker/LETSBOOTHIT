import { useState, useEffect, useRef } from 'react';

const galleryData = [
    // Standard Photobooth
    { src: '/Photobooth photos/Standard photobooth/IMG_4122.JPG', title: 'Standard Photobooth 1', category: 'Standard Photobooth' },
    { src: '/Photobooth photos/Standard photobooth/IMG_7151.jpg', title: 'Standard Photobooth 2', category: 'Standard Photobooth' },

    // Premium Setup
    { src: '/Photobooth photos/Premium setup/IMG_5230.JPG', title: 'Premium Setup 1', category: 'Premium Setup' },
    { src: '/Photobooth photos/Premium setup/IMG_5578.JPG', title: 'Premium Setup 2', category: 'Premium Setup' },

    // Polaroid
    { src: '/Photobooth photos/Polaroid/IMG_6264.JPG', title: 'Polaroid 1', category: 'Polaroid' },

    // Photoman
    { src: '/Photobooth photos/Photoman/IMG_0863.JPG', title: 'Photoman 1', category: 'Photoman' },
    { src: '/Photobooth photos/Photoman/IMG_1133.JPG', title: 'Photoman 2', category: 'Photoman' },
    { src: '/Photobooth photos/Photoman/IMG_1134.JPG', title: 'Photoman 3', category: 'Photoman' },

    // Our Team
    { src: '/Photobooth photos/Our team/IMG_6641.JPG', title: 'Our Team 1', category: 'Our Team' },

    // Mirror Booth
    { src: '/Photobooth photos/Mirror Booth/IMG_5920.jpg', title: 'Mirror Booth 1', category: 'Mirror Booth' },
    { src: '/Photobooth photos/Mirror Booth/IMG_7197.JPG', title: 'Mirror Booth 2', category: 'Mirror Booth' },

    // Keychain
    { src: '/Photobooth photos/Keychain/IMG_6600.JPG', title: 'Keychain 1', category: 'Keychain' },

    // Customized Studio
    { src: '/Photobooth photos/Customized Studio Booth/IMG_6907.JPG', title: 'Customized Studio 1', category: 'Customized Studio' },
    { src: '/Photobooth photos/Customized Studio Booth/IMG_6918.JPG', title: 'Customized Studio 2', category: 'Customized Studio' },

    // 360 Videobooth
    { src: '/Photobooth photos/360 videobooth/IMG_6553.JPG', title: '360 Videobooth 1', category: '360 Videobooth' },
    { src: '/Photobooth photos/360 videobooth/IMG_7996.JPG', title: '360 Videobooth 2', category: '360 Videobooth' },
];

const categories = [
    'All',
    'Standard Photobooth',
    'Premium Setup',
    'Polaroid',
    'Photoman',
    'Our Team',
    'Mirror Booth',
    'Keychain',
    'Customized Studio',
    '360 Videobooth',
];

export function InteractiveGallery() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [current, setCurrent] = useState(0);
    const [isAutoPlay, setIsAutoPlay] = useState(true);
    const [isHovering, setIsHovering] = useState(false);
    const autoPlayIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const filtered = activeCategory === 'All'
        ? galleryData.filter(g => g.src !== '')
        : galleryData.filter(g => g.category === activeCategory && g.src !== '');

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

    const item = filtered[current] ?? filtered[0];

    if (!item) {
        return (
            <div className="w-full flex items-center justify-center h-[280px] rounded-2xl bg-[#2a1f1a]">
                <p className="text-amber-500 text-sm uppercase tracking-widest">
                    Images coming soon
                </p>
            </div>
        );
    }

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

                {/* Categories - horizontal scroll */}
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
            </div>
        </div>
    );
}