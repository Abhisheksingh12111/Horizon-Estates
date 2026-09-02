import { Link } from 'react-router-dom';
import { COMPANY_MILESTONES, WHY_CHOOSE_US, COMPANY_STATS } from '../data/company';
import {
  ShieldCheck,
  Scale,
  FileText,
  Building2,
  BadgePercent,
  Headphones,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

export default function AboutPage() {
  const getIcon = (name: string) => {
    switch (name) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-[#C5A059]" />;
      case 'Scale':
        return <Scale className="w-5 h-5 text-[#C5A059]" />;
      case 'FileText':
        return <FileText className="w-5 h-5 text-[#C5A059]" />;
      case 'Building2':
        return <Building2 className="w-5 h-5 text-[#C5A059]" />;
      case 'BadgePercent':
        return <BadgePercent className="w-5 h-5 text-[#C5A059]" />;
      case 'Headphones':
        return <Headphones className="w-5 h-5 text-[#C5A059]" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-[#C5A059]" />;
    }
  };

  return (
    <div className="py-8 sm:py-10 space-y-16 sm:space-y-20 bg-[#F8FAFC]">
      {/* 1. HERO & AGENCY STORY */}
      <section id="about-hero-section" className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
        <div className="bg-[#0F172A] text-white rounded-sm p-8 sm:p-14 border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-slate-900 border border-slate-700 text-[#C5A059] text-[10px] font-bold uppercase tracking-wider mb-4">
              <span className="w-1.5 h-1.5 bg-[#C5A059] rotate-45" />
              <span>Our Heritage &amp; Ethos Since 2009</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              Pioneering Transparency &amp; Integrity in Indian Real Estate
            </h1>
            <p className="mt-6 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Horizon Estates was established in Mumbai with a singular conviction: luxury property acquisition in India should be as transparent, legally pristine, and effortless as private banking.
            </p>
          </div>
        </div>
      </section>

      {/* 2. STATS BAR */}
      <section id="about-stats-bar" className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
        <div className="bg-white rounded-sm shadow-sm border border-slate-200 p-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
            {COMPANY_STATS.map((stat, idx) => (
              <div key={idx} className={`${idx > 0 ? 'pt-4 lg:pt-0' : ''}`}>
                <div className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-800 mt-1">{stat.label}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{stat.subtext}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. MISSION & CORE PHILOSOPHY */}
      <section id="about-mission-section" className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A059] bg-[#0F172A] px-2.5 py-1 rounded-sm inline-block">
              Founding Vision
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#0F172A] leading-tight">
              Built on 100% Verified Legal Due Diligence
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Over the last 15+ years, we have observed how real estate transactions in India are often plagued by murky titles, hidden brokerages, and unverified developer promises.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              At Horizon Estates, we eliminated that friction. Every property presented to our clients undergoes a 40-point verification checklist by our internal legal team, scrutinising 30-year search titles, local development authority permissions (BDA, MMRDA, DTCP), and RERA certifications.
            </p>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-sm bg-white border border-slate-200">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#0F172A] mb-1">Our Mission</h4>
                <p className="text-xs text-slate-600">
                  To provide institutional-grade real estate advisory and seamless asset transactions across India with zero ambiguity.
                </p>
              </div>
              <div className="p-4 rounded-sm bg-white border border-slate-200">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#0F172A] mb-1">Our Promise</h4>
                <p className="text-xs text-slate-600">
                  100% developer-direct pricing, zero hidden charges, and continuous post-handover property asset management.
                </p>
              </div>
            </div>
          </div>

          <div className="relative rounded-sm overflow-hidden shadow-lg border border-slate-200">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80"
              alt="Horizon Estates Architectural Headquarters"
              className="w-full h-full object-cover min-h-[400px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-[10px] text-[#C5A059] font-bold uppercase tracking-wider block">
                Horizon Advisory Headquarters
              </span>
              <p className="text-sm font-bold uppercase tracking-wider mt-1">
                Bandra Kurla Complex (BKC), Mumbai
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US FULL SECTION (6 CARDS) */}
      <section id="about-why-choose-us-full" className="bg-[#0F172A] text-white py-16 sm:py-20 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-slate-900 border border-slate-700 text-[#C5A059] text-[10px] font-bold uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 bg-[#C5A059] rotate-45" />
              <span>The Horizon Standard</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
              Why Discerning Investors &amp; Families Rely on Us
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Our 6-pillar advisory framework delivers end-to-end peace of mind across your property lifecycle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_CHOOSE_US.map((feat, idx) => (
              <div
                key={idx}
                className="bg-slate-900/90 border border-slate-800 rounded-sm p-7 hover:border-[#C5A059] transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-sm bg-slate-950 border border-slate-800 flex items-center justify-center mb-5 text-[#C5A059]">
                    {getIcon(feat.iconName)}
                  </div>
                  <h3 className="text-base font-bold uppercase tracking-wider text-white mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. COMPANY TIMELINE & MILESTONES */}
      <section id="about-timeline-section" className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A059] bg-[#0F172A] px-2.5 py-1 rounded-sm inline-block mb-2">
            15-Year Journey
          </span>
          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#0F172A]">
            Milestones That Define Our Growth
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            From our founding in Mumbai to managing pan-India luxury portfolios and NRI wealth advisories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COMPANY_MILESTONES.map((mile, idx) => (
            <div
              key={idx}
              className="bg-white rounded-sm p-7 border border-slate-200 shadow-sm relative overflow-hidden flex flex-col justify-between"
            >
              <div>
                <span className="text-3xl font-black text-[#C5A059] block mb-2">
                  {mile.year}
                </span>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#0F172A] mb-2">
                  {mile.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {mile.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>Verified Milestone Record</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CTA BANNER TO AGENTS / PROPERTIES */}
      <section id="about-cta-section" className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 pb-8">
        <div className="bg-[#0F172A] text-white rounded-sm p-8 sm:p-12 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
              Meet Our Senior Property Advisors
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-lg">
              Connect with our licensed micro-market specialists across Mumbai, Bengaluru, Delhi NCR, and Hyderabad.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/agents"
              id="about-meet-agents-btn"
              className="bg-[#C5A059] hover:bg-[#B38F48] text-white font-bold uppercase tracking-wider text-xs px-6 py-3 rounded-sm transition-colors shrink-0 flex items-center gap-2"
            >
              <span>View Advisory Team</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

