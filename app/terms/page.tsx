import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TermsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="pt-32 pb-20 px-4 sm:px-6 max-w-3xl mx-auto">
        <p className="text-xs font-semibold text-cc-red uppercase tracking-widest mb-4">Legal</p>
        <h1 className="font-display text-4xl font-bold text-cc-dark mb-8">Terms &amp; Conditions</h1>
        <div className="prose prose-gray max-w-none space-y-6 text-cc-grey leading-relaxed">
          <p>By accessing and using the CC platform, you agree to the following terms and conditions.</p>
          <h2 className="font-display text-xl font-bold text-cc-dark">1. Partner Responsibilities</h2>
          <p>Partners are responsible for ensuring all uploaded content is original, licensed, or otherwise legally permissible. CC reserves the right to remove content that violates these terms.</p>
          <h2 className="font-display text-xl font-bold text-cc-dark">2. Acceptable Use</h2>
          <p>The platform may only be used for legitimate marketing campaign asset management. Any misuse, including uploading harmful or illegal content, will result in immediate account termination.</p>
          <h2 className="font-display text-xl font-bold text-cc-dark">3. Privacy</h2>
          <p>We collect only the information necessary to provide the service. Your data is never sold to third parties.</p>
          <h2 className="font-display text-xl font-bold text-cc-dark">4. Changes</h2>
          <p>CC reserves the right to update these terms at any time. Continued use of the platform constitutes acceptance of any changes.</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
