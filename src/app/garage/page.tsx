"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Heart, Package, Wrench, LogOut, ArrowRight } from "lucide-react";
import SubNav from "@/components/SubNav";
import Footer from "@/components/Footer";
import { getCar, money } from "@/lib/cars";
import { getSession, getSaved, getReservations, removeReservation, toggleSaved } from "@/lib/garage";

export default function GaragePage() {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [email, setEmail] = useState<string | null>(null);
    const [saved, setSaved] = useState<string[]>([]);
    const [reserved, setReserved] = useState<string[]>([]);

    const refresh = () => {
        setSaved(getSaved());
        setReserved(getReservations().map((r) => r.slug));
    };

    useEffect(() => {
        setMounted(true);
        const s = getSession();
        setEmail(s?.email ?? null);
        refresh();
    }, []);

    const logout = () => {
        localStorage.removeItem("kara_session");
        router.push("/login");
    };

    if (!mounted) return <main className="min-h-screen bg-transparent" />;

    if (!email) {
        return (
            <>
                <SubNav />
                <main className="min-h-screen bg-transparent relative z-10 pt-[68px] flex items-center justify-center">
                    <div className="text-center px-6">
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
                            <Package size={30} />
                        </div>
                        <h1 className="text-3xl font-bold mb-3">Your Garage</h1>
                        <p className="text-gray-400 mb-8 max-w-sm">Sign in to see your saved cars, reservations, and service history.</p>
                        <Link href="/login" className="inline-flex items-center gap-2 bg-primary text-black font-bold uppercase tracking-widest text-xs px-8 py-4 rounded-xl hover:bg-white transition-all">
                            Sign In <ArrowRight size={16} />
                        </Link>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    const savedCars = saved.map(getCar).filter(Boolean);
    const reservedCars = reserved.map(getCar).filter(Boolean);

    const CarRow = ({ slug, action }: { slug: string; action: React.ReactNode }) => {
        const car = getCar(slug);
        if (!car) return null;
        return (
            <div className="flex items-center gap-4 p-4 rounded-2xl border border-white/5 bg-white/[0.02]">
                <Link href={`/inventory/${car.slug}`} className="relative w-24 h-16 rounded-xl overflow-hidden shrink-0">
                    <Image src={car.image} alt={car.name} fill sizes="96px" className="object-cover" />
                </Link>
                <div className="flex-grow min-w-0">
                    <Link href={`/inventory/${car.slug}`} className="font-bold hover:text-primary transition-colors block truncate">{car.name}</Link>
                    <p className="text-primary text-sm font-semibold">{money(car.price)}</p>
                </div>
                {action}
            </div>
        );
    };

    return (
        <>
            <SubNav />
            <main className="min-h-screen bg-transparent relative z-10 pt-[68px]">
                <div className="container mx-auto px-6 md:px-12 py-12 md:py-16 max-w-4xl">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">Your Garage</span>
                            <h1 className="text-3xl md:text-4xl font-bold">Welcome back</h1>
                            <p className="text-gray-500 text-sm mt-1">{email}</p>
                        </div>
                        <button onClick={logout} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-primary transition-colors">
                            <LogOut size={16} /> <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>

                    {/* Reservations */}
                    <section className="mb-12">
                        <h2 className="flex items-center gap-2 text-lg font-bold uppercase tracking-wide mb-5"><Package size={18} className="text-primary" /> Reservations</h2>
                        {reservedCars.length === 0 ? (
                            <p className="text-gray-500 text-sm p-6 rounded-2xl border border-dashed border-white/10">No reservations yet. <Link href="/inventory" className="text-primary hover:underline">Browse the inventory →</Link></p>
                        ) : (
                            <div className="space-y-3">
                                {reserved.map((slug) => (
                                    <CarRow key={slug} slug={slug} action={
                                        <button onClick={() => { removeReservation(slug); refresh(); }} className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-red-400 transition-colors">Cancel</button>
                                    } />
                                ))}
                            </div>
                        )}
                    </section>

                    {/* Saved */}
                    <section className="mb-12">
                        <h2 className="flex items-center gap-2 text-lg font-bold uppercase tracking-wide mb-5"><Heart size={18} className="text-primary" /> Saved Cars</h2>
                        {savedCars.length === 0 ? (
                            <p className="text-gray-500 text-sm p-6 rounded-2xl border border-dashed border-white/10">Nothing saved yet. Tap the heart on any car to save it here.</p>
                        ) : (
                            <div className="space-y-3">
                                {saved.map((slug) => (
                                    <CarRow key={slug} slug={slug} action={
                                        <button onClick={() => { toggleSaved(slug); refresh(); }} className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-red-400 transition-colors">Remove</button>
                                    } />
                                ))}
                            </div>
                        )}
                    </section>

                    {/* Service history */}
                    <section>
                        <h2 className="flex items-center gap-2 text-lg font-bold uppercase tracking-wide mb-5"><Wrench size={18} className="text-primary" /> Service History</h2>
                        <p className="text-gray-500 text-sm p-6 rounded-2xl border border-dashed border-white/10">
                            No service records yet. <Link href="/#booking" className="text-primary hover:underline">Book a service →</Link> and we&apos;ll collect your car from your door.
                        </p>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
}
