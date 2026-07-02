import { SITE } from "@/lib/site";
import KaraLogo from "./KaraLogo";

export default function Footer() {
    return (
        <footer className="bg-[#050505]/80 pt-24 pb-12 border-t border-white/5">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-20">

                    <div className="lg:col-span-4 space-y-8">
                        <a href="#home" className="flex items-center gap-3">
                            <KaraLogo className="h-9 w-9 drop-shadow-[0_0_8px_rgba(230,255,0,0.4)]" />
                            <span className="text-2xl font-sans font-bold tracking-wide">{SITE.name}</span>
                        </a>
                        <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
                            get the sensation of exploring the room with us and other fans
                        </p>
                        <div className="flex items-center gap-6 pt-4">
                            <a href="#" className="text-white hover:text-primary transition-colors font-bold text-xs uppercase tracking-widest">TW</a>
                            <a href="#" className="text-white hover:text-primary transition-colors font-bold text-xs uppercase tracking-widest">FB</a>
                            <a href="#" className="text-white hover:text-primary transition-colors font-bold text-xs uppercase tracking-widest">IG</a>
                        </div>
                    </div>

                    <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-10">
                        <div>
                            <h4 className="text-white font-sans font-medium text-lg mb-8">Pages</h4>
                            <ul className="space-y-4 text-xs tracking-wide text-gray-500">
                                <li><a href="#showroom" className="hover:text-primary hover:pl-2 transition-all block">Showroom</a></li>
                                <li><a href="/configure" className="hover:text-primary hover:pl-2 transition-all block">Configure</a></li>
                                <li><a href="#reviews" className="hover:text-primary hover:pl-2 transition-all block">Reviews</a></li>
                                <li><a href="#faq" className="hover:text-primary hover:pl-2 transition-all block">FAQ</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-sans font-medium text-lg mb-8">Info</h4>
                            <ul className="space-y-4 text-xs tracking-wide text-gray-500">
                                <li><a href="#faq" className="hover:text-primary hover:pl-2 transition-all block">Customer Service</a></li>
                                <li><a href="#reviews" className="hover:text-primary hover:pl-2 transition-all block">Testimonials</a></li>
                                <li><a href="#models" className="hover:text-primary hover:pl-2 transition-all block">Performance</a></li>
                                <li><a href="#home" className="hover:text-primary hover:pl-2 transition-all block">Top</a></li>
                            </ul>
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <h4 className="text-white font-sans font-medium text-lg mb-8">My Account</h4>
                            <ul className="space-y-4 text-xs tracking-wide text-gray-500">
                                <li><a href="/login" className="hover:text-primary hover:pl-2 transition-all block">Login</a></li>
                                <li><a href="/login" className="hover:text-primary hover:pl-2 transition-all block">My Account</a></li>
                            </ul>
                        </div>
                    </div>

                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-600 text-xs">&copy; 2026 {SITE.name} Motors. All rights reserved.</p>
                    <div className="flex items-center gap-6 text-xs text-gray-500">
                        <a href="/privacy" className="hover:text-primary transition-colors">Privacy</a>
                        <a href="/terms" className="hover:text-primary transition-colors">Terms</a>
                        <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
