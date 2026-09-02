import { Milestone, Feature, OfficeLocation, Testimonial } from '../types';

export const COMPANY_STATS = [
  { value: '500+', label: 'Properties Sold', subtext: 'Across Prime Indian Metros' },
  { value: '15+', label: 'Years Experience', subtext: 'Established in 2009' },
  { value: '98%', label: 'Client Satisfaction', subtext: 'Verified by Audit' },
  { value: '100%', label: 'RERA Registered', subtext: 'Legal Title Guarantee' },
];

export const WHY_CHOOSE_US: Feature[] = [
  {
    iconName: 'ShieldCheck',
    title: '100% RERA Verified Inventory',
    description: 'Every single residential, villa, and commercial listing undergoes rigorous 40-point legal, zoning, and title verification by our in-house legal counsel before listing.',
  },
  {
    iconName: 'Scale',
    title: 'Zero Hidden Fees & Direct Pricing',
    description: 'We believe in absolute transparency. You get developer-direct pricing, clear statutory breakdowns (GST, Stamp Duty, Registration), and transparent fee terms.',
  },
  {
    iconName: 'FileText',
    title: 'In-House Legal & Due Diligence',
    description: 'Our senior property lawyers handle title search reports, mother deed verifications, encumbrance certificates, and agreement drafting without third-party delays.',
  },
  {
    iconName: 'Building2',
    title: 'Curated Luxury Portfolio',
    description: 'We don’t list everything—only handpicked, high-growth, high-quality developments from tier-1 developers and reputable private sellers with verified track records.',
  },
  {
    iconName: 'BadgePercent',
    title: 'Priority Home Loan Assistance',
    description: 'Direct tie-ups with HDFC, SBI, ICICI, and Axis Bank for preferential home loan interest rates, accelerated document approvals, and door-step processing.',
  },
  {
    iconName: 'Headphones',
    title: 'Post-Handover Concierge',
    description: 'From interior design referrals and utility meter transfers to tenant management and property maintenance, our dedicated advisory relationship continues post-purchase.',
  },
];

export const COMPANY_MILESTONES: Milestone[] = [
  {
    year: '2009',
    title: 'Founded in Mumbai',
    description: 'Horizon Estates was founded by real estate veterans with a singular vision: bringing uncompromised transparency and ethics to Indian luxury property advisory.',
  },
  {
    year: '2013',
    title: 'Expansion into Bengaluru & Pune',
    description: 'Established flagship offices in Bengaluru (Indiranagar) and Pune (Koregaon Park) to cater to tech leaders, startup founders, and institutional investors.',
  },
  {
    year: '2017',
    title: 'Pioneered 100% RERA Compliance',
    description: 'Became one of the first real estate advisory firms in India to mandate 100% RERA registration for all listed projects, establishing an industry benchmark.',
  },
  {
    year: '2020',
    title: 'Digital High-Definition Virtual Tours',
    description: 'Launched 3D immersive virtual walkthroughs and remote digital documentation for NRI clients across the US, UK, UAE, and Singapore.',
  },
  {
    year: '2023',
    title: '500th Landmark Property Milestone',
    description: 'Crossed ₹3,500+ Crore in cumulative property advisory transactions with 500+ luxury homes, penthouses, and corporate offices delivered.',
  },
  {
    year: '2025',
    title: 'National Luxury & NRI Wealth Advisory',
    description: 'Expanded specialized advisory desk covering Goa coastal estates, Delhi NCR trophy residences, and bespoke family-office property portfolios.',
  },
];

export const OFFICE_LOCATIONS: OfficeLocation[] = [
  {
    city: 'Mumbai (Headquarters)',
    isHeadquarters: true,
    address: 'Horizon Tower, Level 14, G Block, Bandra Kurla Complex (BKC), Mumbai, Maharashtra 400051',
    phone: '+91 (022) 6982 4000 / +91 98201 54321',
    email: 'mumbai@horizonestates.in',
    workingHours: 'Mon – Sat: 9:30 AM – 7:30 PM (IST) | Sunday: By Appointment',
    reraNumber: 'MAHARERA Reg. No: A51900028491',
    coordinates: { lat: 19.0667, lng: 72.8687 },
  },
  {
    city: 'Bengaluru',
    isHeadquarters: false,
    address: 'Regency Enclave, 3rd Floor, 100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038',
    phone: '+91 (080) 4120 7800 / +91 98450 78219',
    email: 'bengaluru@horizonestates.in',
    workingHours: 'Mon – Sat: 9:30 AM – 7:00 PM (IST)',
    reraNumber: 'Karnataka RERA Reg: PRM/KA/RERA/1251/AGENT/00912',
    coordinates: { lat: 12.9784, lng: 77.6408 },
  },
  {
    city: 'Delhi NCR (Gurugram)',
    isHeadquarters: false,
    address: 'Horizon Executive Suites, 7th Floor, Golf Course Extension Road, Sector 58, Gurugram, Haryana 122011',
    phone: '+91 (0124) 4890 220 / +91 98112 34980',
    email: 'delhincr@horizonestates.in',
    workingHours: 'Mon – Sat: 10:00 AM – 7:00 PM (IST)',
    reraNumber: 'HRERA Reg. No: HARERA/GGM/2018/AG-441',
    coordinates: { lat: 28.4116, lng: 77.0984 },
  },
  {
    city: 'Hyderabad',
    isHeadquarters: false,
    address: 'Pavani Vantage, Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033',
    phone: '+91 (040) 6744 1100 / +91 99490 12384',
    email: 'hyderabad@horizonestates.in',
    workingHours: 'Mon – Sat: 9:30 AM – 7:00 PM (IST)',
    reraNumber: 'TS RERA Reg. No: TSRERA/AG/2019/00481',
    coordinates: { lat: 17.4319, lng: 78.4073 },
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Dr. Alok & Sunita Singhal',
    role: 'Senior Cardiac Surgeon & Medical Director',
    city: 'Mumbai',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    quote: 'Horizon Estates turned what could have been an overwhelming luxury purchase in Worli into a tranquil, seamless journey. Vikram’s team verified 30 years of title records, negotiated developer terms with utmost poise, and handled everything down to registry day.',
    propertyPurchased: '4-BHK Penthouse, Worli',
    rating: 5,
  },
  {
    id: 'test-2',
    name: 'Karthik & Sneha Ramaswamy',
    role: 'Tech Executive (Ex-Google, Bengaluru)',
    city: 'Bengaluru',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    quote: 'Being based in California while buying a gated villa in Bengaluru seemed fraught with legal risks. Ananya and the Horizon team sent HD drone walkthroughs, executed digital power-of-attorney flawlessly, and secured our dream home with 100% peace of mind.',
    propertyPurchased: '5-BHK Luxury Villa, Indiranagar',
    rating: 5,
  },
  {
    id: 'test-3',
    name: 'Rohan Oberoi',
    role: 'Managing Partner, Venture Capital Fund',
    city: 'Delhi NCR',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    quote: 'Professionalism, speed, and discretion are rare in Indian real estate. Rajeev Malhotra from Horizon Estates delivered all three when acquiring our new corporate office in BKC and personal residence in DLF Phase 5.',
    propertyPurchased: 'Camellias Residence & BKC Office',
    rating: 5,
  },
];
