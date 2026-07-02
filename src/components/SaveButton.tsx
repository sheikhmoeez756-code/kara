"use client";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { isSaved, toggleSaved } from "@/lib/garage";

export default function SaveButton({ slug, className = "" }: { slug: string; className?: string }) {
    const [saved, setSaved] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        setSaved(isSaved(slug));
    }, [slug]);

    const onClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const next = toggleSaved(slug);
        setSaved(next.includes(slug));
    };

    return (
        <button
            onClick={onClick}
            aria-label={saved ? "Remove from saved" : "Save car"}
            aria-pressed={mounted ? saved : undefined}
            className={`flex items-center justify-center rounded-full transition-all ${saved ? 'bg-primary text-black' : 'bg-black/50 text-white hover:bg-black/70 border border-white/10'} ${className}`}
        >
            <Heart size={18} fill={saved ? "currentColor" : "none"} />
        </button>
    );
}
