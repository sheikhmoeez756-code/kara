"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BadgeCheck, Search } from "lucide-react";
import { cars, brands, bodies, money } from "@/lib/cars";
import SaveButton from "./SaveButton";

type Sort = "featured" | "price-asc" | "price-desc" | "newest";

const priceCeiling = Math.max(...cars.map((c) => c.price));

export default function InventoryGrid() {
    const [query, setQuery] = useState("");
    const [brand, setBrand] = useState("All");
    const [body, setBody] = useState("All");
    const [maxPrice, setMaxPrice] = useState(priceCeiling);
    const [sort, setSort] = useState<Sort>("featured");

    const list = useMemo(() => {
        let l = cars.filter((c) => {
            const q = query.trim().toLowerCase();
            const matchQ = !q || `${c.name} ${c.brand}`.toLowerCase().includes(q);
            const matchBrand = brand === "All" || c.brand === brand;
            const matchBody = body === "All" || c.body === body;
            const matchPrice = c.price <= maxPrice;
            return matchQ && matchBrand && matchBody && matchPrice;
        });
        if (sort === "price-asc") l = [...l].sort((a, b) => a.price - b.price);
        if (sort === "price-desc") l = [...l].sort((a, b) => b.price - a.price);
        if (sort === "newest") l = [...l].sort((a, b) => b.year - a.year);
        return l;
    }, [query, brand, body, maxPrice, sort]);

    const pill = (active: boolean) =>
        `px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${active ? 'bg-primary text-black' : 'bg-white/5 text-gray-400 hover:text-white'}`;

    return (
        <div>
            {/* Search + sort */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-grow">
                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search by name or brand…"
                        className="w-full bg-black border border-white/10 text-white rounded-full py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-primary/50 placeholder:text-gray-700"
                    />
                </div>
                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as Sort)}
                    className="bg-black border border-white/10 text-white text-xs uppercase tracking-widest rounded-full px-4 py-3 focus:outline-none focus:border-primary/50"
                >
                    <option value="featured">Featured</option>
                    <option value="price-asc">Price: Low → High</option>
                    <option value="price-desc">Price: High → Low</option>
                    <option value="newest">Newest</option>
                </select>
            </div>

            {/* Filter rows */}
            <div className="space-y-4 mb-8">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] uppercase tracking-widest text-gray-600 mr-1">Brand</span>
                    <button onClick={() => setBrand("All")} className={pill(brand === "All")}>All</button>
                    {brands.map((b) => <button key={b} onClick={() => setBrand(b)} className={pill(brand === b)}>{b}</button>)}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] uppercase tracking-widest text-gray-600 mr-1">Type</span>
                    <button onClick={() => setBody("All")} className={pill(body === "All")}>All</button>
                    {bodies.map((b) => <button key={b} onClick={() => setBody(b)} className={pill(body === b)}>{b}</button>)}
                </div>
                <div className="flex items-center gap-4 max-w-md">
                    <span className="text-[10px] uppercase tracking-widest text-gray-600 whitespace-nowrap">Max price</span>
                    <input type="range" min={100000} max={priceCeiling} step={5000} value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))} className="flex-grow accent-primary" />
                    <span className="text-primary font-bold text-sm whitespace-nowrap">{money(maxPrice)}</span>
                </div>
            </div>

            <p className="text-xs uppercase tracking-widest text-gray-500 mb-8">{list.length} car{list.length !== 1 ? "s" : ""} available</p>

            {list.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl">
                    <p className="text-gray-400 mb-4">No cars match your filters.</p>
                    <button onClick={() => { setQuery(""); setBrand("All"); setBody("All"); setMaxPrice(priceCeiling); }}
                        className="text-primary text-xs font-bold uppercase tracking-widest hover:underline">Reset filters</button>
                </div>
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {list.map((car, i) => (
                        <motion.div key={car.slug} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.3) }}>
                            <Link href={`/inventory/${car.slug}`} className="group block rounded-3xl overflow-hidden border border-white/5 bg-white/[0.02] hover:border-primary/40 transition-all duration-300">
                                <div className="relative aspect-[16/10] overflow-hidden">
                                    <Image src={car.image} alt={car.name} fill sizes="(max-width:1024px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                    {car.certified && (
                                        <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1 bg-black/70 backdrop-blur text-primary text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/10">
                                            <BadgeCheck size={13} /> Certified
                                        </span>
                                    )}
                                    <SaveButton slug={car.slug} className="absolute top-3 right-3 z-10 w-9 h-9" />
                                </div>
                                <div className="p-6">
                                    <p className="text-[10px] uppercase tracking-widest text-primary mb-1">{car.brand} · {car.year}</p>
                                    <h3 className="text-lg font-bold mb-3">{car.name}</h3>
                                    <div className="flex gap-4 text-[11px] text-gray-500 uppercase tracking-wide mb-4">
                                        <span>{car.power}</span>
                                        <span>0–100 {car.zeroTo60}</span>
                                        <span>{car.mileage.toLocaleString()} km</span>
                                    </div>
                                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                        <span className="text-xl font-bold text-primary">{money(car.price)}</span>
                                        <span className="text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-primary transition-colors">View →</span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
