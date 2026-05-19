import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BrandsBar from "@/components/BrandsBar";
import Features from "@/components/Features";
import CarsTab from "@/components/CarsTab";
import PerformanceGraph from "@/components/PerformanceGraph";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#090909]">
      <Navbar />
      <Hero />
      <BrandsBar />
      <Features />
      <CarsTab />
      <PerformanceGraph />
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  );
}
