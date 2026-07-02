"use client";
import { useState } from "react";
import Link from "next/link";
import { Check, Lock } from "lucide-react";
import { addReservation } from "@/lib/garage";
import { sounds } from "@/utils/sounds";

export default function ReserveButton({ slug }: { slug: string; name: string }) {
    const [reserved, setReserved] = useState(false);

    const onClick = () => {
        addReservation(slug);
        sounds.playClick();
        setReserved(true);
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

    return (
        <button
            onClick={onClick}
            className="w-full flex items-center justify-center gap-2 bg-primary text-black font-bold uppercase tracking-widest text-sm py-4 rounded-xl hover:bg-white hover:shadow-[0_0_25px_rgba(230,255,0,0.4)] transition-all"
        >
            <Lock size={16} /> Reserve — Refundable Deposit
        </button>
    );
}
