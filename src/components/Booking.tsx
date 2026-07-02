"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, CheckCircle2 } from "lucide-react";
import { addService } from "@/lib/garage";

const validEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

export default function Booking() {
    const [form, setForm] = useState({ name: "", email: "", phone: "", type: "Test Drive", car: "Ford GT", date: "" });
    const [error, setError] = useState("");
    const [done, setDone] = useState(false);

    const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        if (form.name.trim().length < 2) return setError("Please enter your name.");
        if (!validEmail(form.email)) return setError("Please enter a valid email.");
        if (!form.date) return setError("Please choose a date.");
        addService({ type: form.type, car: form.car, date: form.date });
        setDone(true);
    };

    const field = "w-full bg-black border border-white/10 text-white rounded-xl py-3.5 px-4 focus:outline-none focus:border-primary/50 transition-colors placeholder:text-gray-700";

    return (
        <section id="booking" className="py-24 md:py-32 bg-[#090909]/80 relative border-t border-white/5 overflow-hidden">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[600px] h-[300px] bg-primary/5 blur-[140px] pointer-events-none"></div>

            <div className="container mx-auto px-6 md:px-12 relative z-10 grid lg:grid-cols-2 gap-14 items-center">
                <div>
                    <span className="text-primary font-bold tracking-widest uppercase text-sm mb-3 block">Reserve Your Moment</span>
                    <h2 className="text-4xl md:text-5xl font-sans font-bold uppercase tracking-tight mb-6 leading-tight">Book a Test Drive<br />or Service</h2>
                    <p className="text-gray-400 leading-relaxed mb-8 max-w-md">
                        Pick a car, choose a time, and we&apos;ll handle the rest — including complimentary pickup. No dealership queue, no pressure.
                    </p>
                    <div className="flex items-center gap-3 text-sm text-gray-300">
                        <Calendar className="text-primary" size={20} />
                        Same-week availability across all locations.
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass rounded-3xl p-8 md:p-10"
                >
                    {done ? (
                        <div className="text-center py-10">
                            <CheckCircle2 className="text-primary mx-auto mb-4" size={48} />
                            <h3 className="text-2xl font-bold mb-2">You&apos;re booked!</h3>
                            <p className="text-gray-400 text-sm">Thanks {form.name.split(" ")[0]} — we&apos;ll confirm your {form.type.toLowerCase()} for the {form.car} shortly.</p>
                        </div>
                    ) : (
                        <form onSubmit={submit} className="space-y-4" noValidate>
                            {error && <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">{error}</p>}
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="b-name" className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 block">Full Name</label>
                                    <input id="b-name" className={field} placeholder="Jane Doe" value={form.name} onChange={(e) => update("name", e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="b-email" className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 block">Email</label>
                                    <input id="b-email" type="email" className={field} placeholder="you@email.com" value={form.email} onChange={(e) => update("email", e.target.value)} />
                                </div>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="b-type" className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 block">Type</label>
                                    <select id="b-type" className={field} value={form.type} onChange={(e) => update("type", e.target.value)}>
                                        <option>Test Drive</option>
                                        <option>Service Appointment</option>
                                        <option>Private Consultation</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="b-car" className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 block">Vehicle</label>
                                    <select id="b-car" className={field} value={form.car} onChange={(e) => update("car", e.target.value)}>
                                        <option>Ford GT</option>
                                        <option>Porsche 911</option>
                                        <option>Audi R8</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="b-date" className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 block">Preferred Date</label>
                                <input id="b-date" type="date" className={`${field} [color-scheme:dark]`} value={form.date} onChange={(e) => update("date", e.target.value)} />
                            </div>
                            <button type="submit" className="w-full bg-primary text-black font-bold uppercase tracking-widest text-xs py-4 rounded-xl hover:bg-white hover:shadow-[0_0_20px_rgba(230,255,0,0.4)] transition-all">
                                Confirm Booking
                            </button>
                        </form>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
