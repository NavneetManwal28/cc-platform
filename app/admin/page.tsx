'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import { Download, Loader2, Search, Filter } from 'lucide-react';

export default function AdminPage() {
  const router = useRouter();
  const [uploads, setUploads] = useState<any[]>([]);
  const [partners, setPartners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterPartner, setFilterPartner] = useState('');
  const [filterCampaign, setFilterCampaign] = useState('');

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) { router.push('/login'); return; }
      const { data: p } = await supabase.from('profiles').select('role').eq('id', data.user.id).single();
      if (p?.role !== 'admin') { router.push('/'); return; }
      const [{ data: ups }, { data: pts }] = await Promise.all([
        supabase.from('uploads').select('*').order('created_at', { ascending: false }),
        supabase.from('profiles').select('*').eq('role', 'partner'),
      ]);
      setUploads(ups || []);
      setPartners(pts || []);
      setLoading(false);
    });
  }, []);

  const filtered = uploads.filter(u => {
    const matchSearch = !search || u.file_name?.toLowerCase().includes(search.toLowerCase()) || u.campaign?.toLowerCase().includes(search.toLowerCase());
    const matchPartner = !filterPartner || u.partner_name === filterPartner;
    const matchCampaign = !filterCampaign || u.campaign === filterCampaign;
    return matchSearch && matchPartner && matchCampaign;
  });

  const campaigns = Array.from(new Set(uploads.map((u: any) => u.campaign).filter(Boolean)));
  const partnerNames = Array.from(new Set(uploads.map((u: any) => u.partner_name).filter(Boolean)));

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 size={32} className="animate-spin text-cc-red" /></div>;

  return (
    <main className="min-h-screen bg-cc-light">
      <Navbar />
      <div className="pt-24 pb-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-cc-dark">Admin Panel</h1>
            <p className="text-cc-grey mt-1">{filtered.length} uploads · {partners.length} partners</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white border border-gray-200 rounded p-4 mb-6 flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-48">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-cc-silver" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search files or campaigns…" className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded text-sm focus:border-cc-red outline-none" />
          </div>
          <select value={filterPartner} onChange={e => setFilterPartner(e.target.value)} className="px-3 py-2 border border-gray-200 rounded text-sm focus:border-cc-red outline-none text-cc-grey">
            <option value="">All Partners</option>
            {partnerNames.map(n => <option key={n}>{n}</option>)}
          </select>
          <select value={filterCampaign} onChange={e => setFilterCampaign(e.target.value)} className="px-3 py-2 border border-gray-200 rounded text-sm focus:border-cc-red outline-none text-cc-grey">
            <option value="">All Campaigns</option>
            {campaigns.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map((u) => (
            <div key={u.id} className="group bg-white border border-gray-200 rounded overflow-hidden hover:border-cc-red transition-colors">
              <div className="aspect-square overflow-hidden">
                <img src={u.image_url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-2">
                <p className="text-xs font-medium text-cc-dark truncate">{u.partner_name}</p>
                <p className="text-xs text-cc-silver truncate">{u.campaign}</p>
                <a href={u.image_url} download target="_blank" rel="noopener noreferrer"
                  className="mt-2 flex items-center justify-center gap-1 text-xs text-cc-red hover:bg-cc-red hover:text-white border border-cc-red rounded py-1 transition-colors">
                  <Download size={11} /> Download
                </a>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-cc-silver">No uploads found.</div>
        )}

        {/* Partners list */}
        <div className="mt-12">
          <h2 className="font-display text-lg font-bold text-cc-dark mb-4">Partner List</h2>
          <div className="bg-white border border-gray-200 rounded overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-cc-light border-b border-gray-200">
                <tr>
                  {['Name', 'Company', 'Territory', 'Phone', 'Uploads'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-cc-grey uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {partners.map(p => (
                  <tr key={p.id} className="hover:bg-cc-light/50">
                    <td className="px-4 py-3 font-medium text-cc-dark">{p.name}</td>
                    <td className="px-4 py-3 text-cc-grey">{p.company}</td>
                    <td className="px-4 py-3 text-cc-grey">{p.territory}</td>
                    <td className="px-4 py-3 text-cc-grey">{p.phone}</td>
                    <td className="px-4 py-3 text-cc-red font-semibold">{uploads.filter(u => u.partner_id === p.id).length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
