import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ttuxfmabkxwxsckvubqe.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0dXhmbWFia3h3eHNja3Z1YnFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4NDM1MzEsImV4cCI6MjA4ODQxOTUzMX0.MEgxSIlI2xRjltLmVQ0sQ5SWxFk_iUo6iwBRQsFqk80";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;
