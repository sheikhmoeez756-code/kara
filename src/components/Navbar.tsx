"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { sounds } from "@/utils/sounds";
import { SITE } from "@/lib/site";

const links = [
    { label: "Home", href: "#home" },
    { label: "Showroom", href: "#showroom" },
    { label: "Performance", href: "#models" },
    { label: "Reviews", href: "#reviews" },
    { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll while the mobile menu is open.
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/5 ${scrolled || open ? 'bg-[#090909]/95 backdrop-blur-md py-4' : 'bg-transparent py-8'}`}
        >
            <div className="container mx-auto px-6 md:px-12 flex items-center justify-between gap-16">
                <div className="flex items-center gap-16">
                    <a href="#home" className="flex items-center gap-3" onClick={() => setOpen(false)}>
                        <div className="text-xl font-bold font-sans tracking-wide text-white">{SITE.name}</div>
                    </a>

                    <div className="hidden md:flex items-center gap-10 font-sans text-xs tracking-widest text-gray-500">
                        {links.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                onMouseEnter={() => sounds.playHover()}
                                onClick={() => sounds.playClick()}
                                className="text-white hover:text-primary transition-colors uppercase"
                            >
                                {item.label}
                            </a>
                        ))}
                        <a
                            href="/configure"
                            onMouseEnter={() => sounds.playHover()}
                            onClick={() => sounds.playClick()}
                            className="text-primary hover:text-white transition-colors uppercase font-bold"
                        >
                            Configure
                        </a>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <a href="/login" className="hidden md:block text-xs font-bold tracking-widest uppercase text-black bg-primary px-6 py-2.5 hover:bg-white hover:shadow-[0_0_15px_rgba(230,255,0,0.6)] transition-all">
                        Login
                    </a>

                    {/* Mobile toggle */}
                    <button
                        className="md:hidden text-white p-1"
                        aria-label={open ? "Close menu" : "Open menu"}
                        aria-expanded={open}
                        onClick={() => { setOpen((o) => !o); sounds.playClick(); }}
                    >
                        {open ? <X size={26} /> : <Menu size={26} />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="md:hidden overflow-hidden border-t border-white/5 bg-[#090909]/98 backdrop-blur-md"
                    >
                        <div className="container mx-auto px-6 py-6 flex flex-col gap-1">
                            {links.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    onClick={() => { setOpen(false); sounds.playClick(); }}
                                    className="text-white/80 hover:text-primary transition-colors uppercase text-sm tracking-widest py-3 border-b border-white/5"
                                >
                                    {item.label}
                                </a>
                            ))}
                            <a
                                href="/configure"
                                onClick={() => { setOpen(false); sounds.playClick(); }}
                                className="text-primary hover:text-white transition-colors uppercase text-sm font-bold tracking-widest py-3 border-b border-white/5"
                            >
                                Configure
                            </a>
                            <a
                                href="/login"
                                onClick={() => setOpen(false)}
                                className="mt-4 text-center text-xs font-bold tracking-widest uppercase text-black bg-primary px-6 py-3.5 hover:bg-white transition-all"
                            >
                                Login
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
