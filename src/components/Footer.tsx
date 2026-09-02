import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim() && newsletterEmail.includes('@')) {
      setNewsletterSubmitted(true);
      setTimeout(() => {
        setNewsletterEmail('');
      }, 3000);
    }
  };

  return (
    <footer id="main-site-footer" className="bg-[#0F172A] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-slate-800">
          {/* Col 1: Brand & Philosophy */}
          <div className="space-y-4">
            <Link to="/" id="footer-brand-logo" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#C5A059] flex items-center justify-center rounded-sm rotate-45">
                <span className="text-white -rotate-45 font-black text-sm">H</span>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg tracking-tight uppercase text-white">
                  Horizon <span className="text-[#C5A059]">Estates</span>
                </span>
                <span className="text-[9px] tracking-widest uppercase text-slate-400">
                  India's Trusted Real Estate Advisory
                </span>
              </div>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed">
              Founded in 2009, Horizon Estates is an accredited, RERA-certified real estate advisory serving high-net-worth individuals, institutional investors, and families across India and globally.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-[#C5A059] bg-[#C5A059]/10 border border-[#C5A059]/30 px-3 py-2 rounded-sm">
              <ShieldCheck className="w-4 h-4 shrink-0 text-[#C5A059]" />
              <span className="text-[11px] font-semibold">100% Title Verified &amp; RERA Registered</span>
            </div>
          </div>

          {/* Col 2: Quick Links & Categories */}
          <div>
            <h3 className="text-white text-xs font-bold uppercase tracking-wider mb-4 border-b border-slate-800 pb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#C5A059]"></span>
              Navigation &amp; Portfolios
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/" id="footer-link-home" className="text-slate-400 hover:text-[#C5A059] transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link to="/properties" id="footer-link-properties" className="text-slate-400 hover:text-[#C5A059] transition-colors">
                  All Properties in India
                </Link>
              </li>
              <li>
                <Link to="/about" id="footer-link-about" className="text-slate-400 hover:text-[#C5A059] transition-colors">
                  About Our Agency &amp; Story
                </Link>
              </li>
              <li>
                <Link to="/agents" id="footer-link-agents" className="text-slate-400 hover:text-[#C5A059] transition-colors">
                  Meet Our Real Estate Advisors
                </Link>
              </li>
              <li>
                <Link to="/contact" id="footer-link-contact" className="text-slate-400 hover:text-[#C5A059] transition-colors">
                  Contact &amp; Office Locations
                </Link>
              </li>
              <li>
                <Link to="/properties?type=Villa" id="footer-link-villas" className="text-slate-400 hover:text-[#C5A059] transition-colors">
                  Luxury Villas &amp; Penthouses
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Regional Hubs */}
          <div>
            <h3 className="text-white text-xs font-bold uppercase tracking-wider mb-4 border-b border-slate-800 pb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#C5A059]"></span>
              Flagship Regional Desks
            </h3>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200 block text-[11px]">Mumbai (Headquarters):</strong>
                  <span className="text-[11px]">Level 14, Horizon Tower, BKC, Mumbai 400051</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200 block text-[11px]">Bengaluru:</strong>
                  <span className="text-[11px]">100 Feet Road, Indiranagar, Bengaluru 560038</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200 block text-[11px]">Delhi NCR:</strong>
                  <span className="text-[11px]">Golf Course Ext. Road, Sector 58, Gurugram 122011</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200 block text-[11px]">Hyderabad:</strong>
                  <span className="text-[11px]">Road No. 36, Jubilee Hills, Hyderabad 500033</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Col 4: Private Market Newsletter & Advisory Call */}
          <div>
            <h3 className="text-white text-xs font-bold uppercase tracking-wider mb-4 border-b border-slate-800 pb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#C5A059]"></span>
              Market Intelligence
            </h3>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Receive confidential off-market real estate previews, quarterly yield indices, and high-growth micro-market reports.
            </p>

            {newsletterSubmitted ? (
              <div id="newsletter-success-state" className="bg-emerald-950/60 border border-emerald-700/50 p-3 rounded-sm text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Thank you. You have been subscribed to Horizon Quarterly.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} id="footer-newsletter-form" className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    id="newsletter-email-input"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your corporate email"
                    required
                    className="w-full bg-slate-900 border border-slate-700 rounded-sm px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#C5A059] transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  id="newsletter-subscribe-btn"
                  className="w-full bg-[#C5A059] hover:bg-[#B38F48] text-white font-bold uppercase tracking-wider text-xs py-2 rounded-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Subscribe to Digest</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

            <div className="pt-3 flex items-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <Lock className="w-3 h-3 text-slate-500" />
                <span className="text-[11px]">Strict NDA confidentiality assured.</span>
              </div>
            </div>
          </div>
        </div>

        {/* RERA Credentials & Statutory Compliance Row */}
        <div className="py-5 border-b border-slate-800 text-[11px] text-slate-400 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2">
            <span className="font-bold text-slate-200">Statutory Registrations:</span>
            <span>MahaRERA: A51900028491</span>
            <span>KA RERA: PRM/KA/RERA/1251/AGENT/00912</span>
            <span>HRERA: HARERA/GGM/2018/AG-441</span>
            <span>TS RERA: TSRERA/AG/2019/00481</span>
          </div>
          <div className="text-slate-400 flex items-center gap-4">
            <a href="tel:+919820154321" className="hover:text-[#C5A059] transition-colors flex items-center gap-1">
              <Phone className="w-3 h-3 text-[#C5A059]" /> +91 98201 54321
            </a>
            <span>&bull;</span>
            <a href="mailto:advisory@horizonestates.in" className="hover:text-[#C5A059] transition-colors flex items-center gap-1">
              <Mail className="w-3 h-3 text-[#C5A059]" /> advisory@horizonestates.in
            </a>
          </div>
        </div>

        {/* Copyright & Legal Disclaimer */}
        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} Horizon Estates Advisory Services Pvt. Ltd. All rights reserved.
          </p>
          <p className="text-center sm:text-right max-w-xl text-[10px] text-slate-400">
            Disclaimer: All property visualisations, specifications, and dimensions are sourced from verified developer filings and RERA certificates.
          </p>
        </div>
      </div>
    </footer>
  );
}

