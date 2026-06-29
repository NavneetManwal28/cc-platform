'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Menu, X, LogOut, Upload, ShieldCheck } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      if (data.user) {
        supabase.from('profiles').select('role').eq('id', data.user.id).single()
          .then(({ data: p }) => setRole(p?.role ?? null));
      }
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null); setRole(null);
    router.push('/'); router.refresh();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b-2 border-cc-red">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">

          {/* Logo — top left */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-cc-red rounded flex items-center justify-center">
              <span className="text-white font-display font-bold text-sm">CC</span>
            </div>
            <span className="font-display font-bold text-cc-dark text-lg tracking-tight">CC</span>
          </Link>

          {/* Center nav links */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            <Link href="/#services" className="text-sm font-medium text-cc-grey hover:text-cc-red transition-colors">Services</Link>
            <Link href="/about" className="text-sm font-medium text-cc-grey hover:text-cc-red transition-colors">About</Link>
            <Link href="/contact" className="text-sm font-medium text-cc-grey hover:text-cc-red transition-colors">Contact</Link>
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-4 ml-auto">
            {user && role === 'partner' && (
              <Link href="/dashboard" className="flex items-center gap-1.5 text-sm font-medium text-cc-red"><Upload size={15} /> Upload</Link>
            )}
            {user && role === 'admin' && (
              <Link href="/admin" className="flex items-center gap-1.5 text-sm font-medium text-cc-red"><ShieldCheck size={15} /> Admin</Link>
            )}
            {user ? (
              <button onClick={handleLogout} className="flex items-center gap-1.5 text-sm font-medium text-cc-grey hover:text-red-600 transition-colors">
                <LogOut size={15} /> Sign out
              </button>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-cc-grey hover:text-cc-red transition-colors">Log in</Link>
                <Link href="/signup" className="text-sm font-medium bg-cc-red text-white px-5 py-2 rounded hover:bg-cc-crimson transition-colors">
                  Become a Partner
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-cc-dark ml-auto">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4 space-y-2">
          <Link href="/#services" onClick={() => setOpen(false)} className="block py-2 text-sm font-medium text-cc-grey">Services</Link>
          <Link href="/about" onClick={() => setOpen(false)} className="block py-2 text-sm font-medium text-cc-grey">About</Link>
          <Link href="/contact" onClick={() => setOpen(false)} className="block py-2 text-sm font-medium text-cc-grey">Contact</Link>
          {user && role === 'partner' && (
            <Link href="/dashboard" onClick={() => setOpen(false)} className="flex items-center gap-2 py-2 text-sm font-medium text-cc-red"><Upload size={15} /> Upload</Link>
          )}
          {user && role === 'admin' && (
            <Link href="/admin" onClick={() => setOpen(false)} className="flex items-center gap-2 py-2 text-sm font-medium text-cc-red"><ShieldCheck size={15} /> Admin</Link>
          )}
          {user ? (
            <button onClick={handleLogout} className="flex items-center gap-2 py-2 text-sm font-medium text-red-600"><LogOut size={15} /> Sign out</button>
          ) : (
            <>
              <Link href="/login" onClick={() => setOpen(false)} className="block py-2 text-sm font-medium text-cc-grey">Log in</Link>
              <Link href="/signup" onClick={() => setOpen(false)} className="block py-2 text-sm font-medium text-cc-red font-semibold">Become a Partner</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
