'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight, Lightbulb, Handshake, BarChart2, Shield, Clock, Heart } from 'lucide-react';

const values = [
  { icon: Lightbulb, title: 'Creativity with Purpose', desc: 'Ideas are only as good as the results they produce. We bring creative thinking to every brief, then back it with execution that delivers.' },
  { icon: Handshake, title: 'Radical Transparency', desc: 'No jargon, no hidden fees, no vanity metrics. You always know exactly what we are doing, why, and what it is worth.' },
  { icon: BarChart2, title: 'Obsessed with ROI', desc: 'Every decision we make is anchored to one question: does this move the needle for our partners business?' },
  { icon: Shield, title: 'Reliability at Scale', desc: 'From a single-city launch to a national rollout, we deliver on time, on brief, and on budget every time.' },
  { icon: Clock, title: 'Speed to Market', desc: 'Marketing windows open and close fast. We move quickly without cutting corners, so you are always first to the opportunity.' },
  { icon: Heart, title: 'Partner-First Culture', desc: 'We do not have clients. We have partners. That means your growth is our growth and we are in it for the long haul.' },
];

const stats = [['200+', 'Brands Served'], ['18', 'Cities Active'], ['₹50Cr+', 'Media Managed'], ['4.9★', 'Partner Rating']];

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 px-4 sm:px-6 max-w-5xl mx-auto">
        <p className="text-xs font-semibold text-cc-red uppercase tracking-widest mb-4">About CC</p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-cc-dark leading-tight">
          Built by marketers,<br /><span className="text-cc-red">for marketers</span>
        </h1>
        <p className="mt-6 text-lg text-cc-grey leading-relaxed max-w-2xl">
          CC was founded on a simple belief — great marketing should not be reserved for big budgets. We combine sharp strategy, creative craft and disciplined execution to help brands at every stage compete, grow and win.
        </p>
      </section>

      {/* Stats */}
      <section className="bg-cc-dark py-12 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map(([stat, label]) => (
            <div key={label}>
              <div className="font-display text-3xl font-bold text-cc-red">{stat}</div>
              <div className="mt-1 text-sm text-cc-silver uppercase tracking-wider">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="h-1 bg-cc-red" />

      {/* Mission & Vision */}
      <section className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-cc-red p-8 text-white">
            <p className="text-xs font-bold uppercase tracking-widest text-red-200 mb-4">Our Mission</p>
            <h2 className="font-display text-2xl font-bold mb-4">Make every rupee of marketing spend count</h2>
            <p className="text-red-100 leading-relaxed">We exist to close the gap between marketing investment and business outcome. Every campaign we run is designed to generate returns you can see, measure and build on.</p>
          </div>
          <div className="bg-cc-dark p-8 text-white">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Our Vision</p>
            <h2 className="font-display text-2xl font-bold mb-4">The most trusted name in Indian marketing</h2>
            <p className="text-gray-400 leading-relaxed">We're building the partner network that ambitious Indian brands choose when they are ready to scale — a platform where great work, honest pricing and real results are the baseline, not the exception.</p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-cc-light">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-semibold text-cc-red uppercase tracking-widest mb-3">How We Work</p>
          <h2 className="font-display text-3xl font-bold text-cc-dark mb-12">The principles we do not compromise on</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <div key={v.title} className="bg-white p-6 border-t-4 border-cc-red hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 bg-cc-dark flex items-center justify-center text-white"><v.icon size={18} /></div>
                  <span className="text-xs font-bold text-cc-silver uppercase tracking-widest">0{i + 1}</span>
                </div>
                <h3 className="font-display text-base font-bold text-cc-dark">{v.title}</h3>
                <p className="mt-2 text-sm text-cc-grey leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-cc-dark">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl font-bold text-white">Let&apos;s build something great</h2>
          <p className="mt-4 text-cc-silver text-lg">Join our partner network and start running campaigns that convert.</p>
          <Link href="/signup" className="inline-flex items-center gap-2 mt-8 bg-cc-red text-white font-semibold px-8 py-3.5 rounded hover:bg-cc-crimson transition-colors">
            Join as Partner <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
