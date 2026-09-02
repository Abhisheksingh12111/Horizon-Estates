import { useState, useId } from 'react';
import { Calculator, Percent, Calendar, ShieldCheck } from 'lucide-react';

interface EmiCalculatorProps {
  initialPrice?: number;
}

export default function EmiCalculator({ initialPrice = 15000000 }: EmiCalculatorProps) {
  const [propertyPrice, setPropertyPrice] = useState(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTenureYears, setLoanTenureYears] = useState(20);

  const priceInputId = useId();
  const downPaymentInputId = useId();
  const interestInputId = useId();
  const tenureInputId = useId();

  // Calculations
  const downPaymentAmount = (propertyPrice * downPaymentPercent) / 100;
  const principal = propertyPrice - downPaymentAmount;
  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = loanTenureYears * 12;

  const monthlyEmi =
    principal > 0 && monthlyRate > 0 && totalMonths > 0
      ? Math.round(
          (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
            (Math.pow(1 + monthlyRate, totalMonths) - 1)
        )
      : 0;

  const totalPayment = monthlyEmi * totalMonths;
  const totalInterest = Math.max(0, totalPayment - principal);

  const formatInInr = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    }
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} Lakh`;
    }
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  return (
    <div id="emi-calculator-card" className="bg-[#0F172A] text-white rounded-sm p-6 sm:p-8 border border-slate-800 shadow-xl">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
        <div className="w-8 h-8 rounded-sm bg-[#C5A059] text-white flex items-center justify-center font-bold">
          <Calculator className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-bold uppercase tracking-wider text-white">
            Home Loan EMI Calculator
          </h3>
          <p className="text-xs text-slate-400">
            Estimate monthly installments &amp; interest based on standard Indian bank lending rates
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Property Price */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor={priceInputId} className="text-xs font-semibold text-slate-300">
                Property Valuation
              </label>
              <span className="text-sm font-bold text-[#C5A059] font-mono">
                {formatInInr(propertyPrice)}
              </span>
            </div>
            <input
              id={priceInputId}
              type="range"
              min={2500000}
              max={250000000}
              step={500000}
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(Number(e.target.value))}
              className="w-full accent-[#C5A059] bg-slate-800 h-2 rounded-sm cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>₹25 Lakh</span>
              <span>₹10 Cr</span>
              <span>₹25 Cr</span>
            </div>
          </div>

          {/* Down Payment % */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor={downPaymentInputId} className="text-xs font-semibold text-slate-300">
                Down Payment ({downPaymentPercent}%)
              </label>
              <span className="text-sm font-bold text-slate-200 font-mono">
                {formatInInr(downPaymentAmount)}
              </span>
            </div>
            <input
              id={downPaymentInputId}
              type="range"
              min={10}
              max={50}
              step={5}
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full accent-[#C5A059] bg-slate-800 h-2 rounded-sm cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>10% (Min)</span>
              <span>20% (Standard)</span>
              <span>50%</span>
            </div>
          </div>

          {/* Interest Rate & Tenure Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor={interestInputId} className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                  <Percent className="w-3 h-3 text-[#C5A059]" />
                  Interest Rate
                </label>
                <span className="text-sm font-bold text-[#C5A059] font-mono">
                  {interestRate}% p.a.
                </span>
              </div>
              <input
                id={interestInputId}
                type="range"
                min={7.5}
                max={12.0}
                step={0.1}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full accent-[#C5A059] bg-slate-800 h-2 rounded-sm cursor-pointer"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor={tenureInputId} className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#C5A059]" />
                  Loan Tenure
                </label>
                <span className="text-sm font-bold text-slate-200 font-mono">
                  {loanTenureYears} Years
                </span>
              </div>
              <input
                id={tenureInputId}
                type="range"
                min={5}
                max={30}
                step={5}
                value={loanTenureYears}
                onChange={(e) => setLoanTenureYears(Number(e.target.value))}
                className="w-full accent-[#C5A059] bg-slate-800 h-2 rounded-sm cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Breakdown Output Column */}
        <div className="lg:col-span-5 bg-slate-950/80 rounded-sm p-5 border border-slate-800 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Estimated Monthly EMI
            </span>
            <div className="text-2xl sm:text-3xl font-black text-[#C5A059] tracking-tight mb-4">
              ₹{monthlyEmi.toLocaleString('en-IN')}
              <span className="text-xs font-normal text-slate-400 ml-1">/ month</span>
            </div>

            <div className="space-y-2.5 text-xs border-t border-slate-800 pt-3">
              <div className="flex justify-between items-center text-slate-300">
                <span>Principal Loan Amount:</span>
                <span className="font-semibold text-white">{formatInInr(principal)}</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>Total Interest Payable:</span>
                <span className="font-semibold text-[#C5A059]">{formatInInr(totalInterest)}</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>Total Amount Payable:</span>
                <span className="font-bold text-white">{formatInInr(totalPayment)}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-2 text-[11px] text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
            <span>Horizon partnered banks offer exclusive 0.15% processing fee waiver.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

