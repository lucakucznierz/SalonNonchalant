// Generates the PNG/ICO icons that phones, bookmarks and search engines need, from the same design as public/favicon.svg.
// Browsers on computers use the SVG directly; iOS home screens, Android and Google results need bitmap files.
// Run with "npm run icons" after changing the icon design.
import { writeFile } from 'node:fs/promises'
import sharp from 'sharp'

const BACKGROUND = '#5c0f19'
const GOLD = '#d4a95a'

/// Icon artwork as SVG. "cornerRadius" is 0 for icons that the phone masks itself (iOS rounds them, Android crops them).
function iconSvg(cornerRadius, fontSize)
{
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">`
    + `<rect width="64" height="64" rx="${cornerRadius}" fill="${BACKGROUND}"/>`
    + `<text x="32" y="${32 + fontSize * 0.36}" text-anchor="middle" font-family="Georgia, serif" font-size="${fontSize}" fill="${GOLD}">SN</text>`
    + `</svg>`
  )
}

async function renderPng(svg, size, target)
{
  const png = await sharp(svg, { density: 72 * size / 64 * 4 }).resize(size, size).png().toBuffer()
  if(target)
    await writeFile(target, png)
  return png
}

/// Wraps PNG images into one .ico file (PNG-in-ICO is supported by all current browsers and Windows).
function toIco(pngs)
{
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(pngs.length, 4)
  let offset = 6 + 16 * pngs.length
  const entries = pngs.map(({ size, data }) =>
  {
    const entry = Buffer.alloc(16)
    entry.writeUInt8(size >= 256 ? 0 : size, 0)
    entry.writeUInt8(size >= 256 ? 0 : size, 1)
    entry.writeUInt16LE(1, 4)
    entry.writeUInt16LE(32, 6)
    entry.writeUInt32LE(data.length, 8)
    entry.writeUInt32LE(offset, 12)
    offset += data.length
    return entry
  })
  return Buffer.concat([header, ...entries, ...pngs.map(png => png.data)])
}

const ROUNDED = iconSvg(12, 30)
const FULL_BLEED = iconSvg(0, 30)
// Android may crop up to the outer 20 % of "maskable" icons, so the letters are smaller there.
const MASKABLE = iconSvg(0, 22)

await renderPng(FULL_BLEED, 180, 'public/apple-touch-icon.png')
await renderPng(ROUNDED, 192, 'public/icon-192.png')
await renderPng(ROUNDED, 512, 'public/icon-512.png')
await renderPng(MASKABLE, 512, 'public/icon-maskable-512.png')

const icoSizes = [16, 32, 48]
const icoImages = await Promise.all(icoSizes.map(async size => ({ size, data: await renderPng(ROUNDED, size) })))
await writeFile('public/favicon.ico', toIco(icoImages))

console.log('Icons written to public/')
