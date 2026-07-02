"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { cars } from "@/lib/cars";
import FinanceCalculator from "./FinanceCalculator";

export default function Financing() {
    const [slug, setSlug] = useState(cars[0].slug);
    const car = cars.find((c) => c.slug === slug) ?? cars[0];

    return (
        <section id="financing" className="py-24 md:py-32 bg-[#090909]/80 relative border-t border-white/5 overflow-hidden">
            <div className="absolute right-0 bottom-0 w-[500px] h-[400px] bg-primary/5 blur-[150px] rounded-full pointer-events-none"></div>

            <div className="container mx-auto px-6 md:px-12 relative z-10 grid lg:grid-cols-2 gap-14 items-center">
                <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                    <span className="text-primary font-bold tracking-widest uppercase text-sm mb-3 block">Flexible Finance</span>
                    <h2 className="text-4xl md:text-5xl font-sans font-bold uppercase tracking-tight mb-6 leading-tight">Drive It<br />From / Month</h2>
                    <p className="text-gray-400 leading-relaxed mb-8 max-w-md">
                        Tailor a plan in seconds — adjust your deposit, term, and trade-in to see a live monthly estimate. Transparent rates, no hidden fees.
                    </p>
                    <label htmlFor="fin-car" className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 block">Choose a car</label>
                    <select
                        id="fin-car"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        className="w-full max-w-sm bg-black border border-white/10 text-white rounded-xl py-3.5 px-4 focus:outline-none focus:border-primary/50"
                    >
                        {cars.map((c) => (
                            <option key={c.slug} value={c.slug}>{c.name}</option>
                        ))}
                    </select>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                    <FinanceCalculator key={car.slug} price={car.price} />
                </motion.div>
            </div>
        </section>
    );
}
