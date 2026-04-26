export function MarqueeStrip() {
    const items = [
        'Weddings',
        'Corporate Events',
        'Birthday Parties',
        'Galas',
        'Brand Activations',
        'Private Celebrations',
        'Graduations',
        'Holiday Parties',
    ];

    return (
        <>
            <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
            <div className="overflow-hidden bg-[#1b1b18] py-4 text-white dark:bg-white dark:text-[#1b1b18]">
                <div className="animate-marquee flex whitespace-nowrap">
                    {[...items, ...items, ...items].map((item, i) => (
                        <span
                            key={i}
                            className="mx-8 text-sm font-medium tracking-[0.2em] uppercase"
                        >
                            {item}{' '}
                            <span className="mx-4 text-amber-400">✦</span>
                        </span>
                    ))}
                </div>
            </div>
        </>
    );
}
