import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// This client should only be used server-side (API routes, never in the browser)
const supabaseServiceRole = createClient(supabaseUrl, supabaseServiceRoleKey);

export default supabaseServiceRole;
