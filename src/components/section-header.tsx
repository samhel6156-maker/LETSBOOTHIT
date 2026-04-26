interface SectionHeaderProps {
    pill: string;
    title: string;
    highlight: string;
    subtitle?: string;
    highlightColor?: string;
}

export function SectionHeader({ pill, title, highlight, subtitle, highlightColor = 'text-amber-500' }: SectionHeaderProps) {
    return (
        <div className="mb-12 flex flex-col items-center text-center sm:mb-16">
            <div className="mb-4 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                <span className="text-xs" style={{ color: '#ffffff' }}>{pill}</span>
            </div>
            <h2 className="mb-4 max-w-3xl text-3xl font-bold sm:text-4xl lg:text-5xl" style={{ color: '#ffffff' }}>
                <span className={highlightColor}>{highlight}</span>{' '}
                {title}
            </h2>
            {subtitle && (
                <p className="max-w-xl text-sm leading-relaxed sm:text-base" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    {subtitle}
                </p>
            )}
        </div>
    );
}