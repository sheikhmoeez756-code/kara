import type { Metadata } from "next";
import SubNav from "@/components/SubNav";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: `Terms of Service — ${SITE.name}` };

const sections = [
    { h: "Acceptance of Terms", p: "By accessing or using Kara, you agree to these terms. If you do not agree, please do not use the service." },
    { h: "Use of the Service", p: "Kara provides a digital platform to browse, reserve, service, and sell luxury vehicles. You agree to use it lawfully and to provide accurate information." },
    { h: "Reservations & Deposits", p: "Reserving a vehicle places a hold using a fully refundable deposit. A reservation is not a binding sale; final purchase is subject to inspection, documentation, and availability." },
    { h: "Vehicle Information", p: "We take care to describe every vehicle accurately, including inspection and history details. Specifications are provided in good faith and should be confirmed prior to purchase." },
    { h: "Pricing", p: "Prices and finance estimates are shown for guidance. Finance figures are representative and subject to status and approval. Final pricing is confirmed at purchase." },
    { h: "Limitation of Liability", p: "This is a demonstration build provided as-is, without warranties of any kind. Kara is not liable for any loss arising from use of this demo." },
    { h: "Governing Law", p: "These terms are governed by the laws of the jurisdiction in which Kara operates." },
    { h: "Contact", p: "For any questions about these terms, contact concierge@kara.com." },
];

export default function TermsPage() {
    return (
        <>
            <SubNav />
            <main className="min-h-screen bg-transparent relative z-10 pt-[68px]">
                <div className="container mx-auto px-6 md:px-12 py-16 md:py-24 max-w-3xl">
                    <span className="text-primary font-bold tracking-widest uppercase text-sm mb-3 block">Legal</span>
                    <h1 className="text-4xl md:text-5xl font-sans font-bold uppercase tracking-tight mb-4">Terms of Service</h1>
                    <p className="text-gray-500 text-sm mb-12">Last updated: 2026</p>
                    <div className="space-y-10">
                        {sections.map((s) => (
                            <section key={s.h}>
                                <h2 className="text-lg font-bold mb-3">{s.h}</h2>
                                <p className="text-gray-400 leading-relaxed">{s.p}</p>
                            </section>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
