import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://supabase.com/dashboard/projects'; // Insira seu URL do Supabase
const supabaseKey = 'public-anon-key'; // Insira sua chave pública do Supabase

export const supabase = createClient(supabaseUrl, supabaseKey);
