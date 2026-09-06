import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

/**
 * Rafraîchit la session Supabase à chaque requête et protège /admin.
 * Sans configuration Supabase, /admin renvoie vers la page de connexion, qui
 * affiche alors la marche à suivre — le site public n'est jamais bloqué.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLogin = pathname === '/admin/login';
  let response = NextResponse.next({ request: { headers: request.headers } });

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    if (pathname.startsWith('/admin') && !isLogin) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    return response;
  }

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      get: (name: string) => request.cookies.get(name)?.value,
      set: (name: string, value: string, options: CookieOptions) => {
        request.cookies.set({ name, value, ...options });
        response = NextResponse.next({ request: { headers: request.headers } });
        response.cookies.set({ name, value, ...options });
      },
      remove: (name: string, options: CookieOptions) => {
        request.cookies.set({ name, value: '', ...options });
        response = NextResponse.next({ request: { headers: request.headers } });
        response.cookies.set({ name, value: '', ...options });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (pathname.startsWith('/admin') && !isLogin && !user) {
    const url = new URL('/admin/login', request.url);
    url.searchParams.set('suivant', pathname);
    return NextResponse.redirect(url);
  }

  if (isLogin && user) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/admin/:path*'],
};
