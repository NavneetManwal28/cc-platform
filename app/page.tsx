'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight, Radio, Crosshair, LineChart, Palette, PieChart, MapPin, Zap, Star, Rocket, CheckCircle2, TrendingUp, Users, BarChart3, Globe, Megaphone } from 'lucide-react';

/* Animated counter */
function useCounter(target: number, duration = 1500) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      let start = 0;
      const step = Math.ceil(target / (duration / 16));
      const timer = setInterval(() => {
        start += step;
        if (start >= target) { setCount(target); clearInterval(timer); }
        else setCount(start);
      }, 16);
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);
  return { count, ref };
}

function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, ref } = useCounter(value);
  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl sm:text-5xl font-bold text-cc-red">{count}{suffix}</div>
      <div className="mt-2 text-sm text-cc-silver uppercase tracking-wider font-medium">{label}</div>
    </div>
  );
}

const services = [
  { icon: Radio, title: 'Mass Media Campaigns', desc: 'TV, radio and OOH campaigns engineered for maximum reach and brand recall at scale.' },
  { icon: Crosshair, title: 'Precision Activations', desc: 'On-ground events, sampling and experiential touchpoints that turn browsers into buyers.' },
  { icon: LineChart, title: 'Revenue Growth', desc: 'Full-funnel growth strategy that connects your spend directly to measurable revenue.' },
  { icon: Palette, title: 'Creative & Branding', desc: 'Visual identity, messaging and creative direction built to stand out in a crowded market.' },
  { icon: PieChart, title: 'Insights & Reporting', desc: 'Live dashboards and deep analytics that tell you what is working and what to do next.' },
  { icon: MapPin, title: 'Territory Rollouts', desc: 'City-by-city expansion with local intelligence and boots-on-ground execution teams.' },
];

const pillars = [
  { icon: Zap, title: 'Digital Performance', points: ['Search, social & programmatic buying', 'Creative testing & iteration', 'Conversion rate optimisation', 'Automated reporting pipelines'] },
  { icon: Star, title: 'Creator Partnerships', points: ['Vetted influencer matchmaking', 'Content brief & quality control', 'Multi-platform distribution', 'Campaign ROI tracking'] },
  { icon: Rocket, title: 'Brand Acceleration', points: ['Go-to-market strategy', 'Competitive positioning', 'Channel mix planning', 'Scale-ready execution framework'] },
];

