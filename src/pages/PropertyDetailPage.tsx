import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PROPERTIES_DATA } from '../data/properties';
import { AGENTS_DATA } from '../data/agents';
import EmiCalculator from '../components/EmiCalculator';
import InquiryModal from '../components/InquiryModal';
import {
  ArrowLeft,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  ShieldCheck,
  Compass,
  Car,
  Layers,
  Phone,
  MessageCircle,
  Calendar,
  CheckCircle2,
  Share2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export default function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const property = PROPERTIES_DATA.find((p) => p.id === id) || PROPERTIES_DATA[0];
  const agent = AGENTS_DATA.find((a) => a.id === property.agentId) || AGENTS_DATA[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) =>
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="py-8 space-y-8 max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 bg-[#F8FAFC]">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
          <Link to="/" className="hover:text-[#0F172A] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to="/properties" className="hover:text-[#0F172A] transition-colors">
            Properties
          </Link>
          <span>/</span>
          <span className="text-[#0F172A] truncate max-w-xs">
            {property.title}
          </span>
        </div>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0F172A] hover:bg-slate-50 bg-white border border-slate-300 px-3 py-1.5 rounded-sm shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>
      </div>

      {/* Main Header Row */}
      <div className="bg-white rounded-sm p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2.5 flex-wrap">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#0F172A] text-white px-2.5 py-0.5 rounded-sm">
              For {property.transaction}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-sm bg-slate-100 text-[#0F172A] border border-slate-200">
              {property.type}
            </span>
            <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-sm border border-emerald-200 font-bold uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              RERA Reg: {property.reraId}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#0F172A]">
            {property.title}
          </h1>

          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mt-2">
            <MapPin className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
            <span>{property.location} &bull; {property.city}, {property.state}</span>
          </div>
        </div>

        <div className="flex flex-col md:items-end">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Price / Valuation
          </span>
          <div className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
            {property.priceFormatted}
            {property.rentPeriod && (
              <span className="text-xs font-semibold text-slate-500 ml-1">{property.rentPeriod}</span>
            )}
          </div>
          <span className="text-xs text-emerald-700 font-bold uppercase tracking-wider mt-1">
            {property.readyToMove ? 'Ready to Move' : `Possession: ${property.possessionDate}`}
          </span>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="relative aspect-[16/9] max-h-[520px] rounded-sm overflow-hidden bg-slate-950 shadow-md group">
        <img
          src={property.images[activeImageIndex]}
          alt={property.title}
          className="w-full h-full object-cover"
        />

        {property.images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-sm bg-[#0F172A]/80 hover:bg-[#0F172A] text-white flex items-center justify-center backdrop-blur-sm transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-sm bg-[#0F172A]/80 hover:bg-[#0F172A] text-white flex items-center justify-center backdrop-blur-sm transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <div className="flex gap-2 overflow-x-auto p-1.5 bg-[#0F172A]/80 backdrop-blur-sm rounded-sm">
            {property.images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImageIndex(idx)}
                className={`w-14 h-10 rounded-sm overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                  activeImageIndex === idx
                    ? 'border-[#C5A059] scale-105'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="bg-[#0F172A]/90 hover:bg-[#0F172A] text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-sm flex items-center gap-1.5 backdrop-blur-sm transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? 'Copied' : 'Share'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Details (Left) + Sticky Advisory Sidebar (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-8">
          {/* Specs Grid */}
          <div className="bg-white rounded-sm p-6 border border-slate-200 shadow-sm">
            <h3 className="text-base font-bold uppercase tracking-wider text-[#0F172A] mb-4">
              Property Specifications
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="p-3.5 bg-slate-50 rounded-sm border border-slate-200">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Bedrooms / Type</span>
                <span className="text-xs font-bold text-slate-900 mt-1 flex items-center gap-1.5">
                  <Bed className="w-4 h-4 text-[#C5A059]" />
                  {property.bedrooms > 0 ? `${property.bedrooms} BHK` : property.type}
                </span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-sm border border-slate-200">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Super Built-up Area</span>
                <span className="text-xs font-bold text-slate-900 mt-1 flex items-center gap-1.5">
                  <Maximize2 className="w-4 h-4 text-[#C5A059]" />
                  {property.areaSqFt.toLocaleString('en-IN')} sq ft
                </span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-sm border border-slate-200">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Bathrooms</span>
                <span className="text-xs font-bold text-slate-900 mt-1 flex items-center gap-1.5">
                  <Bath className="w-4 h-4 text-[#C5A059]" />
                  {property.bathrooms} Baths
                </span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-sm border border-slate-200">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Direction Facing</span>
                <span className="text-xs font-bold text-slate-900 mt-1 flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-[#C5A059]" />
                  {property.facing} Facing
                </span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-sm border border-slate-200">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Floor Position</span>
                <span className="text-xs font-bold text-slate-900 mt-1 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-[#C5A059]" />
                  {property.floorNumber || 'Independent Floor'}
                </span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-sm border border-slate-200">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Covered Parking</span>
                <span className="text-xs font-bold text-slate-900 mt-1 flex items-center gap-1.5">
                  <Car className="w-4 h-4 text-[#C5A059]" />
                  {property.parkingSpots} Reserved Slots
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-sm p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold uppercase tracking-wider text-[#0F172A]">
              Detailed Property Narrative
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {property.description}
            </p>
          </div>

          {/* Amenities */}
          <div className="bg-white rounded-sm p-6 sm:p-8 border border-slate-200 shadow-sm">
            <h3 className="text-base font-bold uppercase tracking-wider text-[#0F172A] mb-4">
              Building Amenities &amp; Lifestyle Features
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {property.amenities.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-3 rounded-sm bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* EMI Calculator */}
          {property.transaction === 'Buy' && (
            <div>
              <EmiCalculator initialPrice={property.price} />
            </div>
          )}
        </div>

        {/* Right Sticky Column: Assigned Advisor & Quick Action */}
        <div className="lg:col-span-4 space-y-6">
          {/* Agent Box */}
          <div className="bg-white rounded-sm p-6 border border-slate-200 shadow-sm sticky top-24 space-y-5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A059] bg-[#0F172A] px-2.5 py-1 rounded-sm block w-fit">
              Official Listing Advisor
            </span>

            <div className="flex items-center gap-4">
              <img
                src={agent.image}
                alt={agent.name}
                className="w-14 h-14 rounded-sm object-cover border border-slate-200 shadow-sm"
              />
              <div>
                <h4 className="text-base font-bold text-[#0F172A]">
                  {agent.name}
                </h4>
                <p className="text-xs text-slate-500">{agent.designation}</p>
                <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider block mt-1">
                  RERA: {agent.reraRegNumber}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {agent.bio}
            </p>

            <div className="space-y-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                id="page-book-viewing-btn"
                onClick={() => setInquiryModalOpen(true)}
                className="w-full bg-[#C5A059] hover:bg-[#B38F48] text-white font-bold uppercase tracking-wider text-xs py-3 rounded-sm flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Schedule Private Viewing</span>
              </button>

              <a
                href={`tel:${agent.phone.replace(/\s+/g, '')}`}
                className="w-full bg-[#0F172A] hover:bg-slate-800 text-white font-bold uppercase tracking-wider text-xs py-3 rounded-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Call {agent.phone}</span>
              </a>

              <a
                href={`https://wa.me/${agent.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(agent.name)},%20I%20am%20inquiring%20about%20${encodeURIComponent(property.title)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold uppercase tracking-wider text-xs py-3 rounded-sm flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            <div className="p-3 rounded-sm bg-slate-50 border border-slate-200 text-[10px] text-slate-500 space-y-1">
              <p><strong>Office:</strong> Horizon Tower, BKC, Mumbai</p>
              <p><strong>Response Time:</strong> Under 2 hours guaranteed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        property={property}
        agent={agent}
      />
    </div>
  );
}

