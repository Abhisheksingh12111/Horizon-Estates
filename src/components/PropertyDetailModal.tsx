import { useState } from 'react';
import { Property, Agent } from '../types';
import { AGENTS_DATA } from '../data/agents';
import EmiCalculator from './EmiCalculator';
import {
  X,
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
  Heart,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface PropertyDetailModalProps {
  property: Property | null;
  onClose: () => void;
  onRequestInquiry?: (property: Property, agent?: Agent) => void;
}

export default function PropertyDetailModal({
  property,
  onClose,
  onRequestInquiry,
}: PropertyDetailModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showEmiCalc, setShowEmiCalc] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!property) return null;

  const agent = AGENTS_DATA.find((a) => a.id === property.agentId) || AGENTS_DATA[0];

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const handlePrevImage = () => {
    setActiveImageIndex((prev) =>
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.origin + `/properties/${property.id}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div
      id="property-detail-modal-overlay"
      className="fixed inset-0 z-50 bg-[#0F172A]/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="property-detail-modal-container"
        className="bg-white rounded-sm max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-300 relative my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header Bar */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#0F172A] text-white px-2.5 py-1 rounded-sm">
              For {property.transaction}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm bg-slate-100 text-[#0F172A] border border-slate-200">
              {property.type}
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-sm border border-emerald-200 font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              RERA: {property.reraId}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              id="modal-share-btn"
              onClick={handleShare}
              className="px-2.5 py-1 rounded-sm text-slate-700 hover:text-[#0F172A] hover:bg-slate-100 transition-colors flex items-center gap-1 text-xs font-bold uppercase tracking-wider"
              title="Copy share link"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{copied ? 'Link Copied!' : 'Share'}</span>
            </button>
            <button
              type="button"
              id="modal-favorite-btn"
              onClick={() => setIsFavorite(!isFavorite)}
              className="p-1.5 rounded-sm text-slate-600 hover:text-rose-600 hover:bg-slate-100 transition-colors"
              title="Save to favorites"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-600 text-rose-600' : ''}`} />
            </button>
            <button
              type="button"
              id="close-detail-modal-btn"
              onClick={onClose}
              className="p-1.5 rounded-sm text-slate-500 hover:text-[#0F172A] hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Gallery Carousel */}
        <div className="relative aspect-[16/9] max-h-[440px] bg-[#0F172A] overflow-hidden group">
          <img
            src={property.images[activeImageIndex]}
            alt={`${property.title} view ${activeImageIndex + 1}`}
            className="w-full h-full object-cover transition-all duration-300"
          />

          {/* Nav Arrows */}
          {property.images.length > 1 && (
            <>
              <button
                type="button"
                id="gallery-prev-btn"
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-sm bg-[#0F172A]/80 hover:bg-[#0F172A] text-white flex items-center justify-center backdrop-blur-sm transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                id="gallery-next-btn"
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-sm bg-[#0F172A]/80 hover:bg-[#0F172A] text-white flex items-center justify-center backdrop-blur-sm transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Thumbnails Row */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <div className="flex gap-2 overflow-x-auto max-w-full p-1 bg-[#0F172A]/80 backdrop-blur-sm rounded-sm">
              {property.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-12 h-9 rounded-sm overflow-hidden border-2 transition-all shrink-0 ${
                    activeImageIndex === idx
                      ? 'border-[#C5A059] scale-105'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            <span className="text-[10px] bg-[#0F172A]/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-sm font-bold uppercase tracking-wider">
              {activeImageIndex + 1} / {property.images.length}
            </span>
          </div>
        </div>

        {/* Modal Main Content */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Title & Price Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>{property.location}</span>
                <span>&bull;</span>
                <span className="font-semibold text-slate-700">{property.city}, {property.state}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
                {property.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 italic">
                "{property.tagline}"
              </p>
            </div>

            <div className="flex flex-col md:items-end">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Offering Valuation
              </span>
              <div className="text-2xl sm:text-3xl font-black text-[#C5A059]">
                {property.priceFormatted}
                {property.rentPeriod && (
                  <span className="text-xs font-normal text-slate-500 ml-1">{property.rentPeriod}</span>
                )}
              </div>
              <span className="text-xs text-emerald-700 font-bold uppercase tracking-wider mt-0.5">
                {property.readyToMove ? 'Ready for Immediate Possession' : `Possession: ${property.possessionDate}`}
              </span>
            </div>
          </div>

          {/* Quick Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            <div className="bg-slate-50 p-3 rounded-sm border border-slate-200">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Configuration</span>
              <div className="flex items-center gap-1 mt-1 font-bold text-[#0F172A] text-xs sm:text-sm">
                <Bed className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>{property.bedrooms > 0 ? `${property.bedrooms} BHK` : property.type}</span>
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-sm border border-slate-200">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Carpet Area</span>
              <div className="flex items-center gap-1 mt-1 font-bold text-[#0F172A] text-xs sm:text-sm">
                <Maximize2 className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>{property.areaSqFt.toLocaleString('en-IN')} sq ft</span>
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-sm border border-slate-200">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Bathrooms</span>
              <div className="flex items-center gap-1 mt-1 font-bold text-[#0F172A] text-xs sm:text-sm">
                <Bath className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>{property.bathrooms} Baths</span>
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-sm border border-slate-200">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Facing</span>
              <div className="flex items-center gap-1 mt-1 font-bold text-[#0F172A] text-xs sm:text-sm">
                <Compass className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>{property.facing}</span>
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-sm border border-slate-200">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Floor Level</span>
              <div className="flex items-center gap-1 mt-1 font-bold text-[#0F172A] text-xs sm:text-sm truncate">
                <Layers className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                <span className="truncate">{property.floorNumber || 'Independent'}</span>
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-sm border border-slate-200">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Car Parking</span>
              <div className="flex items-center gap-1 mt-1 font-bold text-[#0F172A] text-xs sm:text-sm">
                <Car className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>{property.parkingSpots} Covered</span>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div>
            <h3 className="text-base font-bold uppercase tracking-wider text-[#0F172A] mb-2">
              Property Overview &amp; Architectural Highlights
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {property.description}
            </p>
          </div>

          {/* Amenities Grid */}
          <div>
            <h3 className="text-base font-bold uppercase tracking-wider text-[#0F172A] mb-3">
              Premium Amenities &amp; Infrastructure
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {property.amenities.map((amenity, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2.5 rounded-sm bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RERA Legal Certification Box */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-sm p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-sm bg-emerald-700 text-white flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-emerald-950 uppercase tracking-wider">
                  Verified Legal Title &amp; Statutory RERA Filing
                </h4>
                <p className="text-xs text-emerald-800 mt-0.5">
                  Registration Number: <strong className="font-mono">{property.reraId}</strong> &bull; Complete search report verified by Horizon in-house legal counsel.
                </p>
              </div>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-white px-3 py-1 rounded-sm border border-emerald-300 shrink-0">
              Clear Marketable Title
            </span>
          </div>

          {/* EMI Calculator Toggle */}
          {property.transaction === 'Buy' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold uppercase tracking-wider text-[#0F172A]">
                  Financing &amp; Monthly Installments
                </h3>
                <button
                  type="button"
                  id="toggle-emi-btn"
                  onClick={() => setShowEmiCalc(!showEmiCalc)}
                  className="text-xs font-bold uppercase tracking-wider text-[#C5A059] hover:underline cursor-pointer"
                >
                  {showEmiCalc ? 'Hide EMI Calculator' : 'Calculate Custom EMI in ₹'}
                </button>
              </div>

              {showEmiCalc && (
                <div className="animate-in fade-in duration-200">
                  <EmiCalculator initialPrice={property.price} />
                </div>
              )}
            </div>
          )}

          {/* Assigned Senior Advisor Card */}
          <div className="bg-[#0F172A] text-white rounded-sm p-6 sm:p-8 border border-slate-800">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <img
                  src={agent.image}
                  alt={agent.name}
                  className="w-14 h-14 rounded-sm object-cover border border-[#C5A059]"
                />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A059]">
                    Dedicated Portfolio Advisor
                  </span>
                  <h4 className="text-base font-bold text-white">
                    {agent.name}
                  </h4>
                  <p className="text-xs text-slate-400">{agent.designation}</p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {agent.experienceYears}+ years &bull; Specializes in {property.city}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
                <a
                  href={`tel:${agent.phone.replace(/\s+/g, '')}`}
                  className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-sm border border-slate-700 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Call Advisor</span>
                </a>

                <a
                  href={`https://wa.me/${agent.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(agent.name)},%20I%20am%20interested%20in%20${encodeURIComponent(property.title)}%20(${encodeURIComponent(property.priceFormatted)}).`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-sm transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>

                <button
                  type="button"
                  id="modal-request-visit-btn"
                  onClick={() => {
                    if (onRequestInquiry) onRequestInquiry(property, agent);
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-[#C5A059] hover:bg-[#B38F48] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-sm transition-colors cursor-pointer shadow-sm"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Private Site Visit</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

