import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://wttwtzqtflmbncxnngcu.supabase.co";

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0dHd0enF0ZmxtYm5jeG5uZ2N1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQzMDY5ODEsImV4cCI6MjA5OTg4Mjk4MX0.5GeY6vGRbauXR1ZnOvpK6m1uUPGQMzio0D6Zx53sTuw";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
