import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { CalendarIcon, MapPin, RotateCcw, Search, Sparkles } from 'lucide-react';
import { useRef, useState } from 'react';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import { toast } from 'sonner';


// ─── Fix Leaflet default marker icons ────────────────────────────────────────
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom amber marker
const amberIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

// ─── NCR Bounds ───────────────────────────────────────────────────────────────
const NCR_CENTER: [number, number] = [14.5995, 120.9842];
const NCR_BOUNDS = L.latLngBounds(
    L.latLng(14.3500, 120.8500),
    L.latLng(14.7600, 121.1200),
);

// ─── Map Click Handler ────────────────────────────────────────────────────────
function MapClickHandler({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) {
    useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;
            // Restrict to NCR bounds
            if (NCR_BOUNDS.contains(e.latlng)) {
                onMapClick(lat, lng);
            }
        },
    });
    return null;
}

// ─── Reverse Geocode via Nominatim (free) ─────────────────────────────────────
async function reverseGeocode(lat: number, lng: number): Promise<string> {
    try {
        const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
            { headers: { 'Accept-Language': 'en' } },
        );
        const data = await res.json();
        return data.display_name || `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
    } catch {
        return `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
    }
}

// ─── Search via Nominatim (free) ──────────────────────────────────────────────
interface SearchResult {
    display_name: string;
    lat: string;
    lon: string;
}

