'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import { site } from '@/lib/site';
import { cn } from '@/lib/utils';

type Fields = {
  lastName: string;
  firstName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  website: string; // piège à robots
};

const empty: Fields = {
  lastName: '',
  firstName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  website: '',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Validation côté client, doublée côté serveur dans /api/contact. */
function validate(v: Fields) {
  const e: Partial<Record<keyof Fields, string>> = {};
  if (!v.lastName.trim()) e.lastName = 'Votre nom est requis.';
  if (!v.firstName.trim()) e.firstName = 'Votre prénom est requis.';
  if (!v.email.trim()) e.email = 'Votre e-mail est requis.';
  else if (!EMAIL_RE.test(v.email)) e.email = 'Cet e-mail semble incorrect.';
  if (v.phone && v.phone.replace(/[^\d+]/g, '').length < 8) e.phone = 'Ce numéro semble incomplet.';
  if (!v.subject.trim()) e.subject = 'Indiquez l’objet de votre demande.';
  if (!v.message.trim()) e.message = 'Décrivez votre projet en quelques lignes.';
  else if (v.message.trim().length < 12) e.message = 'Quelques mots de plus nous aideraient.';
  return e;
}

export default function ContactForm() {
  const [values, setValues] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [serverMessage, setServerMessage] = useState('');

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = document.querySelector<HTMLElement>('[data-invalid="true"]');
      first?.focus();
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setErrors(json.errors ?? {});
        setServerMessage(json.message ?? 'Une erreur est survenue.');
        setStatus('error');
        return;
      }
      setServerMessage(json.message ?? 'Votre message a bien été envoyé.');
      setStatus('sent');
      setValues(empty);
    } catch {
      setServerMessage(`L’envoi a échoué. Vous pouvez nous appeler au ${site.phone.display}.`);
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="card flex min-h-[30rem] flex-col items-center justify-center p-10 text-center"
      >
        <svg viewBox="0 0 64 64" className="h-20 w-20 stroke-accent-var" fill="none" strokeWidth="2" aria-hidden>
          <motion.circle
            cx="32"
            cy="32"
            r="28"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.path
            d="M20 33l8.5 8.5L45 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
        <h3 className="mt-8 text-display-sm">Message bien reçu</h3>
        <p className="mt-4 max-w-sm text-ink-600">{serverMessage}</p>
        <p className="mt-2 max-w-sm text-sm text-ink-400">
          Nous revenons vers vous rapidement. Pour une urgence, appelez le{' '}
          <a href={site.phone.href} className="text-accent">
            {site.phone.display}
          </a>
          .
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-8 font-display text-xs uppercase tracking-[0.18em] text-ink-600 underline underline-offset-4 hover:text-accent"
        >
          Envoyer un autre message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="card p-7 lg:p-10">
      <p className="eyebrow eyebrow-dot">Formulaire de contact</p>
      <h2 className="mt-5 text-display-sm">Demandez votre devis</h2>
      <p className="mt-4 text-sm text-ink-400">
        Tous les champs sont nécessaires au traitement de votre demande, sauf le téléphone.
      </p>

      <div className="mt-9 grid gap-5 sm:grid-cols-2">
        <Field label="Nom de famille" name="lastName" value={values.lastName} error={errors.lastName} onChange={set('lastName')} autoComplete="family-name" />
        <Field label="Prénom" name="firstName" value={values.firstName} error={errors.firstName} onChange={set('firstName')} autoComplete="given-name" />
        <Field label="E-mail" name="email" type="email" value={values.email} error={errors.email} onChange={set('email')} autoComplete="email" />
        <Field label="Téléphone" name="phone" type="tel" value={values.phone} error={errors.phone} onChange={set('phone')} autoComplete="tel" optional />
        <div className="sm:col-span-2">
          <Field label="Titre de votre message" name="subject" value={values.subject} error={errors.subject} onChange={set('subject')} />
        </div>
        <div className="sm:col-span-2">
          <Field label="Message" name="message" value={values.message} error={errors.message} onChange={set('message')} textarea />
        </div>
      </div>

      {/* Piège à robots — masqué visuellement et aux lecteurs d'écran */}
      <div aria-hidden className="absolute h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor="website">Ne pas remplir</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={set('website')} />
      </div>

      <AnimatePresence>
        {status === 'error' && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="alert"
            className="mt-6 border-l-2 border-danger-500 bg-danger-50 px-4 py-3 text-sm text-ink-700"
          >
            {serverMessage}
          </motion.p>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="group relative mt-9 flex w-full items-center justify-center gap-3 overflow-hidden bg-accent px-8 py-4 text-[13px] font-medium text-white transition-colors disabled:cursor-wait"
      >
        <span className="absolute inset-0 origin-bottom scale-y-0 bg-accent-deep transition-transform duration-400 ease-power group-hover:scale-y-100" />
        <span className="relative z-10">
          {status === 'sending' ? 'Envoi en cours…' : 'Envoyer mon message'}
        </span>
        {status === 'sending' && (
          <span className="relative z-10 h-3 w-3 animate-spin rounded-full border border-white border-t-transparent" />
        )}
      </button>

      <p className="mt-5 text-xs leading-relaxed text-ink-400">
        Vos données servent uniquement à traiter votre demande et ne sont jamais transmises à des tiers.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  value,
  error,
  onChange,
  type = 'text',
  textarea = false,
  optional = false,
  autoComplete,
}: {
  label: string;
  name: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<any>) => void;
  type?: string;
  textarea?: boolean;
  optional?: boolean;
  autoComplete?: string;
}) {
  const shared = {
    id: name,
    name,
    value,
    onChange,
    autoComplete,
    'aria-invalid': Boolean(error),
    'aria-describedby': error ? `${name}-error` : undefined,
    'data-invalid': Boolean(error),
    className: cn(
      'peer w-full border-b bg-transparent pb-3 pt-6 text-ink-900 outline-none transition-colors duration-300 placeholder:text-transparent',
      error ? 'border-danger-500' : 'border-paper-300 focus:border-accent'
    ),
    placeholder: label,
  };

  return (
    <div className="relative">
      {textarea ? <textarea rows={5} {...shared} /> : <input type={type} {...shared} />}
      <label
        htmlFor={name}
        className={cn(
          'pointer-events-none absolute left-0 top-6 origin-left font-mono text-[11px] uppercase tracking-[0.16em] transition-all duration-300 ease-power',
          'peer-focus:top-0 peer-focus:text-accent',
          value ? 'top-0 text-ink-400' : 'text-ink-400',
          'peer-placeholder-shown:top-6 peer-focus:!top-0'
        )}
      >
        {label}
        {optional && <span className="ml-2 text-ink-400">(facultatif)</span>}
      </label>
      {/* Filet d'accent animé sous le champ */}
      <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-power peer-focus:scale-x-100" />
      {error && (
        <p id={`${name}-error`} className="mt-2 font-mono text-[10px] uppercase tracking-wide text-danger-500">
          {error}
        </p>
      )}
    </div>
  );
}
