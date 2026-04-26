import BookingRequestDialog from '../components/booking-request-dialog';
import { MarqueeStrip } from '../components/marquee-strip';
import { Toaster } from '../components/ui/sonner';
import { ArrowRight, Camera, Palette, Sparkles, Users, PhoneCall } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import { SectionHeader } from '../components/section-header';
import { InteractiveGallery } from '../components/interactive-gallery';

const services = [
    { icon: Camera, label: 'Our Services', title: 'Classic Booth', description: 'Timeless elegance with our signature enclosed photobooth experience. Perfect for weddings and formal events.' },
    { icon: Sparkles, label: 'Experience', title: '360° Video Booth', description: 'Immersive rotating platform capturing every angle of your moment. The most popular choice for parties.' },
    { icon: Users, label: 'Group Fun', title: 'Open Air Setup', description: 'Perfect for large groups with stunning custom backdrops. Great for corporate events and galas.' },
    { icon: Palette, label: 'Branding', title: 'Branded Events', description: 'Custom designed experiences tailored to your brand identity. Make every snapshot on-brand.' },
];

const stats = [
    { value: "500+", label: "Events Captured" },
    { value: "50K+", label: "Happy Guests" },
    { value: "5", label: "Years Experience" },
];

const socials = [
    { href: 'https://facebook.com', label: 'Facebook' },
    { href: 'https://instagram.com', label: 'Instagram' },
    { href: 'https://tiktok.com', label: 'TikTok' },
];

