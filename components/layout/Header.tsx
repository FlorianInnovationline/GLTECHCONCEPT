'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import Logo from '@/components/visuals/Logo';
import ServiceIcon from '@/components/visuals/ServiceIcon';
import { navGroups, services } from '@/lib/services';
import { site } from '@/lib/site';
import { cn } from '@/lib/utils';

const bySlug = (slug: string) => services.find((s) => s.slug === slug)!;

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenGroup(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenGroup(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const openWith = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenGroup(label);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenGroup(null), 140);
  };

  return (
    <header
      onMouseLeave={scheduleClose}
      className={cn(
        'fixed inset-x-0 top-0 z-[75] transition-[background-color,border-color,box-shadow] duration-300',
        scrolled || openGroup || mobileOpen
          ? 'border-b border-paper-200 bg-white/92 backdrop-blur-md'
          : 'border-b border-transparent bg-white/0'
      )}
    >
      <div className="shell flex h-[var(--header-h)] items-center justify-between gap-6">
        <Logo />

        {/* Navigation bureau */}
        <nav aria-label="Navigation principale" className="hidden items-center gap-1 xl:flex">
          {navGroups.map((group) => (
            <div key={group.label} onMouseEnter={() => openWith(group.label)}>
              <button
                aria-expanded={openGroup === group.label}
                aria-haspopup="true"
                onClick={() => setOpenGroup(openGroup === group.label ? null : group.label)}
                className={cn(
                  'flex items-center gap-1.5 whitespace-nowrap px-4 py-2 text-[13px] font-medium transition-colors duration-200',
                  openGroup === group.label ? 'text-accent' : 'text-ink-700 hover:text-accent'
                )}
              >
                {group.label}
                <svg
                  viewBox="0 0 10 6"
                  className={cn('h-[5px] w-[9px] transition-transform duration-300', openGroup === group.label && 'rotate-180')}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  aria-hidden
                >
                  <path d="M1 1l4 4 4-4" />
                </svg>
              </button>
            </div>
          ))}

          <Link
            href="/realisations"
            onMouseEnter={scheduleClose}
            className={cn(
              'whitespace-nowrap px-4 py-2 text-[13px] font-medium transition-colors duration-200',
              pathname === '/realisations' ? 'text-accent' : 'text-ink-700 hover:text-accent'
            )}
          >
            Réalisations
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={site.phone.href}
            className="hidden items-center gap-2 text-[13px] font-medium text-ink-700 transition-colors hover:text-accent lg:flex"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <path d="M4 5c0 8 7 15 15 15l2-3-4-2-2 2c-2-1-5-4-6-6l2-2-2-4-3 0Z" />
            </svg>
            {site.phone.display}
          </a>

          <Link
            href="/contact"
            className="hidden bg-accent px-5 py-3 text-[13px] font-medium text-white transition-colors duration-300 hover:bg-accent-deep sm:inline-block"
          >
            Devis gratuit
          </Link>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={mobileOpen}
            className="relative z-10 flex h-10 w-10 items-center justify-center border border-paper-300 xl:hidden"
          >
            <span className="relative block h-3 w-4.5" style={{ width: 18 }}>
              <span className={cn('absolute left-0 h-px w-[18px] bg-ink-900 transition-all duration-300 ease-power', mobileOpen ? 'top-1.5 rotate-45' : 'top-0')} />
              <span className={cn('absolute left-0 top-1.5 h-px w-[18px] bg-ink-900 transition-all duration-200', mobileOpen && 'opacity-0')} />
              <span className={cn('absolute left-0 h-px w-[18px] bg-ink-900 transition-all duration-300 ease-power', mobileOpen ? 'top-1.5 -rotate-45' : 'top-3')} />
            </span>
          </button>
        </div>
      </div>

      {/* Méga-menu bureau */}
      <AnimatePresence>
        {openGroup && (
          <motion.div
            key={openGroup}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => openWith(openGroup)}
            className="absolute inset-x-0 top-[var(--header-h)] hidden border-b border-t border-paper-200 bg-white shadow-card xl:block"
          >
            <div className="shell grid grid-cols-12 gap-10 py-10">
              <div className="col-span-3">
                <p className="eyebrow eyebrow-dot">{openGroup}</p>
                <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-500">
                  {navGroups.find((g) => g.label === openGroup)?.blurb}
                </p>
                <Link href="/contact" className="link-underline mt-6 inline-block text-[13px] font-medium text-accent">
                  Demander un devis
                </Link>
              </div>

              <div className="col-span-9 grid grid-cols-3 gap-3">
                {navGroups
                  .find((g) => g.label === openGroup)!
                  .slugs.map((slug, i) => {
                    const s = bySlug(slug);
                    return (
                      <motion.div
                        key={slug}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.04 + i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <Link
                          href={`/${slug}`}
                          data-accent={s.accent}
                          className={cn(
                            'group flex h-full flex-col justify-between gap-6 border p-5 transition-colors duration-300',
                            pathname === `/${slug}` ? 'border-accent bg-accent/5' : 'border-paper-200 hover:border-accent/60 hover:bg-paper-50'
                          )}
                        >
                          <span className="text-accent">
                            <ServiceIcon name={s.icon} className="h-8 w-8" />
                          </span>
                          <div>
                            <p className="font-display text-[15px] font-semibold leading-tight text-ink-900">{s.title}</p>
                            <p className="mt-2 text-[13px] leading-relaxed text-ink-500">{s.teaser}</p>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Menu mobile */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 top-[var(--header-h)] z-[70] overflow-y-auto bg-white xl:hidden"
          >
            <nav aria-label="Navigation mobile" className="shell flex min-h-full flex-col py-8">
              {services.map((s, i) => (
                <motion.div
                  key={s.slug}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.03 + i * 0.035, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link href={`/${s.slug}`} data-accent={s.accent} className="flex items-center gap-4 border-b border-paper-200 py-4">
                    <span className="text-accent">
                      <ServiceIcon name={s.icon} className="h-6 w-6" />
                    </span>
                    <span className="flex-1 font-display text-base font-medium text-ink-900">{s.title}</span>
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-ink-400" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                      <path d="M1 8h13M9 3l5 5-5 5" />
                    </svg>
                  </Link>
                </motion.div>
              ))}

              <div className="mt-8 space-y-4">
                <Link href="/realisations" className="block font-display text-base font-medium text-ink-900">
                  Réalisations
                </Link>
                <Link href="/contact" className="block font-display text-base font-medium text-accent">
                  Contact &amp; devis
                </Link>
                <a href={site.phone.href} className="mt-4 flex items-center justify-center gap-3 bg-accent py-4 text-sm font-medium text-white">
                  Appeler le {site.phone.display}
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
