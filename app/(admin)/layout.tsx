import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Administration',
  robots: { index: false, follow: false },
};

/**
 * Espace d'administration : aucune navigation publique, aucun bandeau cookies.
 * Volontairement séparé du site vitrine (groupe de routes `(admin)`).
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-paper-50">{children}</div>;
}
