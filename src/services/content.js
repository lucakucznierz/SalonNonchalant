import { reactive } from 'vue'
import Papa from 'papaparse'
import { SHEET_ID, TABS } from '../config'
import { parseDate, formatTime, startOfToday } from '../utils/dates'
import { localized } from '../i18n'

const LOCAL_FILES = {
  concerts: 'konzerte.csv',
  texts: 'texte.csv',
  lineup: 'besetzung.csv'
}

/// Shared, reactive site content. Filled once by loadContent().
export const content = reactive({
  loading: true,
  texts: {},
  upcomingConcerts: [],
  pastConcerts: [],
  lineup: []
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
  return parsed.data
}

/// Loads one table from the Google Sheet, falling back to the bundled example file.
async function loadTable(key)
{
  if(SHEET_ID)
  {
    try
    {
      return await fetchCsv(sheetUrl(TABS[key]))
    }
    catch(error)
    {
      console.error(`Google Sheet tab "${TABS[key]}" could not be loaded, using local data.`, error)
    }
  }
  return fetchCsv(`${import.meta.env.BASE_URL}data/${LOCAL_FILES[key]}`)
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
      texts[field] = localized(clean(row.Inhalt), clean(row.Inhalt_EN))
  }
  return texts
}

function toConcerts(rows)
{
  return rows
    .map(row => ({
      date: parseDate(row.Datum),
      time: formatTime(row.Uhrzeit),
      title: localized(clean(row.Titel), clean(row.Titel_EN)),
      venue: clean(row.Ort),
      address: clean(row.Adresse),
      link: clean(row.Link),
      info: localized(clean(row.Info), clean(row.Info_EN))
    }))
    .filter(concert => concert.date)
}

function toLineup(rows)
{
  return rows
    .map(row => ({
      section: localized(clean(row.Register), clean(row.Register_EN)),
      instruments: localized(clean(row.Instrumente), clean(row.Instrumente_EN)),
      photo: clean(row.Foto)
    }))
    .filter(entry => entry.section)
}

/// Loads all content tables in parallel and fills the shared content object.
export async function loadContent()
{
  const [textRows, concertRows, lineupRows] = await Promise.all(
    ['texts', 'concerts', 'lineup'].map(key => loadTable(key).catch(error =>
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
  content.lineup = toLineup(lineupRows)
  content.loading = false
}

/// Returns an editable text by its field name (English column on the English page), or the fallback when empty.
export function text(field, fallback = '')
{
  return content.texts[field] || fallback
}

/// Splits a multi-line text into paragraphs (blank line or line break = new paragraph).
export function paragraphs(field)
{
  return text(field).split(/\n+/).map(p => p.trim()).filter(Boolean)
}
