"use client";
import { useMemo, useState } from "react";
import { money } from "@/lib/cars";

const APR = 0.059; // 5.9% representative

export default function FinanceCalculator({ price }: { price: number }) {
    const [deposit, setDeposit] = useState(Math.round(price * 0.2));
    const [term, setTerm] = useState(48);
    const [tradeIn, setTradeIn] = useState(0);

    const monthly = useMemo(() => {
        const principal = Math.max(0, price - deposit - tradeIn);
        const r = APR / 12;
        if (principal === 0) return 0;
        return (principal * r) / (1 - Math.pow(1 + r, -term));
    }, [price, deposit, term, tradeIn]);

    const maxDeposit = Math.round(price * 0.6);

    return (
        <div className="glass rounded-3xl p-7 md:p-8">
            <div className="flex items-baseline justify-between mb-6">
                <h3 className="text-lg font-bold uppercase tracking-wide">Finance Estimate</h3>
                <span className="text-[10px] uppercase tracking-widest text-gray-500">{(APR * 100).toFixed(1)}% APR</span>
            </div>

            <div className="text-center mb-6">
                <span className="text-4xl md:text-5xl font-black text-primary">{money(Math.round(monthly))}</span>
                <span className="text-gray-500 text-sm">/mo</span>
            </div>

            <div className="space-y-5">
                <div>
                    <div className="flex justify-between text-xs mb-2">
                        <label htmlFor="dep" className="text-gray-400 uppercase tracking-widest">Deposit</label>
                        <span className="text-white font-semibold">{money(deposit)}</span>
                    </div>
                    <input id="dep" type="range" min={0} max={maxDeposit} step={1000} value={deposit}
                        onChange={(e) => setDeposit(Number(e.target.value))}
                        className="w-full accent-primary" />
                </div>

                <div>
                    <div className="flex justify-between text-xs mb-2">
                        <label htmlFor="trade" className="text-gray-400 uppercase tracking-widest">Trade-in value</label>
                        <span className="text-white font-semibold">{money(tradeIn)}</span>
                    </div>
                    <input id="trade" type="range" min={0} max={Math.round(price * 0.5)} step={1000} value={tradeIn}
                        onChange={(e) => setTradeIn(Number(e.target.value))}
                        className="w-full accent-primary" />
                </div>

                <div>
                    <label htmlFor="term" className="text-xs text-gray-400 uppercase tracking-widest mb-2 block">Term</label>
                    <div className="grid grid-cols-5 gap-2">
                        {[24, 36, 48, 60, 72].map((t) => (
                            <button key={t} onClick={() => setTerm(t)}
                                className={`py-2 rounded-lg text-xs font-bold transition-all ${term === t ? 'bg-primary text-black' : 'bg-white/5 text-gray-400 hover:text-white'}`}>
                                {t}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <p className="text-[11px] text-gray-600 mt-6 leading-relaxed">
                Representative figures for illustration only. Final terms subject to status and approval.
            </p>
        </div>
    );
}
