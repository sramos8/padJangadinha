import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Carrega variáveis do arquivo .env
dotenv.config();

console.log(process.env.SUPABASE_URL)
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('SUPABASE_URL ou SUPABASE_KEY não estão definidas no .env');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
