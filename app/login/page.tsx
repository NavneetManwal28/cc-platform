'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError('');
    const fakeEmail = `${username.trim().toLowerCase()}@cc.local`;
    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({ email: fakeEmail, password });
      if (authError) throw new Error('Invalid username or password');
      const { data: profile } = await supabase.from('profiles').select('role').eq('id', data.user.id).single();
      router.push(profile?.role === 'admin' ? '/admin' : '/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = 'w-full px-4 py-2.5 border border-gray-200 focus:border-cc-red focus:ring-2 focus:ring-cc-red/10 outline-none transition-all text-sm rounded';

  return (
    <div className="min-h-screen bg-cc-light flex flex-col items-center justify-center px-4 py-12">
      <Link href="/" className="flex items-center gap-2 mb-8">
        <div className="w-9 h-9 bg-cc-red rounded flex items-center justify-center">
          <span className="text-white font-display font-bold">CC</span>
        </div>
        <span className="font-display font-bold text-cc-dark text-xl tracking-tight">CC</span>
      </Link>

      <div className="w-full max-w-md bg-white border border-gray-200 p-8 rounded shadow-sm">
        <div className="border-l-4 border-cc-red pl-4 mb-8">
          <h1 className="font-display text-2xl font-bold text-cc-dark">Welcome back</h1>
          <p className="text-sm text-cc-grey mt-1">Sign in to your CC account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-cc-dark mb-1">Username</label>
            <input required value={username} onChange={(e) => { setUsername(e.target.value.replace(/\s/g, '')); setError(''); }} className={inputClass} placeholder="Your username" />
          </div>
          <div>
            <label className="block text-sm font-medium text-cc-dark mb-1">Password</label>
            <div className="relative">
              <input required type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => { setPassword(e.target.value); setError(''); }} className={`${inputClass} pr-10`} placeholder="Your password" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-cc-silver hover:text-cc-grey">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          {error && <div className="text-sm text-red-600 bg-red-50 rounded px-4 py-3">{error}</div>}
          <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 bg-cc-red text-white font-semibold py-3 rounded hover:bg-cc-crimson disabled:opacity-60 transition-colors">
            {loading ? <Loader2 size={18} className="animate-spin" /> : null}
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="text-center text-sm text-cc-grey mt-6">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-cc-red font-medium hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
