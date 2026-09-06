'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/** Fine barre de progression de lecture, calée sous l'en-tête. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[70] h-[2px] w-full origin-left bg-accent"
    />
  );
}
