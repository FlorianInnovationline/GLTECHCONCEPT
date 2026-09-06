import { cookies } from 'next/headers';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { SUPABASE_ANON_KEY, SUPABASE_URL, isSupabaseConfigured } from './env';

/**
 * Client Supabase côté serveur (composants serveur, route handlers).
 * Retourne `null` si l'environnement n'est pas configuré, afin que le build et
 * les pages publiques fonctionnent sans Supabase.
 */
export function createClient() {
  if (!isSupabaseConfigured) return null;

  const cookieStore = cookies();

  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      get: (name: string) => cookieStore.get(name)?.value,
      set: (name: string, value: string, options: CookieOptions) => {
        try {
          cookieStore.set({ name, value, ...options });
        } catch {
          // Appelé depuis un composant serveur : le rafraîchissement des cookies
          // est assuré par le middleware, on peut ignorer l'erreur.
        }
      },
      remove: (name: string, options: CookieOptions) => {
        try {
          cookieStore.set({ name, value: '', ...options });
        } catch {
          /* idem */
        }
      },
    },
  });
}

/** Utilisateur connecté, ou null. */
export async function getCurrentUser() {
  const supabase = createClient();
  if (!supabase) return null;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
