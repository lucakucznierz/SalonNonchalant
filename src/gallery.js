import { localized } from './i18n'

// Photos shown in the gallery, in this order. Names refer to files in public/photos
// (generated from the originals in /Photos with "npm run photos").
const PHOTOS = [
  { slug: 'mg-6401-2', de: 'Die ganze Band im Kinosaal', en: 'The whole band in a cinema hall' },
  { slug: 'img-6692', de: 'Die Bläser in Schwarz-Weiß', en: 'The horn section in black and white' },
  { slug: 'img-6675', de: 'Der Saxophonsatz vor roter Wand', en: 'The saxophone section in front of a red wall' },
  { slug: 'img-6761', de: 'Porträt zweier Bandmitglieder', en: 'Portrait of two band members' },
  { slug: 'img-6672', de: 'Trompeten und Posaunen in den Kinosesseln', en: 'Trumpets and trombones in the cinema seats' },
  { slug: 'mg-6418', de: 'Die Rhythmusgruppe mit Gitarre und Kontrabass', en: 'The rhythm section with guitar and double bass' },
  { slug: 'mg-6430', de: 'Die Geigerinnen', en: 'The violinists' },
  { slug: 'img-6644', de: 'Bläser in Schwarz-Weiß', en: 'Horns in black and white' },
  { slug: 'img-6620', de: 'Saxophone zwischen den Sitzreihen', en: 'Saxophones between the rows of seats' },
  { slug: 'img-6738', de: 'Zwei Bandmitglieder an der Treppe', en: 'Two band members on the stairs' },
  { slug: 'mg-6391-1', de: 'Gruppenfoto im Vintage-Look', en: 'Group photo with a vintage look' },
  { slug: 'img-6666', de: 'Die Bläser spielen im Saal', en: 'The horns playing in the hall' },
  { slug: 'mg-6420', de: 'Rhythmusgruppe in Schwarz-Weiß', en: 'Rhythm section in black and white' },
  { slug: 'img-6634', de: 'Saxophonsatz vor der roten Wand', en: 'Saxophone section in front of the red wall' },
  { slug: 'mg-6436', de: 'Geigerinnen auf der Treppe', en: 'Violinists on the stairs' },
  { slug: 'img-6694', de: 'Die Bläser in den blauen Sesseln', en: 'The horns in the blue seats' }
]

export const GALLERY_PHOTOS = PHOTOS.map(photo => ({ slug: photo.slug, alt: localized(photo.de, photo.en) }))

/// Returns the URL of a processed photo in the given size ("large" or "small").
export function photoUrl(slug, size = 'large')
{
  return `${import.meta.env.BASE_URL}photos/${slug}-${size}.webp`
}

/// Turns a photo reference from the sheet into an image URL. Accepts a Google Drive share link,
/// any direct image link, or the name of a photo in public/photos (e.g. "img-6675").
export function sheetPhotoUrl(value)
{
  const reference = (value || '').trim()
  if(!reference)
    return null
  const driveId = reference.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:export=\w+&)?id=)([\w-]+)/)?.[1]
  if(driveId)
    return `https://drive.google.com/thumbnail?id=${driveId}&sz=w800`
  if(/^https?:\/\//.test(reference))
    return reference
  return photoUrl(reference, 'small')
}
