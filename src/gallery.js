import { localized } from './i18n'

// Photos shown in the gallery, in this order. Names refer to files in public/photos
// (generated from the originals in /Photos with "npm run photos").
const PHOTOS = [
  { slug: 'mg-6401-2', de: 'Die ganze Band im Kinosaal', en: 'The whole band in a cinema hall', fr: 'Tout le groupe dans une salle de cinéma' },
  { slug: 'img-6692', de: 'Die Bläser in Schwarz-Weiß', en: 'The horn section in black and white', fr: 'Les cuivres en noir et blanc' },
  { slug: 'img-6675', de: 'Der Saxophonsatz vor roter Wand', en: 'The saxophone section in front of a red wall', fr: 'La section de saxophones devant un mur rouge' },
  { slug: 'img-6761', de: 'Porträt zweier Bandmitglieder', en: 'Portrait of two band members', fr: 'Portrait de deux membres du groupe' },
  { slug: 'img-6672', de: 'Trompeten und Posaunen in den Kinosesseln', en: 'Trumpets and trombones in the cinema seats', fr: 'Trompettes et trombones dans les fauteuils du cinéma' },
  { slug: 'mg-6418', de: 'Die Rhythmusgruppe mit Gitarre und Kontrabass', en: 'The rhythm section with guitar and double bass', fr: 'La section rythmique avec guitare et contrebasse' },
  { slug: 'mg-6430', de: 'Die Geigerinnen', en: 'The violinists', fr: 'Les violonistes' },
  { slug: 'img-6644', de: 'Bläser in Schwarz-Weiß', en: 'Horns in black and white', fr: 'Cuivres en noir et blanc' },
  { slug: 'img-6620', de: 'Saxophone zwischen den Sitzreihen', en: 'Saxophones between the rows of seats', fr: 'Saxophones entre les rangées de sièges' },
  { slug: 'img-6738', de: 'Zwei Bandmitglieder an der Treppe', en: 'Two band members on the stairs', fr: 'Deux membres du groupe dans l\'escalier' },
  { slug: 'mg-6391-1', de: 'Gruppenfoto im Vintage-Look', en: 'Group photo with a vintage look', fr: 'Photo de groupe au style rétro' },
  { slug: 'img-6666', de: 'Die Bläser spielen im Saal', en: 'The horns playing in the hall', fr: 'Les cuivres jouent dans la salle' },
  { slug: 'mg-6420', de: 'Rhythmusgruppe in Schwarz-Weiß', en: 'Rhythm section in black and white', fr: 'Section rythmique en noir et blanc' },
  { slug: 'img-6634', de: 'Saxophonsatz vor der roten Wand', en: 'Saxophone section in front of the red wall', fr: 'Section de saxophones devant le mur rouge' },
  { slug: 'mg-6436', de: 'Geigerinnen auf der Treppe', en: 'Violinists on the stairs', fr: 'Violonistes dans l\'escalier' },
  { slug: 'img-6694', de: 'Die Bläser in den blauen Sesseln', en: 'The horns in the blue seats', fr: 'Les cuivres dans les fauteuils bleus' }
]

export const GALLERY_PHOTOS = PHOTOS.map(photo => ({ slug: photo.slug, alt: localized(photo) }))

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
