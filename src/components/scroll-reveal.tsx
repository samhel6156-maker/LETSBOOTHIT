import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface ScrollRevealProps {
    children: React.ReactNode;
    className?: string;
    animation?: 'up' | 'left' | 'right' | 'scale';
    delay?: 0 | 100 | 200 | 300 | 400 | 500;
}

export function ScrollReveal({
    children,
    className = '',
    animation = 'up',
    delay = 0,
}: ScrollRevealProps) {
    const ref = useScrollAnimation();

    const animationClass = {
        up: 'scroll-animate',
        left: 'scroll-animate-left',
        right: 'scroll-animate-right',
        scale: 'scroll-animate-scale',
    }[animation];

    const delayClass = delay ? `delay-${delay}` : '';

    return (
        <div ref={ref} className={`${animationClass} ${delayClass} ${className}`}>
            {children}
        </div>
    );
}