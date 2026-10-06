// Converts the high-resolution originals in /Photos into web-sized WebP files in /public/photos.
// Run with "npm run photos" whenever photos are added or replaced.
import { readdir, mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const SOURCE_DIR = 'Photos'
const TARGET_DIR = 'public/photos'
const SIZES = { large: 2000, small: 800 }

function toSlug(fileName)
{
  return path.parse(fileName).name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

await mkdir(TARGET_DIR, { recursive: true })
const files = (await readdir(SOURCE_DIR)).filter(f => /\.(jpe?g|png|webp)$/i.test(f))
const manifest = []

for(const file of files)
{
  const slug = toSlug(file)
  const image = sharp(path.join(SOURCE_DIR, file)).rotate()
  const { width, height } = await image.metadata()
  for(const [label, maxWidth] of Object.entries(SIZES))
  {
    await image.clone()
      .resize({ width: maxWidth, height: maxWidth, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(path.join(TARGET_DIR, `${slug}-${label}.webp`))
  }
  manifest.push({ slug, original: file, landscape: width >= height })
  console.log(`${file} -> ${slug}`)
}

await writeFile(path.join(TARGET_DIR, 'manifest.json'), JSON.stringify(manifest, null, 2))
console.log(`Done: ${manifest.length} photos`)
