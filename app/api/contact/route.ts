import { NextResponse } from 'next/server';
import { site } from '@/lib/site';

export const runtime = 'nodejs';

type Payload = {
  lastName?: string;
  firstName?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  /** Champ piège anti-robot : rempli = requête ignorée. */
  website?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(d: Payload) {
  const errors: Record<string, string> = {};
  if (!d.lastName?.trim()) errors.lastName = 'Votre nom est requis.';
  if (!d.firstName?.trim()) errors.firstName = 'Votre prénom est requis.';
  if (!d.email?.trim()) errors.email = 'Votre e-mail est requis.';
  else if (!EMAIL_RE.test(d.email)) errors.email = 'Cet e-mail semble incorrect.';
  if (d.phone && d.phone.replace(/[^\d+]/g, '').length < 8) errors.phone = 'Ce numéro semble incomplet.';
  if (!d.subject?.trim()) errors.subject = 'Indiquez l’objet de votre demande.';
  if (!d.message?.trim()) errors.message = 'Décrivez votre projet en quelques lignes.';
  else if (d.message.trim().length < 12) errors.message = 'Quelques mots de plus nous aideraient.';
  return errors;
}

export async function POST(request: Request) {
  let data: Payload;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: 'Requête invalide.' }, { status: 400 });
  }

  // Piège à robots : on répond « ok » sans rien envoyer.
  if (data.website) return NextResponse.json({ ok: true });

  const errors = validate(data);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors, message: 'Merci de corriger les champs signalés.' }, { status: 422 });
  }

  const body = [
    `Nouvelle demande depuis ${site.url}`,
    '',
    `Nom      : ${data.lastName}`,
    `Prénom   : ${data.firstName}`,
    `E-mail   : ${data.email}`,
    `Téléphone: ${data.phone || '—'}`,
    `Objet    : ${data.subject}`,
    '',
    data.message,
  ].join('\n');

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || site.email;
  const from = process.env.CONTACT_FROM_EMAIL;

  // ⚠️ TODO MISE EN LIGNE : sans clé Resend configurée, le message n'est PAS
  // envoyé — il est seulement journalisé. Renseigner RESEND_API_KEY,
  // CONTACT_TO_EMAIL et CONTACT_FROM_EMAIL (voir .env.example et le README).
  if (!apiKey || !from) {
    console.warn('[contact] Aucun service d’envoi configuré — message non transmis :\n' + body);
    return NextResponse.json({
      ok: true,
      delivered: false,
      message: 'Message enregistré. (Envoi e-mail non configuré sur cet environnement.)',
    });
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject: `[Site] ${data.subject} — ${data.firstName} ${data.lastName}`,
        text: body,
      }),
    });

    if (!res.ok) throw new Error(await res.text());
    return NextResponse.json({ ok: true, delivered: true, message: 'Votre message a bien été envoyé.' });
  } catch (err) {
    console.error('[contact] Échec de l’envoi', err);
    return NextResponse.json(
      { ok: false, message: 'L’envoi a échoué. Appelez-nous au ' + site.phone.display + '.' },
      { status: 502 }
    );
  }
}
