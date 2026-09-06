import type { Metadata } from 'next';

import LegalPage from '@/components/sections/LegalPage';
import { pageMeta } from '@/lib/seo';
import { site, fullAddress } from '@/lib/site';

export const metadata: Metadata = pageMeta({
  title: 'Mentions légales',
  description: `Mentions légales du site de ${site.legalName} — ${fullAddress}. Numéro d’entreprise ${site.vat}.`,
  path: '/mentions-legales',
});

export default function Page() {
  return (
    <LegalPage
      eyebrow="Informations légales"
      title="Mentions légales"
      intro="Informations relatives à l’éditeur du site, à son hébergement et aux conditions d’utilisation."
      sections={[
        {
          heading: 'Éditeur du site',
          body: [
            `${site.legalName}, société à responsabilité limitée de droit belge.`,
            `Siège social : ${fullAddress}.`,
            `Numéro d’entreprise / TVA : ${site.vat}.`,
            `Téléphone : ${site.phone.display} — E-mail : ${site.email}.`,
            'Responsable de la publication : la gérance de GL TECH CONCEPT SRL. [À COMPLÉTER : nom du gérant si le client souhaite le mentionner.]',
          ],
        },
        {
          heading: 'Hébergement',
          body: [
            'Le site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis — vercel.com.',
            '[À CONFIRMER si l’hébergement final diffère.]',
          ],
        },
        {
          heading: 'Propriété intellectuelle',
          body: [
            'L’ensemble des contenus présents sur ce site — textes, photographies de réalisations, éléments graphiques, code — est protégé par le droit d’auteur.',
            'Toute reproduction, représentation ou diffusion, totale ou partielle, sans autorisation écrite préalable est interdite.',
          ],
        },
        {
          heading: 'Responsabilité',
          body: [
            'Les informations techniques publiées sur ce site sont fournies à titre indicatif. Elles ne remplacent pas une visite sur place ni une étude technique adaptée à votre installation.',
            'Les devis, délais et prestations ne sont engageants qu’après remise d’un devis écrit et signé.',
          ],
        },
        {
          heading: 'Données personnelles',
          body: [
            'Les données transmises via le formulaire de contact (nom, prénom, e-mail, téléphone, objet et contenu du message) sont utilisées uniquement pour traiter votre demande et y répondre.',
            'Elles ne sont ni vendues, ni cédées à des tiers. Vous disposez d’un droit d’accès, de rectification et de suppression : il suffit de nous écrire à l’adresse e-mail ci-dessus.',
            'Conformément au RGPD, vous pouvez également introduire une réclamation auprès de l’Autorité de protection des données (Rue de la Presse 35, 1000 Bruxelles).',
          ],
        },
        {
          heading: 'Droit applicable',
          body: [
            'Le présent site et son utilisation sont soumis au droit belge. Tout litige relève de la compétence des tribunaux de l’arrondissement du siège de la société.',
          ],
        },
      ]}
    />
  );
}
