import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PROPERTIES_DATA } from '../data/properties';
import { COMPANY_STATS, WHY_CHOOSE_US, TESTIMONIALS } from '../data/company';
import PropertyCard from '../components/PropertyCard';
import PropertyDetailModal from '../components/PropertyDetailModal';
import InquiryModal from '../components/InquiryModal';
import { Property, Agent } from '../types';
import {
  Search,
  MapPin,
  Building2,
  IndianRupee,
  ShieldCheck,
  ArrowRight,
  Scale,
  FileText,
  BadgePercent,
  Headphones,
  CheckCircle2,
  Phone,
  ArrowUpRight,
  Star,
} from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();

  // Search Bar State
  const [searchCity, setSearchCity] = useState('');
  const [searchType, setSearchType] = useState('');
  const [searchBudget, setSearchBudget] = useState('');
  const [searchTransaction, setSearchTransaction] = useState<'Buy' | 'Rent'>('Buy');

  // Modal States
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquiryProperty, setInquiryProperty] = useState<Property | null>(null);
  const [inquiryAgent, setInquiryAgent] = useState<Agent | null>(null);

  // Featured Properties (4 properties)
  const featuredProperties = PROPERTIES_DATA.filter((p) => p.featured).slice(0, 4);

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchCity) params.set('city', searchCity);
    if (searchType) params.set('type', searchType);
    if (searchBudget) params.set('budget', searchBudget);
    if (searchTransaction) params.set('transaction', searchTransaction);

    navigate(`/properties?${params.toString()}`);
  };

  const handleOpenInquiry = (prop?: Property, agent?: Agent) => {
    setInquiryProperty(prop || null);
    setInquiryAgent(agent || null);
    setInquiryModalOpen(true);
  };

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
    <div className="space-y-16 sm:space-y-20 bg-[#F8FAFC]">
      {/* 1. HERO SECTION WITH GEOMETRIC SKEW OVERLAY & SEARCH BAR */}
      <section id="home-hero-section" className="relative bg-[#0F172A] text-white pt-16 pb-24 lg:pt-20 lg:pb-28 overflow-hidden">
        {/* Geometric Balance Architectural Skew Overlays */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
          <div className="w-full h-full grid grid-cols-12 gap-1">
            <div className="bg-white/10 col-span-4 h-full skew-x-12" />
            <div className="bg-white/10 col-span-2 h-full -skew-x-12" />
            <div className="bg-white/10 col-span-6 h-full skew-x-6" />
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-slate-900/90 border border-slate-700 text-[#C5A059] text-xs font-bold uppercase tracking-wider mb-5">
              <span className="w-2 h-2 bg-[#C5A059] rotate-45" />
              <span>India's Benchmark in Luxury &amp; Commercial Advisory</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight uppercase">
              Invest in India’s Most <span className="text-[#C5A059]">Prestigious</span> Addresses
            </h1>

            <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              Horizon Estates delivers curated luxury apartments, sea-facing penthouses, gated estate villas, and Grade-A commercial assets with 100% RERA legal guarantee.
            </p>
          </div>

          {/* Real Estate Search Widget */}
          <div className="mt-10 bg-white text-slate-900 rounded-sm p-4 sm:p-6 shadow-2xl border border-slate-200 max-w-4xl">
            {/* Buy / Rent Toggle Tabs */}
            <div className="flex items-center gap-2 mb-4 border-b border-slate-200 pb-3">
              <button
                type="button"
                id="hero-tab-buy"
                onClick={() => setSearchTransaction('Buy')}
                className={`px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition-all cursor-pointer ${
                  searchTransaction === 'Buy'
                    ? 'bg-[#0F172A] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Buy Property
              </button>
              <button
                type="button"
                id="hero-tab-rent"
                onClick={() => setSearchTransaction('Rent')}
                className={`px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition-all cursor-pointer ${
                  searchTransaction === 'Rent'
                    ? 'bg-[#0F172A] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Rent / Lease
              </button>
              <span className="hidden sm:inline-block ml-auto text-xs font-semibold text-[#C5A059] uppercase tracking-wider">
                100% Verified Inventory
              </span>
            </div>

            {/* Search Form Fields */}
            <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Location Select */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Location / City
                </label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    id="hero-search-city"
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                    className="w-full pl-8 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-sm text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#C5A059]"
                  >
                    <option value="">All Metros &amp; Cities</option>
                    <option value="Mumbai">Mumbai (Worli, BKC, Bandra)</option>
                    <option value="Bengaluru">Bengaluru (Indiranagar, Whitefield)</option>
                    <option value="Delhi NCR">Delhi NCR / Gurugram</option>
                    <option value="Hyderabad">Hyderabad (Jubilee Hills, HITEC)</option>
                    <option value="Pune">Pune (Koregaon Park, Baner)</option>
                    <option value="Goa">Goa (Assagao, Holiday Homes)</option>
                  </select>
                </div>
              </div>

              {/* Property Type Select */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Property Type
                </label>
                <div className="relative">
                  <Building2 className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    id="hero-search-type"
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="w-full pl-8 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-sm text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#C5A059]"
                  >
                    <option value="">All Categories</option>
                    <option value="Apartment">Luxury Apartment</option>
                    <option value="Villa">Gated Villa</option>
                    <option value="Penthouse">Sea-Facing Penthouse</option>
                    <option value="Commercial">Commercial Office</option>
                    <option value="Plot">Gated Plot / Land</option>
                  </select>
                </div>
              </div>

              {/* Budget Range Select */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Budget Range (₹)
                </label>
                <div className="relative">
                  <IndianRupee className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    id="hero-search-budget"
                    value={searchBudget}
                    onChange={(e) => setSearchBudget(e.target.value)}
                    className="w-full pl-8 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-sm text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#C5A059]"
                  >
                    <option value="">Any Budget</option>
                    <option value="under-1cr">Under ₹1 Crore</option>
                    <option value="1cr-3cr">₹1 Cr – ₹3 Crore</option>
                    <option value="3cr-6cr">₹3 Cr – ₹6 Crore</option>
                    <option value="6cr-15cr">₹6 Cr – ₹15 Crore</option>
                    <option value="above-15cr">Above ₹15 Crore</option>
                  </select>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="flex items-end">
                <button
                  type="submit"
                  id="hero-search-submit-btn"
                  className="w-full bg-[#0F172A] hover:bg-slate-800 text-white font-bold uppercase tracking-wider text-xs py-3 rounded-sm flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                >
                  <Search className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Search Properties</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* 2. TRUST INDICATORS BAR */}
      <section id="trust-indicators-bar" className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 -mt-10 sm:-mt-14 relative z-10">
        <div className="bg-white rounded-sm shadow-lg border border-slate-200 p-6 sm:p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200">
            {COMPANY_STATS.map((stat, idx) => (
              <div key={idx} className={`${idx > 0 ? 'pt-4 md:pt-0' : ''}`}>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0F172A] tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-800 mt-1">
                  {stat.label}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  {stat.subtext}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED PROPERTIES PREVIEW */}
      <section id="featured-properties-preview" className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div className="border-l-4 border-[#C5A059] pl-4">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#C5A059] block mb-1">
              Curated Portfolio
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
              Featured Luxury Listings
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Handpicked residences and commercial landmarks in India’s highest-value micro-markets.
            </p>
          </div>

          <Link
            to="/properties"
            id="featured-view-all-link"
            className="text-xs font-bold uppercase tracking-wider text-[#0F172A] border-b-2 border-[#0F172A] pb-1 hover:text-[#C5A059] hover:border-[#C5A059] transition-colors inline-flex items-center gap-1.5 self-start md:self-auto"
          >
            <span>View All Listings ({PROPERTIES_DATA.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProperties.map((prop) => (
            <PropertyCard
              key={prop.id}
              property={prop}
              onSelect={(p) => setSelectedProperty(p)}
            />
          ))}
        </div>
      </section>

      {/* 4. WHY CHOOSE US PREVIEW */}
      <section id="why-choose-us-preview" className="bg-[#0F172A] text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059] block mb-2">
              Unrivalled Credibility
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Why Discerning Buyers Choose Horizon Estates
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              We eliminate ambiguity in real estate through certified legal due diligence, zero-brokerage transparency, and dedicated advisory.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_CHOOSE_US.slice(0, 4).map((feat, idx) => (
              <div
                key={idx}
                className="bg-slate-900/90 border border-slate-800 rounded-sm p-6 flex flex-col justify-between hover:border-[#C5A059]/50 transition-colors"
              >
                <div>
                  <div className="w-10 h-10 rounded-sm bg-slate-950 border border-slate-800 flex items-center justify-center mb-4">
                    {getIcon(feat.iconName)}
                  </div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/about"
              id="why-choose-learn-more-btn"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C5A059] hover:underline"
            >
              <span>Read about our 15-year journey &amp; legal methodology</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. VERIFIED CLIENT TESTIMONIALS */}
      <section id="home-testimonials-section" className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059] block mb-2">
            Client Experiences
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Trusted by India’s Discerning Families &amp; NRIs
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-sm p-6 sm:p-7 border border-slate-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-[#C5A059] mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#C5A059]" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-sm object-cover border border-slate-200"
                />
                <div>
                  <h4 className="text-xs font-bold text-[#0F172A]">{t.name}</h4>
                  <p className="text-[11px] text-slate-500">{t.role}</p>
                  <span className="text-[10px] text-[#C5A059] font-bold block mt-0.5 uppercase tracking-wider">
                    Acquired: {t.propertyPurchased}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CTA BANNER */}
      <section id="home-cta-banner" className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 pb-8">
        <div className="bg-[#0F172A] text-white rounded-sm p-8 sm:p-12 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059] block mb-2">
              Personalized Real Estate Advisory
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight uppercase">
              Ready to Discover Your Next Trophy Property?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
              Schedule a confidential 1-on-1 consultation with our senior partner to explore curated off-market listings, pre-leased corporate assets, and luxury estates.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                id="cta-schedule-consultation-btn"
                className="bg-[#C5A059] hover:bg-[#B38F48] text-white font-bold uppercase tracking-wider text-xs px-6 py-3 rounded-sm transition-colors shadow-sm flex items-center gap-2"
              >
                <span>Book Private Consultation</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <a
                href="tel:+919820154321"
                id="cta-call-direct-btn"
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase tracking-wider text-xs px-6 py-3 rounded-sm border border-slate-700 transition-colors flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>+91 98201 54321</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <PropertyDetailModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        onRequestInquiry={(p, a) => {
          setSelectedProperty(null);
          handleOpenInquiry(p, a);
        }}
      />

      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        property={inquiryProperty}
        agent={inquiryAgent}
      />
    </div>
  );
}