/* Desktop Hero Graphic */
function DesktopHeroGraphic() {
  return (
    <div className="hidden lg:flex flex-col gap-3 justify-center" style={{ minHeight: 480 }}>

      {/* Top row: big KPI + mini stat */}
      <div className="grid grid-cols-3 gap-3">
        {/* Main KPI */}
        <div className="col-span-2 bg-cc-dark rounded-xl p-6 flex flex-col justify-between" style={{ minHeight: 160 }}>
          <p className="text-xs text-gray-400 uppercase tracking-widest">Average Campaign ROI</p>
          <div>
            <p className="font-display text-5xl font-bold text-cc-red leading-none">+312%</p>
            <p className="text-xs text-gray-400 mt-2">across 500+ campaigns delivered</p>
          </div>
          {/* Simple upward line */}
          <svg viewBox="0 0 200 40" className="w-full mt-3 opacity-40">
            <polyline points="0,35 30,28 60,22 90,18 120,12 150,8 180,4 200,2" fill="none" stroke="#D0202A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        {/* Mini stat */}
        <div className="bg-cc-red rounded-xl p-5 flex flex-col justify-between text-white">
          <p className="text-xs text-red-200 uppercase tracking-widest">Cities</p>
          <p className="font-display text-4xl font-bold">18</p>
          <p className="text-xs text-red-200">Active markets</p>
        </div>
      </div>

      {/* Middle row: services checklist */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <p className="text-xs text-cc-silver uppercase tracking-widest mb-3">What CC Delivers</p>
        <div className="grid grid-cols-2 gap-x-6 gap-y-2">
          {['Mass Media Campaigns', 'Precision Activations', 'Revenue Growth Strategy', 'Creative & Branding', 'Insights & Reporting', 'Territory Rollouts'].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-cc-red flex-shrink-0" />
              <span className="text-xs font-medium text-cc-dark">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom row: 3 mini cards */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { val: '200+', label: 'Brands Served', bg: 'bg-cc-light border border-gray-200', text: 'text-cc-dark', sub: 'text-cc-silver' },
          { val: '500+', label: 'Campaigns Run', bg: 'bg-cc-charcoal', text: 'text-white', sub: 'text-gray-400' },
          { val: '96%', label: 'Repeat Partners', bg: 'bg-cc-light border border-gray-200', text: 'text-cc-dark', sub: 'text-cc-silver' },
        ].map(({ val, label, bg, text, sub }) => (
          <div key={label} className={`${bg} rounded-xl p-4`}>
            <p className={`font-display text-2xl font-bold ${text}`}>{val}</p>
            <p className={`text-xs mt-1 ${sub}`}>{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}


/* Mobile Banner 1 — light theme */
function Banner1() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md">
      <div className="bg-cc-light px-5 py-3 border-b border-gray-200 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-semibold text-cc-silver uppercase tracking-widest">CC Platform</p>
          <p className="text-sm font-bold text-cc-dark mt-0.5">Campaign Performance</p>
        </div>
        <div className="w-8 h-8 bg-cc-red rounded flex items-center justify-center">
          <TrendingUp size={14} className="text-white" />
        </div>
      </div>
      <div className="px-5 py-4">
        <div className="flex items-end gap-1.5 h-16 mb-3">
          {[30, 45, 35, 60, 50, 75, 65, 90, 80, 100].map((h, i) => (
            <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, backgroundColor: i === 9 ? '#D0202A' : i > 6 ? '#D0202A60' : '#e5e7eb' }} />
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[['200+', 'Brands'], ['18', 'Cities'], ['500+', 'Campaigns']].map(([val, lbl]) => (
            <div key={lbl} className="text-center bg-cc-light rounded-lg py-2">
              <p className="font-display text-base font-bold text-cc-red">{val}</p>
              <p className="text-[10px] text-cc-silver mt-0.5">{lbl}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-cc-dark px-4 py-2.5 text-center">
        <span className="text-xs text-gray-400 font-medium">Full-service marketing across India</span>
      </div>
    </div>
  );
}

/* Mobile Banner 2 — light theme, services */
function Banner2() {
  const items = [
    { label: 'Mass Media', color: 'bg-cc-red text-white' },
    { label: 'Precision Activations', color: 'bg-cc-dark text-white' },
    { label: 'Digital Performance', color: 'bg-gray-100 text-cc-dark border border-gray-200' },
    { label: 'Creator Partnerships', color: 'bg-gray-100 text-cc-dark border border-gray-200' },
    { label: 'Revenue Growth', color: 'bg-cc-dark text-white' },
    { label: 'Territory Rollouts', color: 'bg-cc-red text-white' },
  ];
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md">
      <div className="bg-cc-light px-5 py-3 border-b border-gray-200 text-center">
        <p className="text-[10px] font-semibold text-cc-silver uppercase tracking-widest">CC Framework</p>
        <p className="text-sm font-semibold text-cc-dark mt-0.5">What We Deliver</p>
      </div>
      <div className="grid grid-cols-2 gap-0 divide-x divide-y divide-gray-100">
        {items.map((item) => (
          <div key={item.label} className={`${item.color} p-3.5`}>
            <div className="flex items-center gap-1.5">
              <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${item.color.includes('white') && !item.color.includes('bg-gray') ? 'bg-red-300' : 'bg-cc-red'}`} />
              <span className="text-xs font-medium leading-snug">{item.label}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-cc-light px-4 py-2.5 text-center border-t border-gray-200">
        <span className="text-xs text-cc-grey font-medium">End-to-end execution across India</span>
      </div>
    </div>
  );
}

function MobileCarousel() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive(p => p === 0 ? 1 : 0), 4000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="block lg:hidden mb-10">
      <div className="overflow-hidden">
        <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${active * 100}%)` }}>
          <div className="w-full flex-shrink-0 px-1 py-2"><Banner1 /></div>
          <div className="w-full flex-shrink-0 px-1 py-2"><Banner2 /></div>
        </div>
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {[0, 1].map(i => (
          <button key={i} onClick={() => setActive(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${active === i ? 'bg-cc-red' : 'bg-gray-300'}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-24 px-4 sm:px-6 max-w-6xl mx-auto">
        <MobileCarousel />
        <div className="grid lg:grid-cols-2 gap-6 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-cc-light border border-gray-200 rounded-full px-4 py-1.5 mb-8">
              <div className="w-2 h-2 rounded-full bg-cc-red animate-pulse" />
              <span className="text-xs font-medium text-cc-grey uppercase tracking-widest">India's Growth Partner</span>
            </div>
            <h1 className="font-display text-3xl sm:text-5xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-cc-dark">
              Campaigns<br />
              <span className="text-cc-red">that convert.</span>
            </h1>
            <p className="mt-8 text-lg sm:text-xl text-cc-grey leading-relaxed max-w-xl">
              CC delivers above-the-line reach and below-the-line precision — full-service marketing that drives real business outcomes across India.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <Link href="/signup" className="inline-flex items-center justify-center gap-2 bg-cc-red text-white font-semibold px-8 py-3.5 rounded hover:bg-cc-crimson transition-colors">
                Become a Partner <ArrowRight size={18} />
              </Link>
              <Link href="/#services" className="inline-flex items-center justify-center gap-2 border-2 border-cc-dark text-cc-dark font-semibold px-8 py-3.5 rounded hover:border-cc-red hover:text-cc-red transition-colors">
                Our Services
              </Link>
            </div>
          </div>
          <DesktopHeroGraphic />
        </div>
      </section>

      {/* Animated Stats */}
      <section className="py-16 px-4 sm:px-6 bg-cc-dark">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-10">
          <StatCard value={200} suffix="+" label="Brands Served" />
          <StatCard value={18} suffix="" label="Cities Active" />
          <StatCard value={500} suffix="+" label="Campaigns Run" />
        </div>
      </section>

      <div className="h-1 bg-cc-red" />

      {/* Services */}
      <section id="services" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto scroll-mt-20">
        <div className="mb-14">
          <p className="text-xs font-semibold text-cc-red uppercase tracking-widest mb-3">What We Do</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-cc-dark">Six ways we grow your brand</h2>
          <p className="mt-4 text-cc-grey text-lg max-w-xl">From national broadcast to city-level activations — built for brands that want to win.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div key={s.title} className="group p-6 border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white">
              <div className="w-10 h-10 bg-cc-red flex items-center justify-center text-white mb-4">
                <s.icon size={20} />
              </div>
              <h3 className="font-display text-lg font-bold text-cc-dark">{s.title}</h3>
              <p className="mt-2 text-sm text-cc-grey leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pillars */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-cc-light">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-cc-red uppercase tracking-widest mb-3">Our Approach</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-cc-dark">Three engines of growth</h2>
            <p className="mt-4 text-cc-grey text-lg">Integrated capabilities that work together to scale your brand.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((p, i) => (
              <div key={p.title} className="bg-white p-8 border-t-4 border-cc-red shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-cc-dark flex items-center justify-center text-white"><p.icon size={20} /></div>
                  <span className="text-xs font-bold text-cc-silver uppercase tracking-widest">0{i + 1}</span>
                </div>
                <h3 className="font-display text-xl font-bold text-cc-dark mb-4">{p.title}</h3>
                <ul className="space-y-3">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 text-sm text-cc-grey">
                      <div className="w-1.5 h-1.5 rounded-full bg-cc-red mt-1.5 flex-shrink-0" />{pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-semibold text-cc-red uppercase tracking-widest mb-3">About CC</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-cc-dark leading-tight">
                Built by marketers,<br />for marketers
              </h2>
              <p className="mt-6 text-cc-grey leading-relaxed">
                CC was founded on a simple belief — great marketing should be accessible to every brand, not just the big ones. We combine sharp strategy with disciplined execution to help brands at every stage compete and grow.
              </p>
              <Link href="/about" className="inline-flex items-center gap-2 mt-8 text-sm font-semibold text-cc-red hover:gap-3 transition-all">
                Our story <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                ['ROI-first, not vanity metrics', 'bg-cc-red text-white'],
                ['Dedicated account manager for every partner', 'bg-cc-dark text-white'],
                ['Transparent reporting, no black boxes', 'bg-cc-light text-cc-dark border border-gray-200'],
                ['Pan-India growth partner network', 'bg-cc-light text-cc-dark border border-gray-200'],
              ].map(([text, cls]) => (
                <div key={text} className={`${cls} p-5`}>
                  <p className="text-sm font-medium leading-snug">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 px-6 sm:px-6 lg:px-8 bg-cc-dark">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-white">Ready to grow with CC?</h2>
          <p className="mt-4 text-cc-silver sm:text-lg">Sign up instantly and start uploading campaign assets to your dedicated dashboard.</p>
          <Link href="/signup" className="inline-flex items-center gap-2 mt-8 bg-cc-red text-white font-semibold px-8 py-3.5 rounded hover:bg-cc-crimson transition-colors">
            Get Started Now <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
