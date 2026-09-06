import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileActionBar from '@/components/layout/MobileActionBar';
import CookieBanner from '@/components/layout/CookieBanner';
import SmoothScroll from '@/components/layout/SmoothScroll';
import ScrollProgress from '@/components/layout/ScrollProgress';
import PendingAssetsBadge from '@/components/layout/PendingAssetsBadge';

/** Habillage commun à toutes les pages publiques. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[999] focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Aller au contenu
      </a>

      <SmoothScroll />
      <ScrollProgress />

      <Header />
      <main id="contenu" className="relative z-10">
        {children}
      </main>
      <Footer />

      <MobileActionBar />
      <CookieBanner />
      <PendingAssetsBadge />
    </>
  );
}
