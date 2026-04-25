// supabase-config.js
// ─────────────────────────────────────────────────────────────────
// STEP 1: Create a free project at https://supabase.com
// STEP 2: Go to Project Settings → API
// STEP 3: Copy your Project URL and anon/public key below
// STEP 4: Run the SQL schema in supabase-schema.sql in Supabase SQL Editor
// ─────────────────────────────────────────────────────────────────

window.SUPABASE_CONFIG = {
  url:     'YOUR_SUPABASE_URL',      // e.g. https://xyzabcdef.supabase.co
  anonKey: 'YOUR_SUPABASE_ANON_KEY', // long JWT string from Supabase dashboard
};

// Set to true once you've filled in the values above
window.SUPABASE_ENABLED = (
  window.SUPABASE_CONFIG.url !== 'YOUR_SUPABASE_URL' &&
  window.SUPABASE_CONFIG.anonKey !== 'YOUR_SUPABASE_ANON_KEY'
);
