import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PROPERTIES_DATA } from '../data/properties';
import PropertyCard from '../components/PropertyCard';
import PropertyDetailModal from '../components/PropertyDetailModal';
import InquiryModal from '../components/InquiryModal';
import { Property, Agent } from '../types';
import {
  Search,
  RotateCcw,
  ArrowUpDown,
  ShieldCheck,
} from 'lucide-react';

export default function PropertiesPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Filters State
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [selectedCity, setSelectedCity] = useState(searchParams.get('city') || '');
  const [selectedType, setSelectedType] = useState(searchParams.get('type') || '');
  const [selectedTransaction, setSelectedTransaction] = useState(searchParams.get('transaction') || '');
  const [selectedBudget, setSelectedBudget] = useState(searchParams.get('budget') || '');
  const [selectedBhk, setSelectedBhk] = useState(searchParams.get('bhk') || '');
  const [readyToMoveOnly, setReadyToMoveOnly] = useState(searchParams.get('ready') === 'true');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'area-desc'>('featured');

  // Pagination / Load More state
  const [visibleCount, setVisibleCount] = useState(6);

  // Modals
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquiryProperty, setInquiryProperty] = useState<Property | null>(null);
  const [inquiryAgent, setInquiryAgent] = useState<Agent | null>(null);

  // Sync URL search params
  useEffect(() => {
    const q = searchParams.get('q');
    const city = searchParams.get('city');
    const type = searchParams.get('type');
    const trans = searchParams.get('transaction');
    const budget = searchParams.get('budget');
    const bhk = searchParams.get('bhk');
    const ready = searchParams.get('ready');
    if (q !== null) setSearchTerm(q);
    if (city !== null) setSelectedCity(city);
    if (type !== null) setSelectedType(type);
    if (trans !== null) setSelectedTransaction(trans);
    if (budget !== null) setSelectedBudget(budget);
    if (bhk !== null) setSelectedBhk(bhk);
    if (ready !== null) setReadyToMoveOnly(ready === 'true');
  }, [searchParams]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCity('');
    setSelectedType('');
    setSelectedTransaction('');
    setSelectedBudget('');
    setSelectedBhk('');
    setReadyToMoveOnly(false);
    setSortBy('featured');
    setSearchParams({});
  };

  const handleFilter3BhkApartments = () => {
    if (selectedType === 'Apartment' && selectedBhk === '3') {
      setSelectedType('');
      setSelectedBhk('');
    } else {
      setSelectedType('Apartment');
      setSelectedBhk('3');
    }
  };

  // Filter & Sort properties
  const filteredProperties = useMemo(() => {
    return PROPERTIES_DATA.filter((p) => {
      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(query);
        const matchesLoc = p.location.toLowerCase().includes(query);
        const matchesCity = p.city.toLowerCase().includes(query);
        const matchesTag = p.tagline.toLowerCase().includes(query);
        if (!matchesTitle && !matchesLoc && !matchesCity && !matchesTag) return false;
      }

      // City
      if (selectedCity && p.city !== selectedCity) {
        return false;
      }

      // Type
      if (selectedType && p.type !== selectedType) {
        return false;
      }

      // Transaction
      if (selectedTransaction && p.transaction !== selectedTransaction) {
        return false;
      }

      // BHK
      if (selectedBhk) {
        const reqBhk = parseInt(selectedBhk, 10);
        if (selectedBhk === '5+' && p.bedrooms < 5) return false;
        if (selectedBhk !== '5+' && p.bedrooms !== reqBhk) return false;
      }

      // Ready to Move
      if (readyToMoveOnly && !p.readyToMove) {
        return false;
      }

      // Budget ranges in INR
      if (selectedBudget) {
        if (selectedBudget === 'under-1cr' && p.price >= 10000000) return false;
        if (selectedBudget === '1cr-3cr' && (p.price < 10000000 || p.price > 30000000)) return false;
        if (selectedBudget === '3cr-6cr' && (p.price < 30000000 || p.price > 60000000)) return false;
        if (selectedBudget === '6cr-15cr' && (p.price < 60000000 || p.price > 150000000)) return false;
        if (selectedBudget === 'above-15cr' && p.price < 150000000) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'area-desc') return b.areaSqFt - a.areaSqFt;
      // Default: featured first
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }, [
    searchTerm,
    selectedCity,
    selectedType,
    selectedTransaction,
    selectedBudget,
    selectedBhk,
    readyToMoveOnly,
    sortBy,
  ]);

  const displayedProperties = filteredProperties.slice(0, visibleCount);

  const activeFiltersCount = [
    selectedCity,
    selectedType,
    selectedTransaction,
    selectedBudget,
    selectedBhk,
    readyToMoveOnly,
    searchTerm,
  ].filter(Boolean).length;

  return (
    <div className="py-8 sm:py-10 space-y-8 bg-[#F8FAFC]">
      {/* Top Banner & Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
        <div className="bg-[#0F172A] text-white rounded-sm p-6 sm:p-10 border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-slate-900 border border-slate-700 text-[#C5A059] text-[10px] font-bold uppercase tracking-wider mb-3">
                <span className="w-1.5 h-1.5 bg-[#C5A059] rotate-45" />
                <span>100% RERA Certified Portfolio</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
                Properties &amp; Luxury Estates
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl">
                Explore luxury apartments, penthouses, commercial corporate offices, and bespoke villas across India’s premier metropolitan hubs.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-slate-900/90 border border-slate-800 p-3.5 rounded-sm shrink-0">
              <div className="w-9 h-9 rounded-sm bg-[#C5A059] text-white flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <span className="font-bold text-white uppercase tracking-wider block">Verified Legal Title</span>
                <span className="text-slate-400 text-[11px]">Zero brokerage on developer inventory</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
        {/* Search & Filter Top Bar */}
        <div className="bg-white rounded-sm p-4 sm:p-5 border border-slate-200 shadow-sm mb-8 space-y-4">
          {/* Search Row */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                id="properties-search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by building name, locality (e.g. Worli, Indiranagar, DLF Phase 5)..."
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-sm text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#C5A059]"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 font-bold"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <div className="relative min-w-[170px]">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <select
                  id="properties-sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full pl-8 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-sm text-xs font-bold uppercase tracking-wider text-slate-800 focus:outline-none focus:border-[#C5A059] cursor-pointer"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="area-desc">Area: Largest First</option>
                </select>
              </div>

              {activeFiltersCount > 0 && (
                <button
                  type="button"
                  id="properties-reset-filters-btn"
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-1 px-3 py-2.5 rounded-sm border border-slate-200 text-xs font-bold uppercase tracking-wider text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Filter Presets Bar */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mr-1">
              Quick Filter:
            </span>
            <button
              type="button"
              id="filter-chip-all"
              onClick={handleResetFilters}
              className={`text-xs px-3 py-1.5 rounded-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                !selectedType && !selectedBhk && !selectedCity && !selectedTransaction && !selectedBudget && !readyToMoveOnly && !searchTerm
                  ? 'bg-[#0F172A] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Properties
            </button>

            {/* Dedicated 3 BHK Apartments Filter */}
            <button
              type="button"
              id="filter-chip-3bhk-apartments"
              onClick={handleFilter3BhkApartments}
              className={`inline-flex items-center gap-1.5 text-xs px-3.5 py-1.5 rounded-sm font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                selectedType === 'Apartment' && selectedBhk === '3'
                  ? 'bg-[#C5A059] border-[#C5A059] text-white shadow-sm ring-2 ring-[#C5A059]/30'
                  : 'bg-white border-slate-300 text-slate-800 hover:border-[#C5A059] hover:text-[#C5A059]'
              }`}
            >
              <span className={`w-2 h-2 rotate-45 ${selectedType === 'Apartment' && selectedBhk === '3' ? 'bg-white' : 'bg-[#C5A059]'}`} />
              <span>3 BHK Apartments</span>
            </button>

            <button
              type="button"
              id="filter-chip-villas"
              onClick={() => {
                setSelectedType(selectedType === 'Villa' ? '' : 'Villa');
                if (selectedBhk === '3' && selectedType !== 'Villa') setSelectedBhk('');
              }}
              className={`text-xs px-3 py-1.5 rounded-sm font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                selectedType === 'Villa'
                  ? 'bg-[#0F172A] border-[#0F172A] text-white shadow-sm'
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
            >
              Luxury Villas
            </button>

            <button
              type="button"
              id="filter-chip-penthouses"
              onClick={() => {
                setSelectedType(selectedType === 'Penthouse' ? '' : 'Penthouse');
                if (selectedBhk === '3' && selectedType !== 'Penthouse') setSelectedBhk('');
              }}
              className={`text-xs px-3 py-1.5 rounded-sm font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                selectedType === 'Penthouse'
                  ? 'bg-[#0F172A] border-[#0F172A] text-white shadow-sm'
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
            >
              Penthouses
            </button>

            <button
              type="button"
              id="filter-chip-ready-to-move"
              onClick={() => setReadyToMoveOnly(!readyToMoveOnly)}
              className={`text-xs px-3 py-1.5 rounded-sm font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                readyToMoveOnly
                  ? 'bg-emerald-800 border-emerald-800 text-white shadow-sm'
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
            >
              Ready to Move
            </button>

            <button
              type="button"
              id="filter-chip-commercial"
              onClick={() => {
                setSelectedType(selectedType === 'Commercial' ? '' : 'Commercial');
                setSelectedBhk('');
              }}
              className={`text-xs px-3 py-1.5 rounded-sm font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                selectedType === 'Commercial'
                  ? 'bg-[#0F172A] border-[#0F172A] text-white shadow-sm'
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
            >
              Commercial Offices
            </button>
          </div>

          {/* Filter Dropdowns Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-2 border-t border-slate-100">
            {/* City */}
            <div>
              <label htmlFor="filter-city" className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Metro / City
              </label>
              <select
                id="filter-city"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-sm text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#C5A059]"
              >
                <option value="">All Cities</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Delhi NCR">Delhi NCR</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Pune">Pune</option>
                <option value="Goa">Goa</option>
              </select>
            </div>

            {/* Property Type */}
            <div>
              <label htmlFor="filter-type" className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Type
              </label>
              <select
                id="filter-type"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-sm text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#C5A059]"
              >
                <option value="">All Types</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Penthouse">Penthouse</option>
                <option value="Commercial">Commercial</option>
                <option value="Plot">Plot / Land</option>
              </select>
            </div>

            {/* Buy / Rent */}
            <div>
              <label htmlFor="filter-transaction" className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Purpose
              </label>
              <select
                id="filter-transaction"
                value={selectedTransaction}
                onChange={(e) => setSelectedTransaction(e.target.value)}
                className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-sm text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#C5A059]"
              >
                <option value="">Buy or Rent</option>
                <option value="Buy">For Sale</option>
                <option value="Rent">For Rent</option>
              </select>
            </div>

            {/* Budget */}
            <div>
              <label htmlFor="filter-budget" className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Budget Range (₹)
              </label>
              <select
                id="filter-budget"
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
                className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-sm text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#C5A059]"
              >
                <option value="">Any Budget</option>
                <option value="under-1cr">Under ₹1 Cr</option>
                <option value="1cr-3cr">₹1 Cr – ₹3 Cr</option>
                <option value="3cr-6cr">₹3 Cr – ₹6 Cr</option>
                <option value="6cr-15cr">₹6 Cr – ₹15 Cr</option>
                <option value="above-15cr">Above ₹15 Cr</option>
              </select>
            </div>

            {/* Bedrooms (BHK) */}
            <div>
              <label htmlFor="filter-bhk" className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Bedrooms (BHK)
              </label>
              <select
                id="filter-bhk"
                value={selectedBhk}
                onChange={(e) => setSelectedBhk(e.target.value)}
                className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-sm text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#C5A059]"
              >
                <option value="">Any BHK</option>
                <option value="1">1 BHK</option>
                <option value="2">2 BHK</option>
                <option value="3">3 BHK</option>
                <option value="4">4 BHK</option>
                <option value="5+">5+ BHK</option>
              </select>
            </div>

            {/* Ready to Move Checkbox */}
            <div className="flex items-end pb-1.5">
              <label
                htmlFor="filter-ready-checkbox"
                className="flex items-center gap-2 cursor-pointer text-xs font-bold uppercase tracking-wider text-slate-700 select-none"
              >
                <input
                  id="filter-ready-checkbox"
                  type="checkbox"
                  checked={readyToMoveOnly}
                  onChange={(e) => setReadyToMoveOnly(e.target.checked)}
                  className="w-4 h-4 rounded-sm text-[#0F172A] accent-[#0F172A] cursor-pointer"
                />
                <span>Ready to Move</span>
              </label>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-xs sm:text-sm text-slate-600">
            Showing <strong className="text-[#0F172A] font-extrabold">{filteredProperties.length}</strong> verified properties across India
          </div>
          {activeFiltersCount > 0 && (
            <span className="text-[10px] bg-slate-100 text-[#0F172A] border border-slate-200 px-2.5 py-0.5 rounded-sm font-bold uppercase tracking-wider">
              {activeFiltersCount} Filter{activeFiltersCount > 1 ? 's' : ''} Active
            </span>
          )}
        </div>

        {/* Properties Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedProperties.map((prop) => (
              <PropertyCard
                key={prop.id}
                property={prop}
                onSelect={(p) => setSelectedProperty(p)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-sm border border-slate-200 p-12 text-center max-w-md mx-auto space-y-4">
            <div className="w-10 h-10 rounded-sm bg-slate-100 text-slate-500 flex items-center justify-center mx-auto">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold uppercase tracking-wider text-[#0F172A]">
              No matching properties found
            </h3>
            <p className="text-xs text-slate-500">
              Try adjusting your search criteria or resetting filters to explore our full inventory.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 bg-[#0F172A] text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-sm hover:bg-slate-800 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}

        {/* Pagination / Load More Button */}
        {filteredProperties.length > visibleCount && (
          <div className="text-center pt-10">
            <button
              type="button"
              id="properties-load-more-btn"
              onClick={() => setVisibleCount((prev) => prev + 3)}
              className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-[#0F172A] border border-slate-300 font-bold uppercase tracking-wider text-xs px-8 py-3 rounded-sm shadow-sm transition-all cursor-pointer"
            >
              <span>Load More Properties</span>
              <span className="text-xs text-slate-400">
                ({displayedProperties.length} of {filteredProperties.length})
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      <PropertyDetailModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        onRequestInquiry={(p, a) => {
          setSelectedProperty(null);
          setInquiryProperty(p);
          setInquiryAgent(a || null);
          setInquiryModalOpen(true);
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

