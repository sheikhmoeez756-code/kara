"use client";
import { motion } from "framer-motion";

export default function BrandsBar() {
    const brands = [
        {
            name: "JMG",
            logo: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                    <path d="M4 12V4h6v2H6v12h4v-6H8v-2h4v10H4v-8zm10-8h6v2h-4v4h3v2h-3v4h4v2h-6V4z" />
                </svg>
            )
        },
        {
            name: "TESLA",
            logo: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full scale-[1.2]">
                    <path d="M12 2.25c-5.5 0-10.5 1.5-12 3.5v2.5c2-1.5 6-3 12-3s10 1.5 12 3v-2.5c-1.5-2-6.5-3.5-12-3.5zm-1.5 5.5v14h3v-14h-3z" />
                </svg>
            )
        },
        {
            name: "FERRARI",
            logo: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M12 8c-1.5 0-2 .5-2 2s1 2 2 2 2-.5 2-2-1-2-2-2z" fill="currentColor" />
                </svg>
            )
        },
        {
            name: "MITSUBISHI",
            logo: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full scale-110">
                    <path d="M12 2L8 8.5L12 15L16 8.5L12 2Z" />
                    <path d="M7 10L3 17L11 17L11 10L7 10Z" />
                    <path d="M17 10L13 10L13 17L21 17L17 10Z" />
                </svg>
            )
        },
        {
            name: "ARIEL",
            logo: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                    <path d="M12 2L4 22h3l2-5h6l2 5h3L12 2zm-2 12l2-5 2 5h-4z" />
                </svg>
            )
        }
    ];

    return (
        <section className="w-full py-16 bg-transparent relative z-20">
            <div className="container mx-auto px-6">
                <div className="flex flex-wrap justify-between items-center gap-8 opacity-60">
                    {brands.map((brand, i) => (
                        <motion.div
                            key={brand.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="flex flex-col items-center gap-4 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer text-gray-500 hover:text-white"
                        >
                            <div className="h-10 w-10 md:h-12 md:w-12 flex items-center justify-center transition-colors">
                                {brand.logo}
                            </div>
                            <span className="text-[10px] tracking-[0.2em]">{brand.name}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
