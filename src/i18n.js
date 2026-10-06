// The site exists as two pages: "/" (German) and "/en/" (English).
// The language is taken from <html lang> of the page that was loaded.
export const LANG = document.documentElement.lang === 'en' ? 'en' : 'de'

export const LANGUAGE_SWITCH = LANG === 'en'
  ? { href: '/', label: 'DE', hreflang: 'de', title: 'Deutsche Version' }
  : { href: '/en/', label: 'EN', hreflang: 'en', title: 'English version' }

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
  }
}

/// Returns the fixed interface text for the current language.
export function t(key)
{
  return STRINGS[LANG][key] ?? STRINGS.de[key] ?? key
}

/// Picks the English value when the page is English and one exists, otherwise the German value.
export function localized(german, english)
{
  return (LANG === 'en' && english) ? english : german
}
