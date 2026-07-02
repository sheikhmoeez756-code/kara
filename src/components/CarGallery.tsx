"use client";
import { useState } from "react";
import Image from "next/image";

export default function CarGallery({ images, name }: { images: string[]; name: string }) {
    const [active, setActive] = useState(0);

    return (
        <div>
            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden border border-white/5 mb-4">
                <Image src={images[active]} alt={name} fill priority sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" />
            </div>
            {images.length > 1 && (
                <div className="grid grid-cols-3 gap-4">
                    {images.map((img, i) => (
                        <button
                            key={img + i}
                            onClick={() => setActive(i)}
                            className={`relative aspect-[16/10] rounded-xl overflow-hidden border transition-all ${active === i ? 'border-primary' : 'border-white/5 opacity-60 hover:opacity-100'}`}
                            aria-label={`View image ${i + 1}`}
                        >
                            <Image src={img} alt="" fill sizes="20vw" className="object-cover" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
