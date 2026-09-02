import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import {
  Phone,
  Menu,
  X,
  ShieldCheck,
  ArrowUpRight,
  MessageCircle,
} from 'lucide-react';

interface NavbarProps {
  onOpenConsultation?: () => void;
}

export default function Navbar({ onOpenConsultation }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Properties', path: '/properties' },
    { name: 'About', path: '/about' },
    { name: 'Agents', path: '/agents' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* Top utility bar with trust credential & direct helpline */}
      <div id="top-trust-bar" className="bg-[#0F172A] text-slate-300 text-xs py-2 px-4 sm:px-10 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold text-[11px] uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% RERA Registered Partnership
            </span>
            <span className="hidden md:inline text-slate-700">|</span>
            <span className="hidden md:inline text-[11px] text-slate-400 tracking-wide">
              MahaRERA: A51900028491 &bull; KA RERA: PRM/KA/1251
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-300 text-xs">
            <a
              href="tel:+919820154321"
              id="top-phone-link"
              className="inline-flex items-center gap-1.5 hover:text-[#C5A059] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#C5A059]" />
              <span>+91 98201 54321</span>
            </a>
            <span className="text-slate-700">|</span>
            <a
              href="https://wa.me/919820154321?text=Hello%20Horizon%20Estates,%20I%20am%20interested%20in%20property%20consultation."
              target="_blank"
              rel="noopener noreferrer"
              id="top-whatsapp-link"
              className="inline-flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
            >
              <MessageCircle className="w-3 h-3 text-emerald-400" />
              <span>WhatsApp Desk</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        id="main-navbar-header"
        className={`sticky top-0 z-40 transition-all duration-200 bg-white border-b border-slate-200 ${
          isScrolled ? 'shadow-sm py-2.5 sm:py-3' : 'py-3 sm:py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between">
            {/* Geometric Diamond Logo */}
            <Link
              to="/"
              id="nav-brand-logo"
              className="flex items-center gap-3 group focus:outline-none"
            >
              <div className="w-8 h-8 bg-[#0F172A] flex items-center justify-center rounded-sm rotate-45 group-hover:bg-slate-800 transition-transform duration-200 shadow-sm">
                <span className="text-white -rotate-45 font-black text-base">H</span>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight uppercase text-[#0F172A] leading-none">
                  Horizon <span className="text-[#C5A059]">Estates</span>
                </span>
                <span className="text-[9px] tracking-widest uppercase text-slate-400 font-semibold mt-1">
                  Premier Advisory &bull; India
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav id="desktop-nav-menu" className="hidden lg:flex items-center gap-8 xl:gap-10">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  id={`nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className={({ isActive }) =>
                    `text-sm font-semibold tracking-tight transition-colors h-14 flex items-center border-b-2 ${
                      isActive
                        ? 'border-[#C5A059] text-[#0F172A] font-bold mt-[2px]'
                        : 'border-transparent text-slate-500 hover:text-[#0F172A]'
                    }`
                  }
                  end={link.path === '/'}
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            {/* Right Action CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                to="/contact"
                id="nav-consultation-btn"
                className="inline-flex items-center justify-center gap-2 bg-[#C5A059] hover:bg-[#B38F48] text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-5 py-2.5 rounded-sm shadow-sm hover:shadow transition-all duration-150"
              >
                <span>List Property</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex items-center gap-2 lg:hidden">
              <Link
                to="/contact"
                id="mobile-quick-contact-btn"
                className="text-[11px] bg-[#C5A059] text-white font-bold uppercase tracking-wider px-3 py-1.5 rounded-sm"
              >
                Enquire
              </Link>
              <button
                type="button"
                id="mobile-menu-toggle-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-sm text-slate-700 hover:bg-slate-100 focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-[#0F172A]" />
                ) : (
                  <Menu className="w-6 h-6 text-[#0F172A]" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div id="mobile-nav-drawer" className="lg:hidden border-t border-slate-200 bg-white shadow-xl">
            <div className="px-4 pt-3 pb-6 space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  id={`mobile-nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className={({ isActive }) =>
                    `block px-3 py-2.5 rounded-sm text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-amber-50/70 text-[#0F172A] font-bold border-l-4 border-[#C5A059]'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`
                  }
                  end={link.path === '/'}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </NavLink>
              ))}

              <div className="pt-4 mt-2 border-t border-slate-100 flex flex-col gap-2">
                <Link
                  to="/contact"
                  id="mobile-drawer-contact-cta"
                  className="w-full flex items-center justify-center gap-2 bg-[#C5A059] hover:bg-[#B38F48] text-white text-xs font-bold uppercase tracking-wider py-3 rounded-sm shadow-sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>Book Private Consultation</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 px-1">
                  <span>Mumbai &bull; Bengaluru &bull; Delhi NCR</span>
                  <span>+91 98201 54321</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

