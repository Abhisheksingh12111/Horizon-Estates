import { useState, type FormEvent } from 'react';
import { Property, Agent } from '../types';
import {
  X,
  Send,
  CheckCircle2,
  Building,
  Lock,
} from 'lucide-react';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  property?: Property | null;
  agent?: Agent | null;
}

export default function InquiryModal({
  isOpen,
  onClose,
  property,
  agent,
}: InquiryModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: 'Mumbai',
    preferredDate: '',
    interestType: property ? `Inquiry for ${property.title}` : 'General Advisory',
    budgetRange: property ? property.priceFormatted : '₹1 Cr - ₹3 Cr',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div
      id="inquiry-modal-overlay"
      className="fixed inset-0 z-50 bg-[#0F172A]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="inquiry-modal-container"
        className="bg-white rounded-sm max-w-lg w-full overflow-hidden shadow-2xl border border-slate-300 relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0F172A] text-white p-6 relative">
          <button
            type="button"
            id="close-inquiry-modal-btn"
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-sm hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-[#C5A059] text-[10px] font-bold uppercase tracking-wider mb-1">
            <Building className="w-3.5 h-3.5" />
            <span>Horizon Estates Advisory</span>
          </div>

          <h2 className="text-xl font-extrabold uppercase tracking-tight">
            {property ? `Request Private Viewing` : `Schedule Consultation`}
          </h2>

          {property && (
            <p className="text-xs text-slate-300 mt-1 truncate">
              {property.title} &bull; {property.location} ({property.priceFormatted})
            </p>
          )}

          {agent && (
            <div className="flex items-center gap-3 mt-3 pt-3 border-t border-slate-800 text-xs text-slate-300">
              <img
                src={agent.image}
                alt={agent.name}
                className="w-8 h-8 rounded-sm object-cover border border-[#C5A059]"
              />
              <div>
                <p className="font-bold text-white">{agent.name}</p>
                <p className="text-[10px] text-slate-400">{agent.designation}</p>
              </div>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="p-6">
          {submitted ? (
            <div id="inquiry-success-view" className="text-center py-6 space-y-4">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-sm flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0F172A] uppercase tracking-wider">
                Enquiry Successfully Registered
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
                Thank you, <strong className="text-slate-900">{formData.name || 'Valued Client'}</strong>. Our senior property advisor will reach out to you via <strong className="text-slate-900">{formData.phone || 'phone'}</strong> within 2 hours.
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-sm p-3 text-xs text-slate-600 text-left space-y-1">
                <p><strong>Reference:</strong> HRZ-{Math.floor(100000 + Math.random() * 900000)}</p>
                <p><strong>Direct Helpline:</strong> +91 98201 54321</p>
                <p><strong>RERA Desk:</strong> advisory@horizonestates.in</p>
              </div>
              <button
                type="button"
                id="inquiry-done-btn"
                onClick={handleReset}
                className="w-full bg-[#0F172A] hover:bg-slate-800 text-white font-bold uppercase tracking-wider py-2.5 rounded-sm transition-colors cursor-pointer text-xs"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} id="inquiry-form-body" className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rajesh Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-slate-300 rounded-sm px-3.5 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Phone Number *
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-2.5 rounded-l-sm border border-r-0 border-slate-300 bg-slate-50 text-slate-600 text-xs font-bold">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      placeholder="98201 54321"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full border border-slate-300 rounded-r-sm px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="rajesh@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border border-slate-300 rounded-sm px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Preferred City / Market
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full border border-slate-300 rounded-sm px-3 py-2 text-xs font-semibold text-slate-900 bg-white focus:outline-none focus:border-[#C5A059]"
                  >
                    <option value="Mumbai">Mumbai (Worli, BKC, Bandra)</option>
                    <option value="Bengaluru">Bengaluru (Indiranagar, Whitefield)</option>
                    <option value="Delhi NCR">Delhi NCR / Gurugram</option>
                    <option value="Hyderabad">Hyderabad (Jubilee Hills, HITEC)</option>
                    <option value="Pune">Pune (Koregaon Park, Baner)</option>
                    <option value="Goa">Goa (Assagao, Holiday Villas)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Preferred Visit Date
                  </label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full border border-slate-300 rounded-sm px-3 py-2 text-xs font-semibold text-slate-900 bg-white focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Specific Requirements / Message
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us your requirements, preferred BHK, budget, or timeline..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full border border-slate-300 rounded-sm px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#C5A059]"
                ></textarea>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500 py-1">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>Your information is encrypted and strictly confidential.</span>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-1/3 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold uppercase tracking-wider py-2.5 rounded-sm transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="submit-inquiry-btn"
                  className="w-2/3 bg-[#C5A059] hover:bg-[#B38F48] text-white text-xs font-bold uppercase tracking-wider py-2.5 rounded-sm flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Inquiry</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

