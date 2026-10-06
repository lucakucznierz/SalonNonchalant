// Photos shown in the gallery, in this order. Names refer to files in public/photos
// (generated from the originals in /Photos with "npm run photos").
export const GALLERY_PHOTOS = [
  { slug: 'mg-6401-2', alt: 'Die ganze Band im Kinosaal' },
  { slug: 'img-6692', alt: 'Die Bläser in Schwarz-Weiß' },
  { slug: 'img-6675', alt: 'Der Saxophonsatz vor roter Wand' },
  { slug: 'img-6761', alt: 'Porträt zweier Bandmitglieder' },
  { slug: 'img-6672', alt: 'Trompeten und Posaunen in den Kinosesseln' },
  { slug: 'mg-6418', alt: 'Die Rhythmusgruppe mit Gitarre und Kontrabass' },
  { slug: 'mg-6430', alt: 'Die Geigerinnen' },
  { slug: 'img-6644', alt: 'Bläser in Schwarz-Weiß' },
  { slug: 'img-6620', alt: 'Saxophone zwischen den Sitzreihen' },
  { slug: 'img-6738', alt: 'Zwei Bandmitglieder an der Treppe' },
  { slug: 'mg-6391-1', alt: 'Gruppenfoto im Vintage-Look' },
  { slug: 'img-6666', alt: 'Die Bläser spielen im Saal' },
  { slug: 'mg-6420', alt: 'Rhythmusgruppe in Schwarz-Weiß' },
  { slug: 'img-6634', alt: 'Saxophonsatz vor der roten Wand' },
  { slug: 'mg-6436', alt: 'Geigerinnen auf der Treppe' },
  { slug: 'img-6694', alt: 'Die Bläser in den blauen Sesseln' }
]

/// Returns the URL of a processed photo in the given size ("large" or "small").
export function photoUrl(slug, size = 'large')
{
  return `${import.meta.env.BASE_URL}photos/${slug}-${size}.webp`
}
