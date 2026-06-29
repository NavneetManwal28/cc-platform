'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', username: '', password: '', company: '', phone: '', territory: '' });

  const update = (field: string, value: string) => { setForm((p) => ({ ...p, [field]: value })); setError(''); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError('');
    const username = form.username.trim().toLowerCase();
    if (!/^[a-z0-9_]{3,30}$/.test(username)) {
      setError('Username must be 3–30 characters: letters, numbers, or underscores only.');
      setLoading(false); return;
    }
    const fakeEmail = `${username}@cc.local`;
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: fakeEmail, password: form.password,
        options: { data: { display_name: form.name } },
      });
      if (authError) { if (authError.message?.includes('already registered')) throw new Error('Username already taken.'); throw authError; }
      if (!authData.user) throw new Error('Signup failed');
      const { error: profileError } = await supabase.from('profiles').insert({
        id: authData.user.id, username, email: fakeEmail,
        name: form.name, company: form.company, phone: form.phone, territory: form.territory, role: 'partner',
platform: 'cc',
      });
      if (profileError) throw profileError;
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
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
          <h1 className="font-display text-2xl font-bold text-cc-dark">Become a CC Partner</h1>
          <p className="text-sm text-cc-grey mt-1">Sign up to start uploading campaign assets</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-cc-dark mb-1">Full name</label>
            <input required value={form.name} onChange={(e) => update('name', e.target.value)} className={inputClass} placeholder="Jane Smith" />
          </div>
          <div>
            <label className="block text-sm font-medium text-cc-dark mb-1">Username</label>
            <input required value={form.username} onChange={(e) => update('username', e.target.value.replace(/\s/g, ''))} className={inputClass} placeholder="e.g. jane_smith" />
            <p className="text-xs text-cc-silver mt-1">Letters, numbers, underscores only</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-cc-dark mb-1">Password</label>
            <div className="relative">
              <input required type={showPassword ? 'text' : 'password'} minLength={6} value={form.password} onChange={(e) => update('password', e.target.value)} className={`${inputClass} pr-10`} placeholder="Min. 6 characters" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-cc-silver hover:text-cc-grey">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-cc-dark mb-1">Company</label>
            <input required value={form.company} onChange={(e) => update('company', e.target.value)} className={inputClass} placeholder="Company name" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-cc-dark mb-1">Phone</label>
              <input required value={form.phone} onChange={(e) => update('phone', e.target.value)} className={inputClass} placeholder="+91 98765..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-cc-dark mb-1">Territory</label>
              <input required value={form.territory} onChange={(e) => update('territory', e.target.value)} className={inputClass} placeholder="e.g. North India" />
            </div>
          </div>
          {error && <div className="text-sm text-red-600 bg-red-50 rounded px-4 py-3">{error}</div>}
          <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 bg-cc-red text-white font-semibold py-3 rounded hover:bg-cc-crimson disabled:opacity-60 transition-colors">
            {loading ? <Loader2 size={18} className="animate-spin" /> : null}
            {loading ? 'Creating account…' : 'Create Partner Account'}
          </button>
        </form>

        <p className="text-center text-sm text-cc-grey mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-cc-red font-medium hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}
