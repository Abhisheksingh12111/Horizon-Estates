import { useState, type MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { Property } from '../types';
import {
  MapPin,
  Bed,
  Bath,
  Maximize2,
  ShieldCheck,
  ArrowRight,
  Heart,
  Share2,
} from 'lucide-react';

interface PropertyCardProps {
  key?: string | number;
  property: Property;
  onSelect?: (property: Property) => void;
}

export default function PropertyCard({ property, onSelect }: PropertyCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.origin + `/properties/${property.id}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleLike = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsLiked(!isLiked);
  };

  const handleClick = () => {
    if (onSelect) {
      onSelect(property);
    }
  };

  return (
    <div
      id={`property-card-${property.id}`}
      onClick={handleClick}
      className="group bg-white rounded-sm border border-slate-200 p-3.5 hover:border-slate-400 hover:shadow-md transition-all duration-200 flex flex-col cursor-pointer"
    >
      {/* Property Image with Badges */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-slate-100 mb-3.5">
        <img
          src={property.images[0]}
          alt={property.title}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />

        {/* Gradient Overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              id={`badge-trans-${property.id}`}
              className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-[#0F172A]/90 text-white backdrop-blur-sm shadow-sm"
            >
              For {property.transaction}
            </span>

            <span
              id={`badge-type-${property.id}`}
              className="text-[10px] font-semibold px-2 py-0.5 rounded-sm bg-white/95 text-[#0F172A] shadow-sm"
            >
              {property.type}
            </span>

            {property.featured && (
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-[#C5A059] text-white shadow-sm">
                Featured
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 pointer-events-auto">
            <button
              type="button"
              id={`btn-share-${property.id}`}
              onClick={handleShare}
              title="Share listing"
              className="w-7 h-7 rounded-sm bg-white/90 hover:bg-white text-slate-700 flex items-center justify-center backdrop-blur-sm transition-colors shadow-sm"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              id={`btn-like-${property.id}`}
              onClick={handleLike}
              title="Save to favorites"
              className={`w-7 h-7 rounded-sm bg-white/90 hover:bg-white flex items-center justify-center backdrop-blur-sm transition-colors shadow-sm ${
                isLiked ? 'text-rose-600' : 'text-slate-700'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-600' : ''}`} />
            </button>
          </div>
        </div>

        {/* Bottom Image Overlay Details */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-end justify-between text-white">
          <div className="flex items-center gap-1 text-[10px] bg-[#0F172A]/90 backdrop-blur-sm px-2 py-0.5 rounded-sm text-emerald-400 font-medium">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>RERA: {property.reraId}</span>
          </div>
          {copied && (
            <span className="text-[10px] bg-[#C5A059] text-white px-2 py-0.5 rounded-sm font-bold animate-pulse">
              Link Copied!
            </span>
          )}
        </div>
      </div>

      {/* Property Details Body */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Price Header */}
          <div className="flex items-baseline justify-between mb-1.5">
            <div className="flex items-baseline gap-1">
              <span id={`price-${property.id}`} className="text-lg sm:text-xl font-extrabold tracking-tight text-[#C5A059]">
                {property.priceFormatted}
              </span>
              {property.rentPeriod && (
                <span className="text-xs text-slate-500 font-normal">{property.rentPeriod}</span>
              )}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-slate-100 text-slate-700">
              {property.readyToMove ? 'Ready' : 'UC'}
            </span>
          </div>

          {/* Title */}
          <h3
            id={`title-${property.id}`}
            className="text-sm font-bold text-[#0F172A] line-clamp-1 group-hover:text-[#C5A059] transition-colors"
          >
            {property.title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1 mb-3">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{property.location}</span>
          </div>

          {/* Key Specs Row */}
          <div className="grid grid-cols-3 gap-2 py-2.5 border-y border-slate-100 text-xs text-slate-700 font-medium">
            {property.bedrooms > 0 ? (
              <div className="flex items-center gap-1">
                <Bed className="w-3.5 h-3.5 text-slate-400" />
                <span>{property.bedrooms} BHK</span>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                <span>Office</span>
              </div>
            )}

            {property.bathrooms > 0 ? (
              <div className="flex items-center gap-1">
                <Bath className="w-3.5 h-3.5 text-slate-400" />
                <span>{property.bathrooms} Baths</span>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                <span>Plot</span>
              </div>
            )}

            <div className="flex items-center gap-1">
              <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-semibold">{property.areaSqFt.toLocaleString('en-IN')} sq ft</span>
            </div>
          </div>
        </div>

        {/* Card Footer with Quick CTA */}
        <div className="mt-3 pt-2 flex items-center justify-between text-xs">
          <span className="text-slate-400 text-[11px]">
            {property.furnishingStatus}
          </span>

          <Link
            to={`/properties/${property.id}`}
            id={`view-detail-link-${property.id}`}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 text-[#0F172A] hover:text-[#C5A059] font-bold text-xs uppercase tracking-wider group-hover:translate-x-0.5 transition-all"
          >
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C5A059]" />
          </Link>
        </div>
      </div>
    </div>
  );
}