export default function Welcome() {

    const [showNav, setShowNav] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScrollY(currentScrollY);
            if (currentScrollY > lastScrollY && currentScrollY > 100) setShowNav(false);
            else if (currentScrollY < lastScrollY) setShowNav(true);
            if (currentScrollY < 100) setShowNav(false);
            setLastScrollY(currentScrollY);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const parallaxOffset = scrollY * 0.5;

    return (
        <>
            {/* Sticky Header */}
            <header className={`fixed top-0 right-0 left-0 z-50 bg-white/80 shadow-sm backdrop-blur-md transition-transform duration-300 dark:bg-[#1b1b18]/80 ${showNav ? 'translate-y-0' : '-translate-y-full'}`}>
                <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
                    <img
                        src="/weblogo.png"
                        alt="Let's Booth It"
                        className="h-10 w-auto sm:h-12"
                    />
                    <div className="flex items-center gap-2 sm:gap-4">
                        <a href="#services" onClick={(e) => handleSmoothScroll(e, '#services')} className="inline-block rounded-sm border border-transparent px-3 py-1.5 text-xs leading-normal text-[#1b1b18] transition-colors hover:border-[#19140035] sm:px-5 sm:text-sm dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]">Services</a>
                        <a href="#about" onClick={(e) => handleSmoothScroll(e, '#about')} className="inline-block rounded-sm border border-transparent px-3 py-1.5 text-xs leading-normal text-[#1b1b18] transition-colors hover:border-[#19140035] sm:px-5 sm:text-sm dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]">About Us</a>
                        <a href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')} className="inline-block rounded-sm border border-transparent px-3 py-1.5 text-xs leading-normal text-[#1b1b18] transition-colors hover:border-[#19140035] sm:px-5 sm:text-sm dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]">Contact</a>
                    </div>
                </nav>
            </header>

            {/* Hero Section */}
            <div className="relative flex min-h-screen flex-col items-center justify-between overflow-hidden bg-[#FDFDFC] p-4 pb-20 text-[#1b1b18] sm:p-6 sm:pb-24 lg:justify-center lg:p-8 lg:pb-8 dark:bg-[#1b1b18]">
                <div className="absolute inset-0 z-0 overflow-hidden" style={{ transform: `translateY(${parallaxOffset}px)`, willChange: 'transform' }}>
                    <div className="h-full w-full">
                        <img
                            src="/landingpage-bg.png"
                            alt="Background"
                            className="h-full w-full object-cover object-center"
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FDFDFC]/95 via-[#FDFDFC]/60 to-transparent dark:from-[#0a0a0a]/95 dark:via-[#0a0a0a]/60" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#FDFDFC] dark:to-[#0a0a0a]" />
                </div>
                <header className="relative z-10 mb-4 w-full max-w-[335px] text-sm sm:mb-6 lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-2 sm:gap-4">
                        <a href="#services" onClick={(e) => handleSmoothScroll(e, '#services')} className="inline-block rounded-sm border border-transparent px-3 py-1.5 text-xs leading-normal text-[#1b1b18] transition-colors hover:border-[#19140035] sm:px-5 sm:text-sm dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]">Services</a>
                        <a href="#about" onClick={(e) => handleSmoothScroll(e, '#about')} className="inline-block rounded-sm border border-transparent px-3 py-1.5 text-xs leading-normal text-[#1b1b18] transition-colors hover:border-[#19140035] sm:px-5 sm:text-sm dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]">About Us</a>
                        <a href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')} className="inline-block rounded-sm border border-transparent px-3 py-1.5 text-xs leading-normal text-[#1b1b18] transition-colors hover:border-[#19140035] sm:px-5 sm:text-sm dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]">Contact</a>
                    </nav>
                </header>
                <div className="relative z-10 flex w-full items-end lg:grow lg:items-center">
                    <div className="flex w-full max-w-2xl flex-col gap-3 sm:gap-4">
                        <h1 className="text-start text-3xl leading-[1.1] font-extrabold tracking-tight text-balance uppercase [text-shadow:_0_1px_8px_rgb(0_0_0_/_20%)] sm:text-4xl md:text-5xl lg:text-6xl lg:leading-[1.1] dark:text-white">
                            Let's booth it photobooth
                        </h1>
                        <p className="text-start text-base leading-relaxed text-balance text-amber-600 uppercase [text-shadow:_0_1px_6px_rgb(0_0_0_/_15%)] sm:text-lg lg:text-xl dark:text-amber-400">
                            Let's boost your events with your beautiful smile
                        </p>
                        <BookingRequestDialog />
                    </div>
                </div>
                <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 animate-bounce sm:bottom-8">
                    <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-[#1b1b18] p-2 sm:h-12 sm:w-8 dark:border-[#EDEDEC]">
                        <div className="h-1.5 w-1 animate-pulse rounded-full bg-[#1b1b18] sm:h-2 dark:bg-[#EDEDEC]" />
                    </div>
                </div>
            </div>

            <MarqueeStrip />

            {/* Services Section */}
            <div id="services" className="w-full bg-[#1b1b18] py-16 lg:py-24">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

                    {/* Section Header inside the section */}
                    <SectionHeader
                        pill="What We Offer"
                        highlight="Premium"
                        title="Photobooth Experiences"
                        subtitle="From intimate weddings to grand corporate galas, we have the perfect setup for your event."
                    />

                    {/* Timeline */}
                    <div className="relative">
                        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[#333]" />
                        {services.map((service, index) => {
                            const IconComponent = service.icon;
                            const isLeft = index % 2 === 0;
                            return (
                                <div key={index} className="relative mb-20 grid grid-cols-[1fr_60px_1fr] items-center gap-6">
                                    <div className={isLeft ? 'text-right' : ''}>
                                        {isLeft ? (
                                            <>
                                                <p className="mb-2 text-xs tracking-[0.2em] text-amber-500 uppercase">{service.label}</p>
                                                <h3 className="mb-3 text-2xl font-semibold text-white sm:text-3xl">{service.title}</h3>
                                                <p className="ml-auto max-w-xs text-sm leading-relaxed text-gray-400">{service.description}</p>
                                            </>
                                        ) : (
                                            <div className="flex h-48 w-full items-center justify-center rounded-lg bg-[#2a1f1a]">
                                                <IconComponent className="h-12 w-12 text-amber-700" />
                                            </div>
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
                                                <p className="mb-2 text-xs tracking-[0.2em] text-amber-500 uppercase">{service.label}</p>
                                                <h3 className="mb-3 text-2xl font-semibold text-white sm:text-3xl">{service.title}</h3>
                                                <p className="max-w-xs text-sm leading-relaxed text-gray-400">{service.description}</p>
                                            </>
                                        ) : (
                                            <div className="flex h-48 w-full items-center justify-center rounded-lg bg-[#2a1f1a]">
                                                <IconComponent className="h-12 w-12 text-amber-700" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Gallery Section */}
            <div className="w-full bg-[#1b1b18] py-12">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <SectionHeader
                        pill="Our Work"
                        highlight="Beautiful"
                        title="Moments We've Captured"
                        subtitle="Take a look at some of our favourite photobooth layouts and prints."
                    />
                    <InteractiveGallery />
                </div>
            </div>

            {/* About Section */}
            <div id="about" className="w-full bg-[#1b1b18] py-16 lg:py-24">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <SectionHeader
                        pill="Our Story"
                        highlight="Dedicated"
                        title="to Capturing Joy"
                        subtitle="We believe every celebration deserves to be remembered."
                    />
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
                        <div>
                            <div className="space-y-4 leading-relaxed text-gray-300 sm:space-y-6">
                                <p>We believe every celebration deserves to be remembered. Our team brings passion, creativity, and state-of-the-art equipment to every event we serve.</p>
                                <p>From intimate weddings to grand corporate galas, we tailor our photobooth experiences to match your vision and exceed expectations.</p>
                            </div>
                            <a href="https://www.facebook.com/letssboothit" target="_blank" rel="noopener noreferrer" className="mr-4 text-gray-400 hover:text-gray-200">
                                <div className="group mt-6 inline-flex items-center text-sm uppercase tracking-wider text-amber-500 sm:mt-8">
                                    View More
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </div>
                            </a>
                        </div>
                        <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center lg:text-left">
                                    <p className="text-3xl font-medium text-white sm:text-4xl lg:text-5xl">{stat.value}</p>
                                    <p className="mt-2 text-xs uppercase tracking-wider text-gray-400 sm:text-sm">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Section */}
            <div id="contact" className="w-full bg-[#1b1b18] py-16 lg:py-24">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <SectionHeader
                        pill="Get In Touch"
                        highlight="Let's Create"
                        title="Something Unforgettable"
                        subtitle="Ready to make your event unforgettable? We'd love to hear from you."
                    />
                    <div className="flex justify-center">
                        <Button size="lg" className="uppercase">
                            <PhoneCall className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Contact Us Today
                        </Button>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-[#0a0a0a] py-12 text-[#EDEDEC] sm:py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-8 grid grid-cols-1 gap-8 sm:mb-12 sm:grid-cols-2 sm:gap-12 md:grid-cols-4">
                        <div className="md:col-span-2">
                            <h3 className="mb-3 text-xl font-medium tracking-[0.15em] uppercase sm:mb-4 sm:text-2xl">Let's Booth It</h3>
                            <p className="max-w-sm text-sm leading-relaxed text-[#EDEDEC]/70 sm:text-base">Where every click becomes a memory, and every pose is a celebration. Elevate your event with our photobooth, making moments unforgettable, one snapshot at a time!</p>
                        </div>
                        <div>
                            <h4 className="mb-4 text-xs tracking-[0.2em] text-[#EDEDEC]/50 uppercase sm:mb-6">Quick Links</h4>
                            <ul className="space-y-2 sm:space-y-3">
                                {[{ name: 'Services', href: '#services' }, { name: 'About', href: '#about' }, { name: 'Contact', href: '#contact' }].map((item) => (
                                    <li key={item.name}>
                                        <a href={item.href} onClick={(e) => handleSmoothScroll(e, item.href)} className="cursor-pointer text-sm text-[#EDEDEC]/70 transition-colors hover:text-[#EDEDEC]">{item.name}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="mb-4 text-xs tracking-[0.2em] text-[#fff0f5]/40 uppercase sm:mb-6">Find Us</h4>
                            <div className="flex gap-3 sm:gap-4">
                                {socials.map((s) => (
                                    <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                                        className="flex h-9 w-9 items-center justify-center rounded-sm border border-[#fff0f5]/20 transition-colors hover:border-[#f7b8d2] hover:text-[#f7b8d2] sm:h-10 sm:w-10"
                                        aria-label={s.label}>
                                        {s.label === 'Facebook' && (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.027 4.388 11.024 10.125 11.927v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796v8.437C19.612 23.097 24 18.1 24 12.073z" />
                                            </svg>
                                        )}
                                        {s.label === 'Instagram' && (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zM12 7a5 5 0 1 1 0 10A5 5 0 0 1 12 7zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.25-.75a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z" />
                                            </svg>
                                        )}
                                        {s.label === 'TikTok' && (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.78a4.85 4.85 0 0 1-1.01-.09z" />
                                            </svg>
                                        )}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-between gap-3 border-t border-[#EDEDEC]/20 pt-6 sm:gap-4 sm:pt-8 md:flex-row">
                        <p className="text-xs text-[#EDEDEC]/50">© {new Date().getFullYear()} Let's Booth It Photobooth. All rights reserved.</p>
                        <div className="flex gap-4 sm:gap-6">
                            <a href="#" onClick={(e) => e.preventDefault()} className="text-xs text-[#EDEDEC]/50 transition-colors hover:text-[#EDEDEC]">Privacy Policy</a>
                            <a href="#" onClick={(e) => e.preventDefault()} className="text-xs text-[#EDEDEC]/50 transition-colors hover:text-[#EDEDEC]">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </footer>
            <Toaster position="top-center" />
        </>
    );
}