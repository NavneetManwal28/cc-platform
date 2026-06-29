import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t-2 border-cc-red py-10 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-cc-red rounded flex items-center justify-center">
            <span className="text-white font-display font-bold text-xs">CC</span>
          </div>
          <span className="font-display font-bold text-cc-dark tracking-tight">CC</span>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <Link href="/about" className="text-sm text-cc-silver hover:text-cc-red transition-colors">About</Link>
          <Link href="/contact" className="text-sm text-cc-silver hover:text-cc-red transition-colors">Contact</Link>
          <Link href="/terms" className="text-sm text-cc-silver hover:text-cc-red transition-colors">Terms &amp; Conditions</Link>
        </nav>

        <p className="text-sm text-cc-silver">&copy; {new Date().getFullYear()} CC. All rights reserved.</p>
      </div>
    </footer>
  );
}
