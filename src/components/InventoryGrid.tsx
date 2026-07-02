"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import { cars, brands, money } from "@/lib/cars";
import SaveButton from "./SaveButton";

type Sort = "featured" | "price-asc" | "price-desc" | "newest";

export default function InventoryGrid() {
    const [brand, setBrand] = useState("All");
    const [sort, setSort] = useState<Sort>("featured");

    const list = useMemo(() => {
        let l = cars.filter((c) => brand === "All" || c.brand === brand);
        if (sort === "price-asc") l = [...l].sort((a, b) => a.price - b.price);
        if (sort === "price-desc") l = [...l].sort((a, b) => b.price - a.price);
        if (sort === "newest") l = [...l].sort((a, b) => b.year - a.year);
        return l;
    }, [brand, sort]);

    return (
        <div>
            {/* Filter bar */}
            <div className="flex flex-wrap items-center gap-3 mb-10">
                <button
                    onClick={() => setBrand("All")}
                    className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${brand === "All" ? 'bg-primary text-black' : 'bg-white/5 text-gray-400 hover:text-white'}`}
                >
                    All ({cars.length})
                </button>
                {brands.map((b) => (
                    <button
                        key={b}
                        onClick={() => setBrand(b)}
                        className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${brand === b ? 'bg-primary text-black' : 'bg-white/5 text-gray-400 hover:text-white'}`}
                    >
                        {b}
                    </button>
                ))}
                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as Sort)}
                    className="ml-auto bg-black border border-white/10 text-white text-xs uppercase tracking-widest rounded-full px-4 py-2.5 focus:outline-none focus:border-primary/50"
                >
                    <option value="featured">Featured</option>
                    <option value="price-asc">Price: Low → High</option>
                    <option value="price-desc">Price: High → Low</option>
                    <option value="newest">Newest</option>
                </select>
            </div>

            {/* Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {list.map((car, i) => (
                    <motion.div
                        key={car.slug}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.05 }}
                    >
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
        </div>
    );
}
