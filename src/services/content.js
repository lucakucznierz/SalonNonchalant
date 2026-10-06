import { reactive } from 'vue'
import Papa from 'papaparse'
import { SHEET_ID, TABS } from '../config'
import { parseDate, formatTime, startOfToday } from '../utils/dates'
import { localized } from '../i18n'

// Per table: bundled example file, a column that must exist, and whether the example file
// may stand in for a broken sheet tab (never for members, so no fake people appear on the live site).
const TABLES = {
  concerts: { file: 'konzerte.csv', requiredColumn: 'Datum', useLocalFallback: true },
  texts: { file: 'texte.csv', requiredColumn: 'Feld', useLocalFallback: true },
  lineup: { file: 'besetzung.csv', requiredColumn: 'Register', useLocalFallback: true },
  members: { file: 'mitglieder.csv', requiredColumn: 'Name', useLocalFallback: false }
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
      // Google answers a missing tab with the first tab, so check that the expected column is there.
      if(!parsed.meta.fields?.includes(table.requiredColumn))
        throw new Error(`column "${table.requiredColumn}" missing`)
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

function toMembers(rows)
{
  return rows
    .map(row => ({
      section: clean(row.Register),
      name: clean(row.Name),
      instrument: localized(clean(row.Instrument), clean(row.Instrument_EN)),
      info: localized(clean(row.Info), clean(row.Info_EN)),
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
        section: localized(key, clean(row.Register_EN)),
        instruments: localized(clean(row.Instrumente), clean(row.Instrumente_EN)),
        photo: clean(row.Foto),
        members: members.filter(member => member.section.toLowerCase() === key.toLowerCase())
      }
    })
    .filter(entry => entry.key)
}

/// Loads all content tables in parallel and fills the shared content object.
export async function loadContent()
{
  const [textRows, concertRows, lineupRows, memberRows] = await Promise.all(
    ['texts', 'concerts', 'lineup', 'members'].map(key => loadTable(key).catch(error =>
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
