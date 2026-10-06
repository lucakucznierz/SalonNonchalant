// The site exists as one page per language: "/" (German), "/en/" (English) and "/fr/" (French).
// The language is taken from <html lang> of the page that was loaded.
export const LANGUAGES = [
  { code: 'de', href: '/', label: 'DE', title: 'Deutsch' },
  { code: 'en', href: '/en/', label: 'EN', title: 'English' },
  { code: 'fr', href: '/fr/', label: 'FR', title: 'Français' }
]

const PAGE_LANG = document.documentElement.lang
export const LANG = LANGUAGES.some(language => language.code === PAGE_LANG) ? PAGE_LANG : 'de'

// Order in which translations are tried when a text is missing in the current language.
// French falls back to English first, as French visitors are more likely to read English than German.
const FALLBACK_ORDER = { de: ['de'], en: ['en', 'de'], fr: ['fr', 'en', 'de'] }

const STRINGS = {
  de: {
    navBand: 'Band',
    navConcerts: 'Konzerte',
    navGallery: 'Galerie',
    navBooking: 'Booking',
    openMenu: 'Menü öffnen',
    heroFallback: 'Bigband aus Leipzig',
    heroAlt: 'Die Leipziger Bigband Salon Nonchalant im Kinosaal',
    upcomingConcerts: 'Nächste Konzerte',
    bookBand: 'Band buchen',
    nextShow: 'Nächster Auftritt',
    bandEyebrow: 'Die Band',
    aboutFallback: 'Über uns',
    aboutAlt: 'Die Bläser von Salon Nonchalant',
    lineup: 'Besetzung',
    showMembers: 'Mitglieder',
    membersComingSoon: 'Hier stellen sich bald unsere Musikerinnen und Musiker vor.',
    concertsEyebrow: 'Live erleben',
    concerts: 'Konzerte',
    concertFallback: 'Konzert',
    loadingConcerts: 'Termine werden geladen …',
    noConcerts: 'Gerade stehen keine Termine fest. Schaut bald wieder vorbei oder',
    noConcertsLink: 'bucht uns für euer Event',
    timeSuffix: ' Uhr',
    moreInfo: 'Mehr Infos',
    showPast: 'Vergangene Konzerte anzeigen',
    hidePast: 'Vergangene Konzerte ausblenden',
    galleryEyebrow: 'Eindrücke',
    gallery: 'Galerie',
    showAllPhotos: 'Alle Fotos anzeigen',
    showFewerPhotos: 'Weniger anzeigen',
    enlargePhoto: 'Foto vergrößern',
    photoView: 'Fotoansicht',
    close: 'Schließen',
    previousPhoto: 'Vorheriges Foto',
    nextPhoto: 'Nächstes Foto',
    contactEyebrow: 'Booking & Kontakt',
    contactFallback: 'Kontakt',
    impressum: 'Impressum',
    datenschutz: 'Datenschutz',
    backHome: '← Zurück zur Startseite'
  },
  en: {
    navBand: 'Band',
    navConcerts: 'Concerts',
    navGallery: 'Gallery',
    navBooking: 'Booking',
    openMenu: 'Open menu',
    heroFallback: 'Big band from Leipzig',
    heroAlt: 'The Leipzig big band Salon Nonchalant in a cinema hall',
    upcomingConcerts: 'Upcoming concerts',
    bookBand: 'Book the band',
    nextShow: 'Next show',
    bandEyebrow: 'The band',
    aboutFallback: 'About us',
    aboutAlt: 'The horn section of Salon Nonchalant',
    lineup: 'Line-up',
    showMembers: 'Members',
    membersComingSoon: 'Our musicians will introduce themselves here soon.',
    concertsEyebrow: 'See us live',
    concerts: 'Concerts',
    concertFallback: 'Concert',
    loadingConcerts: 'Loading dates …',
    noConcerts: 'No dates are scheduled right now. Check back soon or',
    noConcertsLink: 'book us for your event',
    timeSuffix: '',
    moreInfo: 'More info',
    showPast: 'Show past concerts',
    hidePast: 'Hide past concerts',
    galleryEyebrow: 'Impressions',
    gallery: 'Gallery',
    showAllPhotos: 'Show all photos',
    showFewerPhotos: 'Show fewer',
    enlargePhoto: 'Enlarge photo',
    photoView: 'Photo view',
    close: 'Close',
    previousPhoto: 'Previous photo',
    nextPhoto: 'Next photo',
    contactEyebrow: 'Booking & contact',
    contactFallback: 'Contact',
    impressum: 'Legal notice',
    datenschutz: 'Privacy policy',
    backHome: '← Back to the homepage'
  },
  fr: {
    navBand: 'Groupe',
    navConcerts: 'Concerts',
    navGallery: 'Galerie',
    navBooking: 'Réservation',
    openMenu: 'Ouvrir le menu',
    heroFallback: 'Big band de Leipzig',
    heroAlt: 'Le big band leipzigois Salon Nonchalant dans une salle de cinéma',
    upcomingConcerts: 'Prochains concerts',
    bookBand: 'Réserver le groupe',
    nextShow: 'Prochain concert',
    bandEyebrow: 'Le groupe',
    aboutFallback: 'À propos',
    aboutAlt: 'La section de cuivres de Salon Nonchalant',
    lineup: 'Formation',
    showMembers: 'Musiciens',
    membersComingSoon: 'Nos musiciennes et musiciens se présenteront bientôt ici.',
    concertsEyebrow: 'En concert',
    concerts: 'Concerts',
    concertFallback: 'Concert',
    loadingConcerts: 'Chargement des dates …',
    noConcerts: 'Aucune date n\'est prévue pour le moment. Revenez bientôt ou',
    noConcertsLink: 'réservez-nous pour votre événement',
    timeSuffix: '',
    moreInfo: 'Plus d\'infos',
    showPast: 'Afficher les concerts passés',
    hidePast: 'Masquer les concerts passés',
    galleryEyebrow: 'Impressions',
    gallery: 'Galerie',
    showAllPhotos: 'Afficher toutes les photos',
    showFewerPhotos: 'Afficher moins',
    enlargePhoto: 'Agrandir la photo',
    photoView: 'Vue photo',
    close: 'Fermer',
    previousPhoto: 'Photo précédente',
    nextPhoto: 'Photo suivante',
    contactEyebrow: 'Réservation & contact',
    contactFallback: 'Contact',
    impressum: 'Mentions légales',
    datenschutz: 'Politique de confidentialité',
    backHome: '← Retour à l\'accueil'
  }
}

/// Returns the fixed interface text for the current language.
export function t(key)
{
  return STRINGS[LANG][key] ?? STRINGS.de[key] ?? key
}

/// Picks the best available translation from an object like { de: '…', en: '…', fr: '…' }.
export function localized(values)
{
  for(const code of FALLBACK_ORDER[LANG])
  {
    if(values[code])
      return values[code]
  }
  return ''
}

/// Reads a sheet column in the current language: "Titel_FR" / "Titel_EN" when filled, otherwise "Titel".
export function localizedColumn(row, column)
{
  const read = suffix => (row[`${column}${suffix}`] || '').trim()
  return localized({ de: read(''), en: read('_EN'), fr: read('_FR') })
}
