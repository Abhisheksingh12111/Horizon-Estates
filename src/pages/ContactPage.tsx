import { useState, type FormEvent } from 'react';
import { OFFICE_LOCATIONS } from '../data/company';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Send,
  CheckCircle2,
  MessageCircle,
  Lock,
  ArrowUpRight,
} from 'lucide-react';

export default function ContactPage() {
  const [selectedOfficeCity, setSelectedOfficeCity] = useState(OFFICE_LOCATIONS[0].city);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: 'Mumbai',
    propertyInterest: 'Residential Luxury Apartment / Penthouse',
    budgetRange: '₹3 Cr – ₹6 Crore',
    message: '',
    preferredCallback: 'Morning (10 AM – 1 PM)',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentOffice =
    OFFICE_LOCATIONS.find((o) => o.city === selectedOfficeCity) || OFFICE_LOCATIONS[0];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      email: '',
      city: 'Mumbai',
      propertyInterest: 'Residential Luxury Apartment / Penthouse',
      budgetRange: '₹3 Cr – ₹6 Crore',
      message: '',
      preferredCallback: 'Morning (10 AM – 1 PM)',
    });
  };

  return (
    <div className="py-8 sm:py-10 space-y-12 max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 bg-[#F8FAFC]">
      {/* 1. Header Banner */}
      <div className="bg-[#0F172A] text-white rounded-sm p-8 sm:p-12 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-slate-900 border border-slate-700 text-[#C5A059] text-[10px] font-bold uppercase tracking-wider mb-3">
            <span className="w-1.5 h-1.5 bg-[#C5A059] rotate-45" />
            <span>National Advisory Network</span>
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white">
            Connect with Our Advisory Desks
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed font-normal">
            Whether you are evaluating a prime home purchase, seeking Grade-A commercial leasing, or managing an NRI portfolio, our senior consultants are ready to assist.
          </p>
        </div>

        {/* Quick Contacts Bar */}
        <div className="mt-8 pt-6 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <a
            href="tel:+919820154321"
            id="contact-page-phone-btn"
            className="flex items-center gap-3 p-3 bg-slate-900 hover:bg-slate-850 rounded-sm border border-slate-700 transition-colors"
          >
            <div className="w-8 h-8 rounded-sm bg-slate-950 text-[#C5A059] border border-slate-700 flex items-center justify-center shrink-0">
              <Phone className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wider">Direct Helpline</span>
              <span className="font-bold uppercase tracking-wider text-white text-xs">+91 98201 54321</span>
            </div>
          </a>

          <a
            href="https://wa.me/919820154321?text=Hello%20Horizon%20Estates,%20I%20would%20like%20to%20schedule%20a%20property%20consultation."
            target="_blank"
            rel="noopener noreferrer"
            id="contact-page-whatsapp-btn"
            className="flex items-center gap-3 p-3 bg-slate-900 hover:bg-slate-850 rounded-sm border border-slate-700 transition-colors text-emerald-400"
          >
            <div className="w-8 h-8 rounded-sm bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 flex items-center justify-center shrink-0">
              <MessageCircle className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wider">WhatsApp Advisory</span>
              <span className="font-bold uppercase tracking-wider text-emerald-400 text-xs">Start Live Chat</span>
            </div>
          </a>

          <a
            href="mailto:advisory@horizonestates.in"
            id="contact-page-email-btn"
            className="flex items-center gap-3 p-3 bg-slate-900 hover:bg-slate-850 rounded-sm border border-slate-700 transition-colors"
          >
            <div className="w-8 h-8 rounded-sm bg-slate-950 text-[#C5A059] border border-slate-700 flex items-center justify-center shrink-0">
              <Mail className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wider">Confidential Desk</span>
              <span className="font-bold text-white text-xs">advisory@horizonestates.in</span>
            </div>
          </a>
        </div>
      </div>

      {/* 2. Main Grid: Contact Form (Left) + Office Directory & Map (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Interactive Enquiry Form */}
        <div className="lg:col-span-7 bg-white rounded-sm p-6 sm:p-10 border border-slate-200 shadow-sm">
          {isSubmitted ? (
            <div id="contact-success-state" className="text-center py-10 space-y-5">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-700 rounded-sm border border-emerald-200 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-[#0F172A]">
                Consultation Request Received
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-[#0F172A]">{formData.name}</strong>. Your enquiry for <strong className="text-[#0F172A]">{formData.propertyInterest}</strong> has been assigned to our Senior Advisor in {formData.city}.
              </p>
              <div className="bg-[#F8FAFC] border border-slate-200 rounded-sm p-5 text-xs text-slate-700 text-left space-y-2 max-w-md mx-auto">
                <p><strong>Tracking Ticket:</strong> HRZ-{Math.floor(100000 + Math.random() * 900000)}</p>
                <p><strong>Callback Contact:</strong> +91 {formData.phone}</p>
                <p><strong>Preferred Window:</strong> {formData.preferredCallback}</p>
                <p><strong>Guaranteed Response:</strong> Within 2 business hours</p>
              </div>
              <button
                type="button"
                id="contact-submit-another-btn"
                onClick={handleReset}
                className="bg-[#0F172A] hover:bg-slate-800 text-white font-bold uppercase tracking-wider text-xs px-6 py-3 rounded-sm transition-colors cursor-pointer"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} id="contact-enquiry-form" className="space-y-5">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A059] bg-[#0F172A] px-2.5 py-1 rounded-sm inline-block mb-2">
                  Direct Enquiry
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-[#0F172A]">
                  Request a Private Consultation
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Fill out your requirements and our licensed portfolio manager will connect with you.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    id="contact-name"
                    placeholder="e.g. Vikramaditya Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border border-slate-300 rounded-sm px-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Phone Number *
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-sm border border-r-0 border-slate-300 bg-slate-100 text-slate-700 text-xs font-bold">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      id="contact-phone"
                      placeholder="98201 54321"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full border border-slate-300 rounded-r-sm px-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    id="contact-email"
                    placeholder="vikram@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border border-slate-300 rounded-sm px-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Target City / Metro *
                  </label>
                  <select
                    id="contact-city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full border border-slate-300 rounded-sm px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 bg-white focus:outline-none focus:border-[#C5A059]"
                  >
                    <option value="Mumbai">Mumbai (Worli, BKC, Bandra)</option>
                    <option value="Bengaluru">Bengaluru (Indiranagar, Whitefield)</option>
                    <option value="Delhi NCR">Delhi NCR / Gurugram</option>
                    <option value="Hyderabad">Hyderabad (Jubilee Hills, HITEC)</option>
                    <option value="Pune">Pune (Koregaon Park, Baner)</option>
                    <option value="Goa">Goa (Assagao, Holiday Villas)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Property Interest *
                  </label>
                  <select
                    id="contact-interest"
                    value={formData.propertyInterest}
                    onChange={(e) => setFormData({ ...formData, propertyInterest: e.target.value })}
                    className="w-full border border-slate-300 rounded-sm px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 bg-white focus:outline-none focus:border-[#C5A059]"
                  >
                    <option value="Residential Luxury Apartment / Penthouse">Residential Luxury Apartment / Penthouse</option>
                    <option value="Independent Gated Villa">Independent Gated Villa</option>
                    <option value="Grade-A Commercial Office / Floor">Grade-A Commercial Office / Floor</option>
                    <option value="Prime Gated Plot / Land">Prime Gated Plot / Land</option>
                    <option value="NRI Portfolio Advisory">NRI Portfolio Advisory</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Budget Range (₹) *
                  </label>
                  <select
                    id="contact-budget"
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                    className="w-full border border-slate-300 rounded-sm px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 bg-white focus:outline-none focus:border-[#C5A059]"
                  >
                    <option value="Under ₹1 Crore">Under ₹1 Crore</option>
                    <option value="₹1 Cr – ₹3 Crore">₹1 Cr – ₹3 Crore</option>
                    <option value="₹3 Cr – ₹6 Crore">₹3 Cr – ₹6 Crore</option>
                    <option value="₹6 Cr – ₹15 Crore">₹6 Cr – ₹15 Crore</option>
                    <option value="Above ₹15 Crore">Above ₹15 Crore</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Specific Requirements or Property Preferences
                </label>
                <textarea
                  rows={4}
                  id="contact-message"
                  placeholder="Share details such as preferred BHK, carpet area, possession timeline, or specific projects you are considering..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full border border-slate-300 rounded-sm px-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]"
                ></textarea>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>Zero spam guarantee. 100% confidential client fiduciary advisory.</span>
              </div>

              <button
                type="submit"
                id="contact-submit-btn"
                className="w-full bg-[#C5A059] hover:bg-[#B38F48] text-white font-bold uppercase tracking-wider text-xs py-3.5 rounded-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Consultation Request</span>
              </button>
            </form>
          )}
        </div>

        {/* Right: Office Directory & Map Placeholder */}
        <div className="lg:col-span-5 space-y-6">
          {/* Office Switcher Card */}
          <div className="bg-white rounded-sm p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A059] bg-[#0F172A] px-2.5 py-1 rounded-sm inline-block mb-2">
                Flagship Offices
              </span>
              <h3 className="text-lg font-bold uppercase tracking-wider text-[#0F172A]">
                Visit Our Advisory Suites
              </h3>
            </div>

            {/* City Tabs */}
            <div className="flex flex-wrap gap-2">
              {OFFICE_LOCATIONS.map((loc) => (
                <button
                  key={loc.city}
                  type="button"
                  onClick={() => setSelectedOfficeCity(loc.city)}
                  className={`text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-sm transition-colors cursor-pointer ${
                    selectedOfficeCity === loc.city
                      ? 'bg-[#0F172A] text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {loc.city.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Selected Office Details */}
            <div className="space-y-4 pt-2 border-t border-slate-100 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#0F172A] block font-bold uppercase tracking-wider text-[10px] mb-0.5">Address:</strong>
                  <p className="text-slate-600 leading-relaxed">{currentOffice.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#0F172A] block font-bold uppercase tracking-wider text-[10px] mb-0.5">Working Hours:</strong>
                  <p className="text-slate-600">{currentOffice.workingHours}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#0F172A] block font-bold uppercase tracking-wider text-[10px] mb-0.5">Direct Line:</strong>
                  <p className="text-slate-600 font-bold">{currentOffice.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#0F172A] block font-bold uppercase tracking-wider text-[10px] mb-0.5">RERA Registration:</strong>
                  <p className="text-emerald-800 font-mono text-[10px] font-bold">{currentOffice.reraNumber}</p>
                </div>
              </div>
            </div>

            {/* Visual Interactive Map Placeholder */}
            <div className="relative rounded-sm overflow-hidden border border-slate-200 aspect-[16/10] bg-[#0F172A]">
              <img
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80"
                alt="Map Locality View"
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 bg-[#0F172A]/50 backdrop-blur-[1px] flex flex-col items-center justify-center p-4 text-center text-white">
                <div className="w-10 h-10 rounded-sm bg-[#C5A059] text-white flex items-center justify-center font-bold mb-2 shadow-lg">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="font-bold uppercase tracking-wider text-xs text-white">{currentOffice.city}</span>
                <span className="text-[10px] text-slate-300 mt-0.5">GPS: {currentOffice.coordinates.lat.toFixed(4)}, {currentOffice.coordinates.lng.toFixed(4)}</span>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(currentOffice.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider bg-white text-[#0F172A] px-3 py-1.5 rounded-sm hover:bg-slate-100 transition-colors shadow-sm"
                >
                  <span>Open in Google Maps</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

