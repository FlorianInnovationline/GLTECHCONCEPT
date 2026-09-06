import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

/** Découpe un titre en mots pour les animations de révélation lettre/mot par mot. */
export const splitWords = (text: string) => text.split(' ').filter(Boolean);
