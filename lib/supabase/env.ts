/**
 * Configuration Supabase.
 * Les deux variables sont publiques (clé anonyme) : elles peuvent être exposées
 * au navigateur. Toute la protection repose sur les politiques RLS côté Supabase.
 */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

/** Permet à l'application de démarrer (et de se construire) sans Supabase configuré. */
export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
