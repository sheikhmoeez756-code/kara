/** Kara speedometer emblem — echoes the preloader gauge. Inherits size/glow via className. */
export default function KaraLogo({ className = "" }: { className?: string }) {
    return (
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
            <defs>
                <linearGradient id="karaGold" x1="6" y1="6" x2="34" y2="34" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#F6FF8A" />
                    <stop offset="0.55" stopColor="#E6FF00" />
                    <stop offset="1" stopColor="#A9BE00" />
                </linearGradient>
            </defs>
            {/* gauge arc (3/4 ring, open at the bottom) */}
            <circle
                cx="20" cy="20" r="15"
                fill="none" stroke="url(#karaGold)" strokeWidth="4" strokeLinecap="round"
                strokeDasharray="70 100" transform="rotate(135 20 20)"
            />
            {/* needle */}
            <line x1="20" y1="20" x2="27.5" y2="12.5" stroke="url(#karaGold)" strokeWidth="3.2" strokeLinecap="round" />
            {/* hub */}
            <circle cx="20" cy="20" r="3.2" fill="url(#karaGold)" />
        </svg>
    );
}
