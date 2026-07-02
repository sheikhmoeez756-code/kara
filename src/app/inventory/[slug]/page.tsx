import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BadgeCheck, ShieldCheck, RotateCcw, ArrowLeft } from "lucide-react";
import SubNav from "@/components/SubNav";
import Footer from "@/components/Footer";
import CarGallery from "@/components/CarGallery";
import FinanceCalculator from "@/components/FinanceCalculator";
import SaveButton from "@/components/SaveButton";
import ReserveButton from "@/components/ReserveButton";
import { cars, getCar, money } from "@/lib/cars";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
    return cars.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
    const car = getCar(params.slug);
    if (!car) return { title: `Inventory — ${SITE.name}` };
    return {
        title: `${car.name} — ${SITE.name}`,
        description: car.description,
        openGraph: { title: `${car.name} — ${SITE.name}`, description: car.description, images: [car.image] },
    };
}

const specItems = (c: NonNullable<ReturnType<typeof getCar>>) => [
    { label: "Power", value: c.power },
    { label: "0–100 km/h", value: c.zeroTo60 },
    { label: "Top Speed", value: c.topSpeed },
    { label: "Engine", value: c.engine },
    { label: "Year", value: String(c.year) },
    { label: "Mileage", value: `${c.mileage.toLocaleString()} km` },
];

export default function CarDetailPage({ params }: { params: { slug: string } }) {
    const car = getCar(params.slug);
    if (!car) notFound();

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Car",
        name: car.name,
        brand: { "@type": "Brand", name: car.brand },
        vehicleModelDate: car.year,
        mileageFromOdometer: { "@type": "QuantitativeValue", value: car.mileage, unitCode: "KMT" },
        image: `${SITE.url}${car.image}`,
        description: car.description,
        offers: { "@type": "Offer", price: car.price, priceCurrency: "USD", availability: "https://schema.org/InStock" },
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <SubNav />
            <main className="min-h-screen bg-transparent relative z-10 pt-[68px]">
                <div className="container mx-auto px-6 md:px-12 py-10 md:py-16">
                    <Link href="/inventory" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-primary transition-colors mb-8">
                        <ArrowLeft size={15} /> Back to inventory
                    </Link>

                    <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-14">
                        {/* Left: gallery + description */}
                        <div>
                            <CarGallery images={car.gallery} name={car.name} />

                            <div className="mt-10">
                                <h2 className="text-lg font-bold uppercase tracking-wide mb-4">Overview</h2>
                                <p className="text-gray-400 leading-relaxed mb-6">{car.description}</p>
                                <ul className="grid sm:grid-cols-2 gap-3">
                                    {car.highlights.map((h) => (
                                        <li key={h} className="flex items-center gap-3 text-sm text-gray-300">
                                            <span className="text-primary">✓</span> {h}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Right: purchase panel */}
                        <div className="space-y-6">
                            <div>
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-[11px] uppercase tracking-widest text-primary mb-1">{car.brand} · {car.body} · {car.year}</p>
                                        <h1 className="text-3xl md:text-4xl font-sans font-bold tracking-tight">{car.name}</h1>
                                    </div>
                                    <SaveButton slug={car.slug} className="w-11 h-11 shrink-0" />
                                </div>
                                {car.certified && (
                                    <span className="inline-flex items-center gap-1.5 mt-4 text-primary text-xs font-bold uppercase tracking-widest">
                                        <BadgeCheck size={16} /> Kara Certified · 200-point inspection
                                    </span>
                                )}
                            </div>

                            <div className="glass rounded-3xl p-7">
                                <p className="text-[11px] uppercase tracking-widest text-gray-500 mb-1">Price</p>
                                <p className="text-4xl font-black text-primary mb-6">{money(car.price)}</p>
                                <ReserveButton slug={car.slug} name={car.name} price={car.price} />
                                <div className="grid grid-cols-2 gap-3 mt-5 text-[11px] text-gray-400">
                                    <span className="flex items-center gap-2"><ShieldCheck size={15} className="text-primary" /> 12-mo warranty</span>
                                    <span className="flex items-center gap-2"><RotateCcw size={15} className="text-primary" /> 7-day returns</span>
                                </div>
                            </div>

                            {/* Specs */}
                            <div className="grid grid-cols-2 gap-px bg-white/5 rounded-3xl overflow-hidden border border-white/5">
                                {specItems(car).map((s) => (
                                    <div key={s.label} className="bg-[#0c0c10] p-5">
                                        <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">{s.label}</p>
                                        <p className="font-bold">{s.value}</p>
                                    </div>
                                ))}
                            </div>

                            <FinanceCalculator price={car.price} />
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