async function searchPlaces(query: string): Promise<SearchResult[]> {
    try {
        const res = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query + ', Metro Manila, Philippines')}&format=json&limit=5&countrycodes=ph`,
            { headers: { 'Accept-Language': 'en' } },
        );
        return await res.json();
    } catch {
        return [];
    }
}

// ─── Map Picker Component ─────────────────────────────────────────────────────
interface MapPickerProps {
    onLocationSelect: (location: { address: string; lat: number; lng: number }) => void;
    selectedAddress: string;
}

function MapPicker({ onLocationSelect, selectedAddress }: MapPickerProps) {
    const [markerPos, setMarkerPos] = useState<[number, number] | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [searching, setSearching] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const mapRef = useRef<L.Map | null>(null);
    const searchTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    const handleMapClick = async (lat: number, lng: number) => {
        setMarkerPos([lat, lng]);
        const address = await reverseGeocode(lat, lng);
        onLocationSelect({ address, lat, lng });
    };

    const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setSearchQuery(val);
        clearTimeout(searchTimeout.current);
        if (val.length < 3) { setSearchResults([]); setShowResults(false); return; }
        searchTimeout.current = setTimeout(async () => {
            setSearching(true);
            const results = await searchPlaces(val);
            setSearchResults(results);
            setShowResults(true);
            setSearching(false);
        }, 500);
    };

    const handleResultSelect = (result: SearchResult) => {
        const lat = parseFloat(result.lat);
        const lng = parseFloat(result.lon);
        const pos: [number, number] = [lat, lng];
        setMarkerPos(pos);
        setSearchQuery(result.display_name);
        setShowResults(false);
        onLocationSelect({ address: result.display_name, lat, lng });
        mapRef.current?.setView(pos, 16);
    };

    const resetMap = () => {
        setMarkerPos(null);
        setSearchQuery('');
        setSearchResults([]);
        setShowResults(false);
        onLocationSelect({ address: '', lat: 0, lng: 0 });
        mapRef.current?.setView(NCR_CENTER, 12);
    };



    return (
        <div className="space-y-2">
            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchInput}
                    placeholder="Search venue or address in NCR..."
                    className="w-full rounded-md border border-input bg-background py-2 pl-9 pr-10 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    onFocus={() => searchResults.length > 0 && setShowResults(true)}
                />
                {(selectedAddress || searchQuery) && (
                    <button type="button" onClick={resetMap} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                        <RotateCcw className="h-4 w-4" />
                    </button>
                )}

                {/* Dropdown results */}
                {showResults && searchResults.length > 0 && (
                    <div className="absolute z-[9999] mt-1 w-full rounded-md border border-input bg-background shadow-lg">
                        {searching && (
                            <p className="px-3 py-2 text-xs text-muted-foreground">Searching...</p>
                        )}
                        {searchResults.map((result, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => handleResultSelect(result)}
                                className="flex w-full items-start gap-2 px-3 py-2 text-left text-sm hover:bg-amber-50 dark:hover:bg-amber-950/20"
                            >
                                <MapPin className="mt-0.5 h-3 w-3 shrink-0 text-amber-600" />
                                <span className="line-clamp-2 text-xs">{result.display_name}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Map */}
            <div className="relative overflow-hidden rounded-md border border-input">
                <MapContainer
                    center={NCR_CENTER}
                    zoom={12}
                    style={{ height: '210px', width: '100%' }}
                    maxBounds={NCR_BOUNDS}
                    maxBoundsViscosity={0.8}
                    ref={mapRef}
                    scrollWheelZoom={false}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MapClickHandler onMapClick={handleMapClick} />
                    {markerPos && (
                        <Marker
                            position={markerPos}
                            icon={amberIcon}
                            draggable
                            eventHandlers={{
                                dragend: async (e) => {
                                    const { lat, lng } = (e.target as L.Marker).getLatLng();
                                    if (NCR_BOUNDS.contains(L.latLng(lat, lng))) {
                                        setMarkerPos([lat, lng]);
                                        const address = await reverseGeocode(lat, lng);
                                        onLocationSelect({ address, lat, lng });
                                    }
                                },
                            }}
                        />
                    )}
                </MapContainer>
                <div className="absolute bottom-2 left-2 z-[999] rounded bg-background/90 px-2 py-1 text-xs text-muted-foreground">
                    NCR, Philippines only
                </div>
            </div>

            {/* Selected address */}
            {selectedAddress && (
                <div className="flex items-start gap-2 rounded-md bg-amber-50 p-2 text-xs text-amber-800 dark:bg-amber-950/30 dark:text-amber-400">
                    <MapPin className="mt-0.5 h-3 w-3 shrink-0" />
                    <span>{selectedAddress}</span>
                </div>
            )}

            <p className="text-xs text-muted-foreground">
                Search for a venue or click on the map to pin your event location.
            </p>
        </div>
    );
}

// ─── Selectable Card ──────────────────────────────────────────────────────────
function SelectableCard({
    value, label, description, details, selected, onSelect, icon,
}: {
    value: string; label: string; description: string; details: string;
    selected: boolean; onSelect: (v: string) => void; icon?: React.ReactNode;
}) {
    return (
        <button
            type="button"
            onClick={() => onSelect(value)}
            className={cn(
                'w-full rounded-md border p-3 text-left text-sm transition-all',
                selected
                    ? 'border-amber-600 bg-amber-50 dark:border-amber-400 dark:bg-amber-950/30'
                    : 'border-input bg-background hover:border-amber-400 hover:bg-amber-50/50 dark:hover:bg-amber-950/10',
            )}
        >
            <div className="flex items-center gap-2">
                {icon && <span className="text-amber-600 dark:text-amber-400">{icon}</span>}
                <div>
                    <p className={cn('font-medium', selected && 'text-amber-700 dark:text-amber-300')}>{label}</p>
                    <p className="text-xs text-muted-foreground">{description}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{details}</p>
                </div>
                {selected && <div className="ml-auto h-2 w-2 shrink-0 rounded-full bg-amber-600 dark:bg-amber-400" />}
            </div>
        </button>
    );
}

// ─── Main Dialog ──────────────────────────────────────────────────────────────
export default function BookingRequestDialog() {
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<Date>();
    const [time, setTime] = useState('10:00');

    const [data, setData] = useState({
        first_name: '',
        last_name: '',
        middle_initial: '',
        suffix: '',
        email: '',
        phone: '',
        event_date: '',
        event_location: '',
        event_location_lat: '',
        event_location_lng: '',
        booth_type: '',
        package: '',
        payment_method: '',
    });

    const PACKAGES = [
        { value: 'package_1', label: 'PACKAGE 1 – 4R Standee', description: '₱2,500 • Unlimited shots for 2 hrs • +₱1,200/succeeding hr', details: 'Classic 4R standee prints. Unlimited shots for 2 hours with an additional ₱1,200 per succeeding hour.' },
        { value: 'package_2', label: 'PACKAGE 2 – 4R Magnetic', description: '₱3,500 • Unlimited shots for 2 hrs • +₱1,700/succeeding hr', details: '4R magnetic prints. Unlimited shots for 2 hours with an additional ₱1,700 per succeeding hour.' },
        { value: 'package_3', label: 'PACKAGE 3 – 4R Strip Standee', description: '₱2,700 • Unlimited shots for 2 hrs • +₱1,200/succeeding hr', details: '4R strip standee or with dedication option. Unlimited shots for 2 hours with an additional ₱1,200 per succeeding hour.' },
        { value: 'package_4', label: 'PACKAGE 4 – Polaroid Standee', description: '₱4,500 • Unlimited shots for 2 hrs • +₱2,500/succeeding hr', details: 'Polaroid standee prints. Unlimited shots for 2 hours. +₱2,500/succeeding hour. Add ₱1,000 for magnetic option.' },
        { value: 'package_5', label: 'PACKAGE 5 – Keychain', description: '₱5,000 • Unlimited shots for 2 hrs • +₱2,500/succeeding hr', details: 'Keychain photo prints. Unlimited shots for 2 hours with an additional ₱2,500 per succeeding hour.' },
        { value: 'package_6', label: 'PACKAGE 6 – Mirror Booth', description: '₱10,000 • Unlimited shots for 3 hrs • +₱1,500/succeeding hr', details: 'Full-length interactive mirror booth. Unlimited shots for 3 hours with an additional ₱1,500 per succeeding hour.' },
        { value: 'package_7', label: 'PACKAGE 7 – 360° Video Booth', description: '₱10,000 • Unlimited shots for 3 hrs • +₱2,000/succeeding hr', details: 'Rotating 360° video experience. Unlimited shots for 3 hours with an additional ₱2,000 per succeeding hour.' },
        { value: 'package_8', label: 'PACKAGE 8 – High Angle', description: '₱10,000 • Unlimited shots for 3 hrs • +₱2,000/succeeding hr', details: 'High angle camera setup for a unique overhead perspective. Unlimited shots for 3 hours with an additional ₱2,000 per succeeding hour.' },
        { value: 'package_9', label: 'PACKAGE 9 – Magazine Booth', description: '₱10,000 • Unlimited shots for 3 hrs • +₱2,000/succeeding hr', details: 'Magazine-style photo booth experience. Unlimited shots for 3 hours with an additional ₱2,000 per succeeding hour.' },
        { value: 'package_10', label: 'PACKAGE 10 – Photoman', description: '₱5,000 • Unlimited shots for 2 hrs • +₱2,500/succeeding hr', details: 'Photoman roving booth. Unlimited shots for 2 hours. +₱2,500/succeeding hour. Add ₱2,000 for magnetic option.' },
    ];
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const updateData = (key: string, value: string) => {
        setData(prev => ({ ...prev, [key]: value }));
    };
    const updateEventDateTime = (d: Date | undefined, t: string) => {
        if (d) {
            const [hours, minutes] = t.split(':');
            const combined = new Date(d);
            combined.setHours(parseInt(hours), parseInt(minutes));
            updateData('event_date', combined.toISOString());
        }
    };

    const handleLocationSelect = (loc: { address: string; lat: number; lng: number }) => {
        setData(prev => ({
            ...prev,
            event_location: loc.address,
            event_location_lat: loc.lat ? String(loc.lat) : '',
            event_location_lng: loc.lng ? String(loc.lng) : '',
        }));
    };

    const submit = async () => {
        setProcessing(true);
        setErrors({});
        try {
            const res = await fetch('https://letsboothit.onrender.com/api/booking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                toast.success('Booking Submitted!', {
                    description: 'We have received your request and will be in touch shortly.',
                    duration: 5000,
                });
                setData({
                    first_name: '', last_name: '', middle_initial: '',
                    suffix: '', email: '', phone: '', event_date: '',
                    event_location: '', event_location_lat: '',
                    event_location_lng: '', booth_type: '',
                    package: '', payment_method: '',
                });
                setDate(undefined);
                setTime('10:00');
                setOpen(false);
            } else {
                const errs = await res.json();
                setErrors(errs.errors || {});
                toast.error('Something went wrong. Please try again.');
            }
        } catch {
            toast.error('Cannot connect to server. Please check if backend is running.');
        } finally {
            setProcessing(false);
        }
    };
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="lg" className="w-fit cursor-pointer uppercase transition-all hover:scale-105">
                    Book your event
                </Button>
            </DialogTrigger>

            <DialogContent
                onInteractOutside={(e) => e.preventDefault()}
                className="max-h-[90vh] overflow-y-auto sm:max-w-[560px]"
            >
                <DialogHeader>
                    <DialogTitle>Book Your Event</DialogTitle>
                    <DialogDescription>
                        Fill out the form below to request a booking. We'll send a confirmation link to your email.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-5">

                    {/* Personal Info */}
                    <div className="space-y-2">
                        <Label htmlFor="first_name">First Name <span className="text-destructive">*</span></Label>
                        <Input id="first_name" value={data.first_name} onChange={(e) => updateData('first_name', e.target.value)} className={errors.first_name ? 'border-destructive' : ''} />
                        {errors.first_name && <p className="text-sm text-destructive">{errors.first_name}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="last_name">Last Name <span className="text-destructive">*</span></Label>
                        <Input id="last_name" value={data.last_name} onChange={(e) => updateData('last_name', e.target.value)} className={errors.last_name ? 'border-destructive' : ''} />
                        {errors.last_name && <p className="text-sm text-destructive">{errors.last_name}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="middle_initial">Middle Initial</Label>
                            <Input id="middle_initial" value={data.middle_initial} onChange={(e) => updateData('middle_initial', e.target.value)} maxLength={5} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="suffix">Suffix</Label>
                            <Input id="suffix" value={data.suffix} onChange={(e) => updateData('suffix', e.target.value)} maxLength={10} placeholder="Jr., Sr., III" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email <span className="text-destructive">*</span></Label>
                        <Input id="email" type="email" value={data.email} onChange={(e) => updateData('email', e.target.value)} className={errors.email ? 'border-destructive' : ''} />
                        {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number <span className="text-xs text-muted-foreground"></span></Label>
                        <Input id="phone" type="tel" value={data.phone} onChange={(e) => updateData('phone', e.target.value)} maxLength={20} />
                    </div>

                    {/* Date & Time */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Event Date <span className="text-destructive">*</span></Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className={cn('w-full justify-start text-left font-normal', !date && 'text-muted-foreground', errors.event_date && 'border-destructive')}>
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date ? format(date, 'PP') : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar mode="single" selected={date} onSelect={(d) => { setDate(d); updateEventDateTime(d, time); }} disabled={(d) => d < tomorrow} initialFocus />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="event_time">Event Time <span className="text-destructive">*</span></Label>
                            <Input type="time" id="event_time" value={time} onChange={(e) => { setTime(e.target.value); updateEventDateTime(date, e.target.value); }} className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden" />
                        </div>
                    </div>
                    {errors.event_date && <p className="text-sm text-destructive">{errors.event_date}</p>}

                    {/* Package */}
                    <div className="space-y-2">
                        <Label>Packages <span className="text-destructive">*</span></Label>
                        <div className="space-y-2">
                            {PACKAGES.map((pkg) => (
                                <SelectableCard key={pkg.value} {...pkg} selected={data.package === pkg.value} onSelect={(v) => updateData('package', v)} icon={<Sparkles className="h-4 w-4" />} />
                            ))}
                        </div>
                    </div>

                    {/* Location */}
                    <div className="space-y-2">
                        <Label>Event Location <span className="text-destructive">*</span></Label>
                        <MapPicker onLocationSelect={handleLocationSelect} selectedAddress={data.event_location} />
                        {errors.event_location && <p className="text-sm text-destructive">{errors.event_location}</p>}
                    </div>

                    {/* Payment */}
                    <div className="space-y-2">
                        <Label htmlFor="payment_method">Payment Method <span className="text-destructive">*</span></Label>
                        <Select value={data.payment_method} onValueChange={(v) => updateData('payment_method', v)}>
                            <SelectTrigger className={errors.payment_method ? 'border-destructive' : ''}>
                                <SelectValue placeholder="Select payment method" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="cash">Cash</SelectItem>
                                <SelectItem value="credit_debit_card">Credit/Debit Card</SelectItem>
                                <SelectItem value="paymaya">PayMaya</SelectItem>
                                <SelectItem value="gcash">GCash</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.payment_method && <p className="text-sm text-destructive">{errors.payment_method}</p>}
                    </div>

                    {/* General error message for network/submission errors */}
                    {errors.submit && (
                        <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                            {errors.submit}
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-4">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={processing}>Cancel</Button>
                        <Button onClick={submit} disabled={processing}>
                            {processing ? 'Submitting...' : 'Submit Booking Request'}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}