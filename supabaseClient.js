import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wirlhukotunwewegxopi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndpcmxodWtvdHVud2V3ZWd4b3BpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxODc0NDU4NSwiZXhwIjoyMDM0MzIwNTg1fQ.RbNUridpxH-9i9eAjrN_I8YVcLdXFCM2CM85KPUazKg'; // Substitua pelo seu token de chave de autenticação

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
