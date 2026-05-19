"use client";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
    return (
        <main className="min-h-screen bg-[#090909] flex">
            {/* Left side - Image & Branding */}
            <div className="hidden lg:flex w-1/2 relative bg-[#050505] items-center justify-center p-20 flex-col">
                <div className="absolute inset-0 bg-primary/10 blur-[100px] z-0"></div>
                <img src="/hero-hood.png" alt="Luxury Car" className="absolute inset-0 w-full h-[120%] object-cover opacity-30 mix-blend-lighten pointer-events-none" />

                <div className="relative z-10 w-full mb-auto mt-6">
                    <Link href="/" className="flex items-center gap-3 w-fit hover:opacity-80 transition-opacity">
                        <div className="text-2xl font-sans font-bold tracking-wide text-white">Kara</div>
                    </Link>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative z-10 w-full mt-auto"
                >
                    <h1 className="text-5xl font-sans font-bold text-white leading-tight mb-6 uppercase tracking-tight">
                        Exclusive<br /><span className="text-primary italic pr-4">Access</span>
                    </h1>
                    <p className="text-gray-400 max-w-sm text-sm leading-relaxed">
                        Log in to manage your luxury vehicle portfolio, track repairs in real-time, and explore unreleased models.
                    </p>
                </motion.div>
            </div>

            {/* Right side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 relative overflow-hidden">
                {/* Mobile Logo */}
                <Link href="/" className="absolute top-8 left-8 flex lg:hidden items-center gap-3 z-20">
                    <span className="text-2xl font-sans font-bold tracking-wide text-white">Kara</span>
                </Link>

                <div className="absolute right-0 bottom-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full pointer-events-none"></div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md bg-[#0f0f0f] border border-white/5 rounded-[2rem] p-8 md:p-10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] relative z-10"
                >
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 blur-[40px] rounded-full pointer-events-none"></div>

                    <h2 className="text-3xl font-sans font-bold text-white mb-3">Welcome Back</h2>
                    <p className="text-gray-500 text-sm mb-10">Enter your credentials to continue</p>

                    <form className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Email</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail size={18} className="text-gray-600 group-focus-within:text-primary transition-colors" />
                                </div>
                                <input
                                    type="email"
                                    className="w-full bg-black border border-white/10 text-white rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary/50 transition-colors placeholder:text-gray-700 font-medium"
                                    placeholder="admin@kara.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center pl-1 pr-1">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Password</label>
                                <a href="#" className="text-[10px] uppercase font-bold tracking-widest text-primary hover:text-white transition-colors">Recovery?</a>
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock size={18} className="text-gray-600 group-focus-within:text-primary transition-colors" />
                                </div>
                                <input
                                    type="password"
                                    className="w-full bg-black border border-white/10 text-white rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary/50 transition-colors placeholder:text-gray-700 font-medium tracking-widest"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <button type="button" className="w-full bg-primary text-black font-bold uppercase tracking-widest text-xs py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-white hover:shadow-[0_0_20px_rgba(230,255,0,0.4)] transition-all duration-300 group">
                                Sign In
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </form>

                    <div className="mt-8 pt-6 border-t border-white/5 text-center text-xs tracking-widest text-gray-500 uppercase">
                        Don&apos;t have access? <br /><br /><a href="#" className="text-white hover:text-primary font-bold transition-colors">Apply for Membership</a>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
