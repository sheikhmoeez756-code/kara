"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Banknote, Sparkles } from "lucide-react";

const validEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

export default function SellTradeIn() {
    const [form, setForm] = useState({ make: "", year: "", mileage: "", condition: "Excellent", email: "" });
    const [error, setError] = useState("");
    const [estimate, setEstimate] = useState<string | null>(null);

    const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        if (form.make.trim().length < 2) return setError("Please enter your car's make & model.");
        if (!/^\d{4}$/.test(form.year)) return setError("Please enter a valid 4-digit year.");
        if (!validEmail(form.email)) return setError("Please enter a valid email.");

        // Demo valuation: a light, deterministic estimate from the inputs.
        const base = 60000;
        const age = Math.max(0, 2025 - parseInt(form.year, 10));
        const condMult = { Excellent: 1, Good: 0.85, Fair: 0.7 }[form.condition] ?? 0.8;
        const low = Math.max(8000, Math.round((base - age * 3500) * condMult / 1000) * 1000);
        const high = Math.round(low * 1.18 / 1000) * 1000;
        setEstimate(`$${low.toLocaleString()} – $${high.toLocaleString()}`);
    };

    const field = "w-full bg-black border border-white/10 text-white rounded-xl py-3.5 px-4 focus:outline-none focus:border-primary/50 transition-colors placeholder:text-gray-700";

    return (
        <section id="sell" className="py-24 md:py-32 bg-[#050505]/80 relative border-t border-white/5 overflow-hidden">
            <div className="absolute right-1/4 bottom-0 w-[500px] h-[400px] bg-primary/5 blur-[150px] pointer-events-none rounded-full"></div>

            <div className="container mx-auto px-6 md:px-12 relative z-10 grid lg:grid-cols-2 gap-14 items-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass rounded-3xl p-8 md:p-10 order-2 lg:order-1"
                >
                    {estimate ? (
                        <div className="text-center py-8">
                            <Sparkles className="text-primary mx-auto mb-4" size={44} />
                            <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">Estimated Value</p>
                            <h3 className="text-3xl md:text-4xl font-bold text-primary mb-4">{estimate}</h3>
                            <p className="text-gray-400 text-sm mb-6">A specialist will email {form.email} with a firm offer within 24 hours.</p>
                            <button onClick={() => { setEstimate(null); }} className="text-xs font-bold uppercase tracking-widest border border-white/10 hover:border-white px-6 py-3 rounded-xl transition-colors">
                                Value another car
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={submit} className="space-y-4" noValidate>
                            {error && <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">{error}</p>}
                            <div>
                                <label htmlFor="s-make" className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 block">Make &amp; Model</label>
                                <input id="s-make" className={field} placeholder="e.g. Porsche 911 Turbo S" value={form.make} onChange={(e) => update("make", e.target.value)} />
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="s-year" className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 block">Year</label>
                                    <input id="s-year" inputMode="numeric" className={field} placeholder="2021" value={form.year} onChange={(e) => update("year", e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="s-mileage" className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 block">Mileage (km)</label>
                                    <input id="s-mileage" inputMode="numeric" className={field} placeholder="24,000" value={form.mileage} onChange={(e) => update("mileage", e.target.value)} />
                                </div>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="s-cond" className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 block">Condition</label>
                                    <select id="s-cond" className={field} value={form.condition} onChange={(e) => update("condition", e.target.value)}>
                                        <option>Excellent</option>
                                        <option>Good</option>
                                        <option>Fair</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="s-email" className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 block">Email</label>
                                    <input id="s-email" type="email" className={field} placeholder="you@email.com" value={form.email} onChange={(e) => update("email", e.target.value)} />
                                </div>
                            </div>
                            <button type="submit" className="w-full bg-primary text-black font-bold uppercase tracking-widest text-xs py-4 rounded-xl hover:bg-white hover:shadow-[0_0_20px_rgba(230,255,0,0.4)] transition-all">
                                Get Instant Valuation
                            </button>
                        </form>
                    )}
                </motion.div>

                <div className="order-1 lg:order-2">
                    <span className="text-primary font-bold tracking-widest uppercase text-sm mb-3 block">Sell / Trade-In</span>
                    <h2 className="text-4xl md:text-5xl font-sans font-bold uppercase tracking-tight mb-6 leading-tight">Your Car,<br />Instantly Valued</h2>
                    <p className="text-gray-400 leading-relaxed mb-8 max-w-md">
                        Skip the haggling. Tell us about your vehicle and get a transparent estimate in seconds — then a firm offer within 24 hours. We handle paperwork and collection.
                    </p>
                    <div className="flex items-center gap-3 text-sm text-gray-300">
                        <Banknote className="text-primary" size={22} />
                        Fast, fair payouts — trade in toward any car in our showroom.
                    </div>
                </div>
            </div>
        </section>
    );
}
