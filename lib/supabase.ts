import { createClient } from '@supabase/supabase-js';

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;


export const supabase = createClient(supabaseUrl, supabaseAnon);

export type Profile = {
  id: string;
  username: string;
  email: string;
  name: string;
  company: string;
  phone: string;
  territory: string;
  role: 'partner' | 'admin';
};
