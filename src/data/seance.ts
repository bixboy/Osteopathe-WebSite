/** Déroulé d'une séance, affiché sur l'accueil et sur /osteopathie (version anglaise : seanceStepsEn). */
export const seanceSteps = [
  {
    title: 'L’échange',
    text: 'Nous faisons le point sur le motif de votre venue, vos antécédents et votre quotidien.',
  },
  {
    title: 'Le bilan',
    text: 'Des tests de mobilité permettent d’identifier les zones de tension et leurs liens.',
  },
  {
    title: 'Le traitement',
    text: 'Des techniques manuelles douces et adaptées, suivies de conseils pour la suite.',
  },
];

/** Traduction de seanceSteps pour la page /en : garder les deux listes alignées. */
export const seanceStepsEn: typeof seanceSteps = [
  {
    title: 'Talking',
    text: 'We discuss the reason for your visit, your medical history and your daily life.',
  },
  {
    title: 'Assessment',
    text: 'Mobility tests help identify areas of tension and how they are connected.',
  },
  {
    title: 'Treatment',
    text: 'Gentle, tailored manual techniques, followed by advice for the days ahead.',
  },
];

// TODO(cliente): durée réelle d'une séance
export const seanceDuration = '45 min à 1 h';
