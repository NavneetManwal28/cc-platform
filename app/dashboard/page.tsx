'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import { Upload, Image as ImageIcon, X, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

const MAX_SIZE_MB = 5;
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = 'cc_unsigned';

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [campaign, setCampaign] = useState('');
  const [uploading, setUploading] = useState(false);
  const [results, setResults] = useState<{ name: string; ok: boolean }[]>([]);
  const [uploads, setUploads] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) { router.push('/login'); return; }
      const { data: p } = await supabase.from('profiles').select('*').eq('id', data.user.id).single();
      if (!p || p.role !== 'partner') { router.push('/'); return; }
      setProfile(p);
      const { data: ups } = await supabase.from('uploads').select('*').eq('partner_id', data.user.id).order('created_at', { ascending: false });
      setUploads(ups || []);
    });
  }, []);

  const addFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    const valid = Array.from(incoming).filter(f => f.type.startsWith('image/') && f.size <= MAX_SIZE_MB * 1024 * 1024);
    setFiles(p => [...p, ...valid]);
    valid.forEach(f => { const r = new FileReader(); r.onload = e => setPreviews(p => [...p, e.target?.result as string]); r.readAsDataURL(f); });
  };

  const removeFile = (i: number) => {
    setFiles(p => p.filter((_, idx) => idx !== i));
    setPreviews(p => p.filter((_, idx) => idx !== i));
  };

  const handleUpload = async () => {
    if (!files.length || !campaign.trim()) return;
    setUploading(true); setResults([]);
    const res: { name: string; ok: boolean }[] = [];

    for (const file of files) {
      try {
        const fd = new FormData();
        fd.append('file', file);
        fd.append('upload_preset', UPLOAD_PRESET);
        fd.append('folder', 'cc-uploads');
        const r = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, { method: 'POST', body: fd });
        const d = await r.json();
        if (!r.ok) throw new Error('Upload failed');
        await supabase.from('uploads').insert({ partner_id: profile.id, partner_name: profile.name, company: profile.company, campaign, image_url: d.secure_url, file_name: file.name });
        res.push({ name: file.name, ok: true });
      } catch { res.push({ name: file.name, ok: false }); }
    }

    setResults(res);
    setFiles([]); setPreviews([]); setCampaign('');
    const { data: ups } = await supabase.from('uploads').select('*').eq('partner_id', profile.id).order('created_at', { ascending: false });
    setUploads(ups || []);
    setUploading(false);
  };

  if (!profile) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 size={32} className="animate-spin text-cc-red" />
    </div>
  );

  return (
    <main className="min-h-screen bg-cc-light">
      <Navbar />
      <div className="pt-24 pb-16 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="font-display text-2xl font-bold text-cc-dark">Partner Dashboard</h1>
          <p className="text-cc-grey mt-1">Welcome, <span className="font-semibold text-cc-red">{profile.name}</span> — {profile.company}</p>
        </div>

        {/* Upload card */}
        <div className="bg-white border border-gray-200 rounded p-6 mb-8">
          <h2 className="font-display text-lg font-bold text-cc-dark mb-4 flex items-center gap-2">
            <Upload size={18} className="text-cc-red" /> Upload Campaign Photos
          </h2>

          <div>
            <label className="block text-sm font-medium text-cc-dark mb-1">Campaign Name</label>
            <input value={campaign} onChange={e => setCampaign(e.target.value)} placeholder="Enter campaign name" className="w-full px-4 py-2.5 border border-gray-200 focus:border-cc-red outline-none rounded text-sm mb-4" />
          </div>

          <div
            className="border-2 border-dashed border-gray-200 hover:border-cc-red rounded p-8 text-center cursor-pointer transition-colors"
            onClick={() => inputRef.current?.click()}
            onDragOver={e => e.preventDefault()}
            onDrop={e => { e.preventDefault(); addFiles(e.dataTransfer.files); }}
          >
            <ImageIcon size={32} className="mx-auto text-cc-silver mb-3" />
            <p className="text-sm font-medium text-cc-grey">Drop images here or <span className="text-cc-red">browse</span></p>
            <p className="text-xs text-cc-silver mt-1">Max {MAX_SIZE_MB}MB per image</p>
            <input ref={inputRef} type="file" multiple accept="image/*" className="hidden" onChange={e => addFiles(e.target.files)} />
          </div>

          {previews.length > 0 && (
            <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-3">
              {previews.map((src, i) => (
                <div key={i} className="relative aspect-square">
                  <img src={src} className="w-full h-full object-cover rounded border border-gray-200" />
                  <button onClick={() => removeFile(i)} className="absolute -top-2 -right-2 w-5 h-5 bg-cc-red text-white rounded-full flex items-center justify-center">
                    <X size={10} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={!files.length || !campaign.trim() || uploading}
            className="mt-4 w-full flex items-center justify-center gap-2 bg-cc-red text-white font-semibold py-3 rounded hover:bg-cc-crimson disabled:opacity-50 transition-colors"
          >
            {uploading ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
            {uploading ? 'Uploading…' : `Upload ${files.length ? `${files.length} photo${files.length > 1 ? 's' : ''}` : 'Photos'}`}
          </button>

          {results.length > 0 && (
            <div className="mt-4 space-y-2">
              {results.map((r, i) => (
                <div key={i} className={`flex items-center gap-2 text-sm px-3 py-2 rounded ${r.ok ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                  {r.ok ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                  {r.name} — {r.ok ? 'Uploaded' : 'Failed'}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Previous uploads */}
        {uploads.length > 0 && (
          <div>
            <h2 className="font-display text-lg font-bold text-cc-dark mb-4">Your Uploads</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {uploads.map((u) => (
                <a key={u.id} href={u.image_url} target="_blank" rel="noopener noreferrer" className="group">
                  <div className="aspect-square overflow-hidden rounded border border-gray-200 group-hover:border-cc-red transition-colors">
                    <img src={u.image_url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <p className="text-xs text-cc-grey mt-1 truncate">{u.campaign}</p>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
