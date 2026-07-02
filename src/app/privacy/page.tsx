import type { Metadata } from "next";
import SubNav from "@/components/SubNav";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: `Privacy Policy — ${SITE.name}` };

const sections = [
    { h: "Information We Collect", p: "When you use Kara, we may collect the details you provide — such as your name, email, phone number, delivery address, and the cars you save or reserve. We also collect basic usage data to improve the experience." },
    { h: "How We Use Your Information", p: "We use your information to process reservations and services, arrange delivery and collection, respond to enquiries, and keep you informed about your vehicles. We never sell your personal data." },
    { h: "Data Storage", p: "This is a demonstration build: account details, saved cars, and reservations are stored locally in your own browser and are not transmitted to a server. In a production deployment this data would be held securely on encrypted infrastructure." },
    { h: "Cookies & Local Storage", p: "We use browser local storage to remember your session, saved cars, and preferences. You can clear this at any time from your browser settings." },
    { h: "Your Rights", p: "You may request access to, correction of, or deletion of your personal information at any time by contacting our concierge team." },
    { h: "Contact", p: "Questions about this policy? Email concierge@kara.com and a member of our team will respond within one business day." },
];

export default function PrivacyPage() {
    return (
        <>
            <SubNav />
            <main className="min-h-screen bg-transparent relative z-10 pt-[68px]">
                <div className="container mx-auto px-6 md:px-12 py-16 md:py-24 max-w-3xl">
                    <span className="text-primary font-bold tracking-widest uppercase text-sm mb-3 block">Legal</span>
                    <h1 className="text-4xl md:text-5xl font-sans font-bold uppercase tracking-tight mb-4">Privacy Policy</h1>
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
