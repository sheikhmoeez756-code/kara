"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { sounds } from "@/utils/sounds";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/5 ${scrolled ? 'bg-[#090909]/95 backdrop-blur-md py-4' : 'bg-transparent py-8'}`}
        >
            <div className="container mx-auto px-6 md:px-12 flex items-center justify-between gap-16">
                <div className="flex items-center gap-16">
                    <a href="/" className="flex items-center gap-3">
                        <div className="text-xl font-bold font-sans tracking-wide text-white">Kara</div>
                    </a>

                    <div className="hidden md:flex items-center gap-10 font-sans text-xs tracking-widest text-gray-500">
                        {["Showroom", "Repair", "Service"].map((item) => (
                            <a
                                key={item}
                                href={`/#${item.toLowerCase()}`}
                                onMouseEnter={() => sounds.playHover()}
                                onClick={() => sounds.playClick()}
                                className="text-white hover:text-primary transition-colors uppercase"
                            >
                                {item}
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

                <div>
                    <a href="/login" className="hidden md:block text-xs font-bold tracking-widest uppercase text-black bg-primary px-6 py-2.5 hover:bg-white hover:shadow-[0_0_15px_rgba(230,255,0,0.6)] transition-all">
                        Login
                    </a>
                </div>
            </div>
        </motion.nav>
    );
}
