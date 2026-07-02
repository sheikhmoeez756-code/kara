"use client";
import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { sounds } from "@/utils/sounds";

export default function SoundToggle() {
    const [mounted, setMounted] = useState(false);
    const [muted, setMuted] = useState(false);

    useEffect(() => {
        setMounted(true);
        setMuted(sounds.isMuted());
    }, []);

    const toggle = () => {
        const next = !muted;
        sounds.setMuted(next);
        setMuted(next);
        if (!next) sounds.playClick();
    };

    if (!mounted) return null;

    return (
        <button
            onClick={toggle}
            aria-label={muted ? "Unmute sounds" : "Mute sounds"}
            className="fixed bottom-6 left-6 z-[60] w-11 h-11 rounded-full bg-[#0f0f14]/80 backdrop-blur border border-white/10 text-gray-300 hover:text-primary hover:border-primary/40 transition-all flex items-center justify-center"
        >
            {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
    );
}
