import { reactive } from 'vue'
import Papa from 'papaparse'
import { SHEET_ID, TABS } from '../config'
import { parseDate, formatTime, startOfToday } from '../utils/dates'
import { localizedColumn } from '../i18n'
import { sheetPhotoUrl } from '../gallery'

// Per table: bundled example file, columns that identify the tab, and whether the example file
// may stand in for a broken sheet tab (never for members, so no fake people appear on the live site).
// The column combination must be unique to each tab, because Google answers a missing tab with the first tab.
const TABLES = {
  concerts: { file: 'konzerte.csv', requiredColumns: ['Datum', 'Titel'], useLocalFallback: true },
  texts: { file: 'texte.csv', requiredColumns: ['Feld', 'Inhalt'], useLocalFallback: true },
  lineup: { file: 'besetzung.csv', requiredColumns: ['Register', 'Instrumente'], useLocalFallback: true },
  members: { file: 'mitglieder.csv', requiredColumns: ['Name', 'Register'], useLocalFallback: false },
  gallery: { file: 'galerie.csv', requiredColumns: ['Foto', 'Beschreibung'], useLocalFallback: true },
  pageImages: { file: 'bilder.csv', requiredColumns: ['Bereich', 'Foto'], useLocalFallback: true }
}

/// Shared, reactive site content. Filled once by loadContent().
export const content = reactive({
  loading: true,
  texts: {},
  upcomingConcerts: [],
  pastConcerts: [],
  lineup: [],
  galleryPhotos: [],
  pageImages: {}
})

function sheetUrl(tabName)
{
  // "headers=1" stops Google from merging several rows into the header row.
  return `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&headers=1&sheet=${encodeURIComponent(tabName)}`
}

async function fetchCsv(url)
{
  const response = await fetch(url, { cache: 'no-store' })
  if(!response.ok)
    throw new Error(`${response.status} ${response.statusText}`)
  const parsed = Papa.parse(await response.text(), { header: true, skipEmptyLines: 'greedy', transformHeader: h => h.trim() })
  return parsed
}

/// Loads one table from the Google Sheet, falling back to the bundled example file where allowed.
async function loadTable(key)
{
  const table = TABLES[key]
  if(SHEET_ID)
  {
    try
    {
      const parsed = await fetchCsv(sheetUrl(TABS[key]))
      const missing = table.requiredColumns.filter(column => !parsed.meta.fields?.includes(column))
      if(missing.length)
        throw new Error(`columns missing: ${missing.join(', ')}`)
      return parsed.data
    }
    catch(error)
    {
      console.warn(`Google Sheet tab "${TABS[key]}" could not be used.`, error)
      if(!table.useLocalFallback)
        return []
    }
  }
  return (await fetchCsv(`${import.meta.env.BASE_URL}data/${table.file}`)).data
}

function clean(value)
{
  return (value || '').trim()
}

function toTexts(rows)
{
  const texts = {}
  for(const row of rows)
  {
    const field = clean(row.Feld)
    if(field)
      texts[field] = localizedColumn(row, 'Inhalt')
  }
  return texts
}

function toConcerts(rows)
{
  return rows
    .map(row => ({
      date: parseDate(row.Datum),
      time: formatTime(row.Uhrzeit),
      title: localizedColumn(row, 'Titel'),
      venue: clean(row.Ort),
      address: clean(row.Adresse),
      link: clean(row.Link),
      info: localizedColumn(row, 'Info')
    }))
    .filter(concert => concert.date)
}

function toMembers(rows)
{
  return rows
    .map(row => ({
      section: clean(row.Register),
      name: clean(row.Name),
      instrument: localizedColumn(row, 'Instrument'),
      info: localizedColumn(row, 'Info'),
      photo: clean(row.Foto)
    }))
    .filter(member => member.name)
}

/// Builds the line-up sections; members are matched to their section by the German "Register" name.
function toLineup(rows, memberRows)
{
  const members = toMembers(memberRows)
  return rows
    .map(row =>
    {
      const key = clean(row.Register)
      return {
        key,
        section: localizedColumn(row, 'Register'),
        instruments: localizedColumn(row, 'Instrumente'),
        photo: clean(row.Foto),
        members: members.filter(member => member.section.toLowerCase() === key.toLowerCase())
      }
    })
    .filter(entry => entry.key)
}

function toGalleryPhotos(rows)
{
  return rows
    .map(row => ({
      small: sheetPhotoUrl(row.Foto, 'small'),
      large: sheetPhotoUrl(row.Foto, 'large'),
      alt: localizedColumn(row, 'Beschreibung') || 'Salon Nonchalant'
    }))
    .filter(photo => photo.small)
}

/// Maps the "Bilder" tab to { oben: 'img-…' | 'https://…', band: …, kontakt: … }.
function toPageImages(rows)
{
  const images = {}
  for(const row of rows)
  {
    const area = clean(row.Bereich).toLowerCase()
    if(area)
      images[area] = clean(row.Foto)
  }
  return images
}

/// Loads all content tables in parallel and fills the shared content object.
export async function loadContent()
{
  const [textRows, concertRows, lineupRows, memberRows, galleryRows, pageImageRows] = await Promise.all(
    ['texts', 'concerts', 'lineup', 'members', 'gallery', 'pageImages'].map(key => loadTable(key).catch(error =>
    {
      console.error(`Content "${key}" could not be loaded.`, error)
      return []
    }))
  )

  const today = startOfToday()
  const concerts = toConcerts(concertRows)
  content.texts = toTexts(textRows)
  content.upcomingConcerts = concerts.filter(c => c.date >= today).sort((a, b) => a.date - b.date)
  content.pastConcerts = concerts.filter(c => c.date < today).sort((a, b) => b.date - a.date)
  content.lineup = toLineup(lineupRows, memberRows)
  content.galleryPhotos = toGalleryPhotos(galleryRows)
  content.pageImages = toPageImages(pageImageRows)
  content.loading = false
}

/// Returns an editable text by its field name (English column on the English page), or the fallback when empty.
export function text(field, fallback = '')
{
  return content.texts[field] || fallback
}

// Built-in photos for the large section photos, used when the "Bilder" tab leaves an area empty.
const PAGE_IMAGE_DEFAULTS = {
  oben: 'mg-6401-2',
  band: 'img-6692',
  kontakt: 'img-6761'
}

/// URL of a large section photo ("oben", "band" or "kontakt"): the sheet entry if set, otherwise the built-in photo.
/// Returns null while the content is loading, so a built-in photo does not flash up before the sheet's choice.
export function pageImage(key, size = 'large')
{
  if(content.loading)
    return null
  return sheetPhotoUrl(content.pageImages[key] || PAGE_IMAGE_DEFAULTS[key], size)
}

/// Splits a multi-line text into paragraphs (blank line or line break = new paragraph).
export function paragraphs(field)
{
  return text(field).split(/\n+/).map(p => p.trim()).filter(Boolean)
}
