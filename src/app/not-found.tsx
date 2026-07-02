import Link from "next/link";
import KaraLogo from "@/components/KaraLogo";

export default function NotFound() {
    return (
        <main className="min-h-screen bg-transparent relative z-10 flex items-center justify-center px-6">
            <div className="text-center">
                <KaraLogo className="h-14 w-14 mx-auto mb-8 drop-shadow-[0_0_12px_rgba(230,255,0,0.5)]" />
                <p className="text-primary font-bold tracking-widest uppercase text-sm mb-3">Error 404</p>
                <h1 className="text-5xl md:text-7xl font-sans font-black uppercase tracking-tight mb-5">Off the Grid</h1>
                <p className="text-gray-400 max-w-md mx-auto mb-10">
                    This road doesn&apos;t lead anywhere. The page you&apos;re looking for may have been moved or never existed.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                    <Link href="/" className="bg-primary text-black font-bold uppercase tracking-widest text-xs px-8 py-4 rounded-xl hover:bg-white transition-all">
                        Back Home
                    </Link>
                    <Link href="/inventory" className="border border-white/15 text-white font-bold uppercase tracking-widest text-xs px-8 py-4 rounded-xl hover:border-white transition-all">
                        Browse Inventory
                    </Link>
                </div>
            </div>
        </main>
    );
}
