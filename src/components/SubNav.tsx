import Link from "next/link";
import KaraLogo from "./KaraLogo";
import { SITE } from "@/lib/site";

export default function SubNav() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#090909]/90 backdrop-blur-md border-b border-white/5">
            <div className="container mx-auto px-6 md:px-12 h-[68px] flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2.5">
                    <KaraLogo className="h-8 w-8 drop-shadow-[0_0_8px_rgba(230,255,0,0.45)]" />
                    <span className="text-xl font-bold font-sans tracking-wide text-white">{SITE.name}</span>
                </Link>
                <nav className="flex items-center gap-6 md:gap-8 text-xs font-bold uppercase tracking-widest">
                    <Link href="/" className="text-gray-400 hover:text-white transition-colors hidden sm:block">Home</Link>
                    <Link href="/inventory" className="text-gray-400 hover:text-white transition-colors">Inventory</Link>
                    <Link href="/garage" className="text-gray-400 hover:text-white transition-colors">Garage</Link>
                    <Link href="/login" className="text-black bg-primary px-5 py-2.5 hover:bg-white transition-all">Login</Link>
                </nav>
            </div>
        </header>
    );
}
