import { useState } from 'react';
import { AGENTS_DATA } from '../data/agents';
import { Agent } from '../types';
import InquiryModal from '../components/InquiryModal';
import {
  Phone,
  MessageCircle,
  ShieldCheck,
  Star,
  Award,
  Languages,
  Calendar,
} from 'lucide-react';

export default function AgentsPage() {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [cityFilter, setCityFilter] = useState('All');

  const filteredAgents = AGENTS_DATA.filter((agent) => {
    if (cityFilter === 'All') return true;
    return agent.cities.includes(cityFilter);
  });

  const handleContactAgent = (agent: Agent) => {
    setSelectedAgent(agent);
    setInquiryModalOpen(true);
  };

  return (
    <div className="py-8 sm:py-10 space-y-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 bg-[#F8FAFC]">
      {/* Header Banner */}
      <div className="bg-[#0F172A] text-white rounded-sm p-8 sm:p-12 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-slate-900 border border-slate-700 text-[#C5A059] text-[10px] font-bold uppercase tracking-wider mb-3">
            <span className="w-1.5 h-1.5 bg-[#C5A059] rotate-45" />
            <span>Licensed Real Estate Specialists</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
            Meet Our Senior Advisory Team
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
            Our advisors combine deep micro-market intelligence with certified RERA registrations, providing unbiased, confidential consultation for prime acquisitions.
          </p>
        </div>

        {/* City Filter Pills */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mr-2">Territory:</span>
          {['All', 'Mumbai', 'Bengaluru', 'Delhi NCR', 'Hyderabad', 'Pune', 'Goa'].map((city) => (
            <button
              key={city}
              type="button"
              id={`agent-filter-${city.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setCityFilter(city)}
              className={`text-xs px-3 py-1 rounded-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                cityFilter === city
                  ? 'bg-[#C5A059] text-white shadow-sm'
                  : 'bg-slate-900 border border-slate-700 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* Agents Grid (6 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAgents.map((agent) => (
          <div
            key={agent.id}
            id={`agent-card-${agent.id}`}
            className="bg-white rounded-sm border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between"
          >
            {/* Top Profile Header */}
            <div>
              <div className="relative aspect-[16/11] overflow-hidden bg-slate-100">
                <img
                  src={agent.image}
                  alt={agent.name}
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-transparent to-transparent" />

                <div className="absolute bottom-3 left-3 right-3 text-white flex items-end justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-[11px] text-[#C5A059] font-bold mb-0.5">
                      <Star className="w-3.5 h-3.5 fill-[#C5A059]" />
                      <span>{agent.rating} ({agent.reviewsCount} reviews)</span>
                    </div>
                    <span className="text-[10px] bg-[#0F172A]/90 px-2 py-0.5 rounded-sm text-emerald-400 font-bold uppercase tracking-wider">
                      {agent.experienceYears}+ Yrs Exp
                    </span>
                  </div>

                  <span className="text-[10px] bg-white text-[#0F172A] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm">
                    {agent.propertiesListedCount} Listings
                  </span>
                </div>
              </div>

              {/* Body Info */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-base font-bold text-[#0F172A]">
                    {agent.name}
                  </h3>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#C5A059] mt-0.5">
                    {agent.designation}
                  </p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {agent.bio}
                </p>

                {/* Specialization & Languages */}
                <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                  <div className="flex items-start gap-2">
                    <Award className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Specialization</span>
                      <span className="font-semibold text-slate-800">{agent.specialization}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Languages className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Languages</span>
                      <span className="text-slate-700">{agent.languages.join(', ')}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-[10px] text-emerald-800 font-bold uppercase tracking-wider bg-emerald-50 px-2.5 py-1.5 rounded-sm border border-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{agent.reraRegNumber}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="p-6 pt-0 space-y-2">
              <button
                type="button"
                id={`btn-consult-${agent.id}`}
                onClick={() => handleContactAgent(agent)}
                className="w-full bg-[#0F172A] hover:bg-slate-800 text-white font-bold uppercase tracking-wider text-xs py-2.5 rounded-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Book 1-on-1 Consultation</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${agent.phone.replace(/\s+/g, '')}`}
                  className="flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider py-2 rounded-sm transition-colors"
                >
                  <Phone className="w-3 h-3 text-slate-600" />
                  <span>Call</span>
                </a>

                <a
                  href={`https://wa.me/${agent.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(agent.name)},%20I%20would%20like%20to%20consult%20on%20properties.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold uppercase tracking-wider py-2 rounded-sm transition-colors"
                >
                  <MessageCircle className="w-3 h-3 text-emerald-600" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Team Trust Footer Banner */}
      <div className="bg-white border border-slate-200 rounded-sm p-6 sm:p-8 text-center max-w-3xl mx-auto space-y-3">
        <ShieldCheck className="w-8 h-8 text-emerald-700 mx-auto" />
        <h3 className="text-base font-bold uppercase tracking-wider text-[#0F172A]">
          Strict Regulatory &amp; Fiduciary Standards
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          Every advisor at Horizon Estates is formally registered under the Real Estate Regulatory Authority (RERA) with background checks and adhering to strict anti-conflict fiduciary principles.
        </p>
      </div>

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        agent={selectedAgent}
      />
    </div>
  );
}

