"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Testimonials() {
    const [activeTestimonial, setActiveTestimonial] = useState(2);

    const testimonials = [
        { name: "John Doe", avatar: "https://i.pravatar.cc/150?img=11", text: "The team at Kara made my dream car purchase a reality. Unbelievable service from start to finish." },
        { name: "Sara Smith", avatar: "https://i.pravatar.cc/150?img=5", text: "I bring my Ferrari here for every service. Extremely detail-oriented and trustworthy mechanics." },
        { name: "ESMERALDA", avatar: "https://i.pravatar.cc/150?img=44", text: "I really like shopping at Kars, without having to go to the store, it's easy, fast and practical, five stars for you." },
        { name: "Mike Tyson", avatar: "https://i.pravatar.cc/150?img=8", text: "The collection of rare vehicles here is unmatched. Professionalism at its peak." },
        { name: "Elena Volkov", avatar: "https://i.pravatar.cc/150?img=33", text: "Flawless delivery and transparent pricing. I won't go anywhere else for luxury vehicles." }
    ];

    return (
        <section id="reviews" className="py-32 bg-[#090909]/80">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-sans font-bold uppercase tracking-tight max-w-xs leading-[1.1]"
                    >
                        What They Say
                    </motion.h2>

                    <div className="flex flex-col items-start md:items-end gap-6 text-left md:text-right">
                        <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
                            We have many customers and are very satisfied with our sales and our car repairs, so don&apos;t stop by our shop
                        </p>
                        <a href="#" className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors group">
                            Show More
                            <span className="text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-lg">↗</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Avatar Slider */}
            <div className="w-full bg-[#111] py-14 border-y border-white/5 overflow-hidden flex flex-wrap justify-center items-center gap-6 md:gap-16 px-4">
                {testimonials.map((t, i) => {
                    const isActive = i === activeTestimonial;
                    return (
                        <motion.button
                            key={t.name}
                            onClick={() => setActiveTestimonial(i)}
                            className={`relative rounded-full overflow-hidden transition-all duration-500 ${isActive ? 'w-24 h-24 ring-2 ring-primary ring-offset-4 ring-offset-[#111] shadow-[0_0_30px_rgba(230,255,0,0.4)] z-10' : 'w-16 h-16 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 hover:scale-110'}`}
                            whileHover={isActive ? {} : { scale: 1.1 }}
                        >
                            <Image src={t.avatar} alt={t.name} fill sizes="96px" className="object-cover" />
                        </motion.button>
                    );
                })}
            </div>

            <div className="container mx-auto px-6 md:px-12 py-24 text-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTestimonial}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-4xl mx-auto flex flex-col items-center"
                    >
                        <span className="text-sm font-bold tracking-[0.2em] text-gray-500 uppercase mb-8">
                            {testimonials[activeTestimonial].name}
                        </span>
                        <p className="text-3xl md:text-4xl lg:text-5xl font-sans leading-snug text-white">
                            <span className="text-white/60">&ldquo;</span>
                            {testimonials[activeTestimonial].text}
                            <span className="text-white/60">&rdquo;</span>
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
