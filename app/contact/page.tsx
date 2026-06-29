import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin } from 'lucide-react';

const CONTACT_EMAIL = 'hello@cc.in';

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="pt-32 pb-20 px-4 sm:px-6 max-w-2xl mx-auto text-center">
        <p className="text-xs font-semibold text-cc-red uppercase tracking-widest mb-4">Get in touch</p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-cc-dark leading-tight">
          Let&apos;s talk about your <span className="text-cc-red">next campaign</span>
        </h1>
        <p className="mt-6 text-lg text-cc-grey leading-relaxed">
          Tell us what you&apos;re working on and we&apos;ll get back to you within one business day.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
          <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-3 px-6 py-4 border border-gray-200 hover:border-cc-red transition-colors w-full sm:w-auto">
            <Mail size={20} className="text-cc-red flex-shrink-0" />
            <div className="text-left">
              <p className="text-xs text-cc-silver uppercase tracking-wide">Email</p>
              <p className="text-sm font-medium text-cc-dark mt-0.5">{CONTACT_EMAIL}</p>
            </div>
          </a>
          <a href="tel:+918888999910" className="flex items-center gap-3 px-6 py-4 border border-gray-200 hover:border-cc-red transition-colors w-full sm:w-auto">
            <Phone size={20} className="text-cc-red flex-shrink-0" />
            <div className="text-left">
              <p className="text-xs text-cc-silver uppercase tracking-wide">Phone</p>
              <p className="text-sm font-medium text-cc-dark mt-0.5">+91 88889 99910</p>
            </div>
          </a>
          <div className="flex items-center gap-3 px-6 py-4 border border-gray-200 w-full sm:w-auto">
            <MapPin size={20} className="text-cc-red flex-shrink-0" />
            <div className="text-left">
              <p className="text-xs text-cc-silver uppercase tracking-wide">Office</p>
              <p className="text-sm font-medium text-cc-dark mt-0.5">Gurgaon, India</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
