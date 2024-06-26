import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ygbfrckmaigjiizhzkgt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlnYmZyY2ttYWlnamlpemh6a2d0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk0MTA2NDYsImV4cCI6MjAzNDk4NjY0Nn0.Xi4t0yZ5QTdydZ9U7u0nK3o_z2nqqtSBZ72xZSHG1Ro';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
