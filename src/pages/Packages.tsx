import { PackagesSection } from '../components/packages-section';
import { Toaster } from '../components/ui/sonner';

export default function Packages() {
    return (
        <>
            <div className="min-h-screen bg-[#1b1b18]">
                <PackagesSection />
            </div>
            <Toaster position="top-center" />
        </>
    );
}