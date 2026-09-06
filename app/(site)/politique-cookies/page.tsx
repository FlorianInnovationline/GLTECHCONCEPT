import type { Metadata } from 'next';

import LegalPage from '@/components/sections/LegalPage';
import { pageMeta } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata: Metadata = pageMeta({
  title: 'Politique de cookies',
  description: `Politique de cookies du site de ${site.legalName} : types de cookies utilisés, finalités, durée de conservation et gestion de votre consentement.`,
  path: '/politique-cookies',
});

export default function Page() {
  return (
    <LegalPage
      eyebrow="Vie privée"
      title="Politique de cookies"
      intro="Ce que nous déposons sur votre appareil, pourquoi, et comment revenir sur votre choix à tout moment."
      sections={[
        {
          heading: 'Qu’est-ce qu’un cookie ?',
          body: [
            'Un cookie est un petit fichier texte déposé sur votre appareil lors de la consultation d’un site. Il permet notamment de mémoriser vos préférences ou de mesurer l’audience du site.',
          ],
        },
        {
          heading: 'Cookies strictement nécessaires',
          body: [
            'Ces cookies sont indispensables au fonctionnement du site : mémorisation de votre choix en matière de consentement et sécurité du formulaire de contact.',
            'Ils ne nécessitent pas votre accord préalable et ne servent à aucun profilage.',
          ],
        },
        {
          heading: 'Cookies de mesure d’audience et de personnalisation',
          body: [
            'Avec votre accord, nous pouvons utiliser des cookies destinés à mesurer la fréquentation du site et, le cas échéant, à personnaliser les contenus publicitaires.',
            'Aucun de ces cookies n’est déposé tant que vous n’avez pas cliqué sur « Accepter » dans le bandeau de consentement.',
            '[À COMPLÉTER : lister ici les outils réellement activés — par exemple Google Analytics, Meta Pixel — ainsi que leurs durées de conservation, dès que le client aura confirmé lesquels il souhaite utiliser.]',
          ],
        },
        {
          heading: 'Modifier votre choix',
          body: [
            'Votre choix est conservé dans le stockage local de votre navigateur. Pour le modifier, effacez les données du site dans les réglages de votre navigateur : le bandeau de consentement réapparaîtra lors de votre prochaine visite.',
            'Vous pouvez également configurer votre navigateur pour bloquer tout ou partie des cookies — certaines fonctionnalités du site peuvent alors être dégradées.',
          ],
        },
        {
          heading: 'Contact',
          body: [
            `Pour toute question relative à cette politique : ${site.email} ou ${site.phone.display}.`,
          ],
        },
      ]}
    />
  );
}
