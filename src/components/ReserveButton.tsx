"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, Lock, X, Truck } from "lucide-react";
import { addReservation, getSession } from "@/lib/garage";
import { money } from "@/lib/cars";
import { sounds } from "@/utils/sounds";

export default function ReserveButton({ slug, name, price }: { slug: string; name: string; price: number }) {
    const [mounted, setMounted] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [open, setOpen] = useState(false);
    const [reserved, setReserved] = useState(false);
    const [date, setDate] = useState("");
    const [address, setAddress] = useState("");
    const [error, setError] = useState("");

    const deposit = Math.round(price * 0.05);

    useEffect(() => {
        setMounted(true);
        setLoggedIn(!!getSession());
    }, []);

    const confirm = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        if (!date) return setError("Please choose a delivery date.");
        if (address.trim().length < 4) return setError("Please enter a delivery address.");
        addReservation(slug);
        sounds.playClick();
        setReserved(true);
        setOpen(false);
    };

    if (reserved) {
        return (
            <div className="space-y-3">
                <div className="flex items-center justify-center gap-2 bg-primary/10 border border-primary/40 text-primary rounded-xl py-4 text-sm font-bold uppercase tracking-widest">
                    <Check size={18} /> Reserved
                </div>
                <Link href="/garage" className="block text-center text-xs uppercase tracking-widest text-gray-400 hover:text-primary transition-colors">
                    View in your garage →
                </Link>
            </div>
        );
    }

    if (mounted && !loggedIn) {
        return (
            <Link href="/login" className="w-full flex items-center justify-center gap-2 bg-primary text-black font-bold uppercase tracking-widest text-sm py-4 rounded-xl hover:bg-white transition-all">
                <Lock size={16} /> Sign in to Reserve
            </Link>
        );
    }

    return (
        <>
            <button
                onClick={() => { setOpen(true); sounds.playClick(); }}
                className="w-full flex items-center justify-center gap-2 bg-primary text-black font-bold uppercase tracking-widest text-sm py-4 rounded-xl hover:bg-white hover:shadow-[0_0_25px_rgba(230,255,0,0.4)] transition-all"
            >
                <Lock size={16} /> Reserve — {money(deposit)} deposit
            </button>

            {open && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm" onClick={() => setOpen(false)}>
                    <form
                        onClick={(e) => e.stopPropagation()}
                        onSubmit={confirm}
                        className="w-full max-w-md bg-[#0f0f14] border border-white/10 rounded-3xl p-7 md:p-8 relative"
                    >
                        <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="absolute top-5 right-5 text-gray-500 hover:text-white">
                            <X size={20} />
                        </button>
                        <h3 className="text-xl font-bold mb-1">Reserve {name}</h3>
                        <p className="text-gray-500 text-sm mb-6">Secure it with a fully refundable deposit.</p>

                        <div className="flex items-center justify-between bg-primary/5 border border-primary/20 rounded-xl px-4 py-3 mb-6">
                            <span className="text-xs uppercase tracking-widest text-gray-400">Refundable deposit</span>
                            <span className="text-primary font-bold">{money(deposit)}</span>
                        </div>

                        {error && <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 mb-4">{error}</p>}

                        <label htmlFor="r-date" className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 block">Preferred delivery date</label>
                        <input id="r-date" type="date" value={date} onChange={(e) => setDate(e.target.value)}
                            className="w-full bg-black border border-white/10 text-white rounded-xl py-3 px-4 mb-4 focus:outline-none focus:border-primary/50 [color-scheme:dark]" />

                        <label htmlFor="r-addr" className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 block">Delivery address</label>
                        <textarea id="r-addr" rows={2} value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Street, city, postcode"
                            className="w-full bg-black border border-white/10 text-white rounded-xl py-3 px-4 mb-5 focus:outline-none focus:border-primary/50 placeholder:text-gray-700" />

                        <button type="submit" className="w-full bg-primary text-black font-bold uppercase tracking-widest text-sm py-4 rounded-xl hover:bg-white transition-all">
                            Confirm Reservation
                        </button>
                        <p className="flex items-center justify-center gap-2 text-[11px] text-gray-500 mt-4">
                            <Truck size={14} className="text-primary" /> Free delivery to your door
                        </p>
                    </form>
                </div>
            )}
        </>
    );
}
