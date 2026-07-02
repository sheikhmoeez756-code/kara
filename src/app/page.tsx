import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BrandsBar from "@/components/BrandsBar";
import About from "@/components/About";
import Features from "@/components/Features";
import CarsTab from "@/components/CarsTab";
import Trust from "@/components/Trust";
import Financing from "@/components/Financing";
import RepairService from "@/components/RepairService";
import SellTradeIn from "@/components/SellTradeIn";
import PerformanceGraph from "@/components/PerformanceGraph";
import Testimonials from "@/components/Testimonials";
import Booking from "@/components/Booking";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent relative z-10">
      <Navbar />
      <Hero />
      <BrandsBar />
      <About />
      <Features />
      <CarsTab />
      <Trust />
      <Financing />
      <RepairService />
      <SellTradeIn />
      <PerformanceGraph />
      <Testimonials />
      <Booking />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
