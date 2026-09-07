import Link from 'next/link';
import { redirect } from 'next/navigation';

import SignOutButton from '@/components/admin/SignOutButton';
import { getCurrentUser } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/env';
import { services } from '@/lib/services';
import { countFor, galleryCategories, totalPhotos } from '@/lib/gallery';
import { site } from '@/lib/site';

export const dynamic = 'force-dynamic';

/**
 * Tableau de bord — première brique de l'espace d'administration.
 * Les chiffres affichés proviennent pour l'instant du contenu du site
 * (source statique). Les sections « à brancher » sont explicitement marquées :
 * elles attendront les tables Supabase (demandes de devis, réalisations…).
 */
export default async function AdminDashboard() {
  const user = await getCurrentUser();
  if (isSupabaseConfigured && !user) redirect('/admin/login');

  const cards = [
    { label: 'Pages publiées', value: String(services.length + 5), hint: '7 métiers + accueil, réalisations, contact, légales' },
    { label: 'Photos en ligne', value: String(totalPhotos), hint: `${galleryCategories.length} catégories de réalisations` },
    { label: 'Demandes reçues', value: '—', hint: 'À brancher : table Supabase des demandes de devis' },
    { label: 'Avis clients', value: '—', hint: 'À brancher : témoignages à récupérer chez le client' },
  ];

  return (
    <div className="min-h-screen">
      {/* Barre d'administration */}
      <header className="border-b border-paper-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center bg-accent">
              <svg viewBox="0 0 32 32" className="h-4 w-4" fill="none" aria-hidden>
                <path
                  d="M16 4c1 5-4.5 6.5-4.5 11.5A4.5 4.5 0 0 0 16 20a4.5 4.5 0 0 0 4.5-4.5c0-2-.8-3.4-1.6-4.8C22.8 13 25 16.6 25 20.5A9 9 0 0 1 7 20.5C7 12 16 10.5 16 4Z"
                  fill="#fff"
                />
              </svg>
            </span>
            <div className="leading-tight">
              <p className="font-display text-sm font-semibold text-ink-900">Administration</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-400">{site.legalName}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/" target="_blank" className="text-sm text-ink-500 transition-colors hover:text-accent">
              Voir le site ↗
            </Link>
            <span className="hidden text-sm text-ink-400 sm:inline">{user?.email ?? 'session locale'}</span>
            <SignOutButton />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-10">
        <h1 className="font-display text-2xl font-semibold">Tableau de bord</h1>
        <p className="mt-2 text-sm text-ink-500">
          Vue d’ensemble du site. Les modules de gestion (demandes de devis, réalisations, témoignages)
          seront ajoutés ici au fur et à mesure.
        </p>

        {!isSupabaseConfigured && (
          <p className="mt-6 border-l-2 border-danger-500 bg-danger-50 px-4 py-3 text-sm text-ink-700">
            Supabase n’est pas configuré : cette page est visible sans authentification sur cet
            environnement. Renseignez les variables d’environnement avant toute mise en ligne.
          </p>
        )}

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <div key={c.label} className="border border-paper-200 bg-white p-5">
              <p className="font-display text-3xl font-semibold text-ink-900">{c.value}</p>
              <p className="mt-2 text-sm font-medium text-ink-900">{c.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-ink-400">{c.hint}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          <section className="border border-paper-200 bg-white p-6 lg:col-span-2">
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-display text-base font-semibold">Dernières demandes de devis</h2>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-400">À brancher</span>
            </div>
            <div className="mt-6 border border-dashed border-paper-300 px-5 py-10 text-center">
              <p className="text-sm text-ink-500">
                Les messages envoyés depuis le formulaire de contact s’afficheront ici.
              </p>
              <p className="mt-2 text-xs text-ink-400">
                Prochaine étape : enregistrer chaque envoi dans une table Supabase{' '}
                <code className="font-mono">demandes</code>, puis la lire depuis cette page.
              </p>
            </div>
          </section>

          <section className="border border-paper-200 bg-white p-6">
            <h2 className="font-display text-base font-semibold">Contenu du site</h2>
            <ul className="mt-5 space-y-2.5">
              {services.map((s) => (
                <li key={s.slug} className="flex items-center justify-between gap-3">
                  <Link href={`/${s.slug}`} target="_blank" className="text-sm text-ink-700 transition-colors hover:text-accent">
                    {s.title}
                  </Link>
                  <span className="font-mono text-[10px] text-ink-400">{s.index}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mt-4 border border-paper-200 bg-white p-6">
          <h2 className="font-display text-base font-semibold">Réalisations par catégorie</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {galleryCategories.map((c) => (
              <li key={c.slug} className="border border-paper-200 px-4 py-3">
                <p className="text-sm text-ink-700">{c.label}</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-400">
                  {countFor(c.slug)} photos
                </p>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
