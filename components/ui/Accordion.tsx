'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

/** FAQ dépliable, accessible au clavier (boutons + aria-expanded). */
export default function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-paper-200 border-y border-paper-200">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="group flex w-full items-start justify-between gap-6 py-6 text-left"
            >
              <span
                className={`font-display text-lg tracking-tight transition-colors duration-300 lg:text-xl ${
                  isOpen ? 'text-accent' : 'text-ink-900 group-hover:text-accent'
                }`}
              >
                {item.q}
              </span>
              <span className="relative mt-2 h-3 w-3 shrink-0">
                <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-accent" />
                <span
                  className={`absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-accent transition-transform duration-400 ease-power ${
                    isOpen ? 'scale-y-0' : 'scale-y-100'
                  }`}
                />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-prose pb-7 text-ink-600">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
