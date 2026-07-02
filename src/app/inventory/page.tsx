import type { Metadata } from "next";
import SubNav from "@/components/SubNav";
import Footer from "@/components/Footer";
import InventoryGrid from "@/components/InventoryGrid";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
    title: `Inventory — ${SITE.name}`,
    description: "Browse Kara's curated collection of rare and luxury cars, available to reserve and deliver.",
};

export default function InventoryPage() {
    return (
        <>
            <SubNav />
            <main className="min-h-screen bg-transparent relative z-10 pt-[68px]">
                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-6 md:px-12">
                        <div className="max-w-2xl mb-12">
                            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-3 block">The Collection</span>
                            <h1 className="text-4xl md:text-6xl font-sans font-bold uppercase tracking-tight mb-4">Inventory</h1>
                            <p className="text-gray-400 leading-relaxed">
                                Every car is inspected, certified, and ready to be delivered to your door. Reserve online in minutes.
                            </p>
                        </div>
                        <InventoryGrid />
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
