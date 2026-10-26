// Image sizes: "small" for thumbnails and cards, "large" for big tiles and the lightbox.
// Local photos are generated in both sizes by "npm run photos"; Drive thumbnails are requested at a matching width.
const DRIVE_WIDTHS = { small: 800, large: 2000 }

/// Returns the URL of a processed photo in public/photos in the given size ("large" or "small").
export function photoUrl(slug, size = 'large')
{
  return `${import.meta.env.BASE_URL}photos/${slug}-${size}.webp`
}

/// Turns a photo reference from the sheet into an image URL. Accepts a Google Drive share link,
/// any direct image link, or the name of a photo in public/photos (e.g. "img-6675").
export function sheetPhotoUrl(value, size = 'small')
{
  const reference = (value || '').trim()
  if(!reference)
    return null
  const driveId = reference.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:export=\w+&)?id=)([\w-]+)/)?.[1]
  if(driveId)
    return `https://drive.google.com/thumbnail?id=${driveId}&sz=w${DRIVE_WIDTHS[size]}`
  if(/^https?:\/\//.test(reference))
    return reference
  return photoUrl(reference, size)
}
