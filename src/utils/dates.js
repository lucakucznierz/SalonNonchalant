import { LANG } from '../i18n'

const LOCALE = LANG === 'en' ? 'en-GB' : 'de-DE'

function buildDate(year, month, day)
{
  let fullYear = Number(year)
  if(fullYear < 100)
    fullYear += 2000
  const date = new Date(fullYear, Number(month) - 1, Number(day))
  return isNaN(date) ? null : date
}

/// Parses dates as typed into the sheet: "24.12.2026", "2026-12-24" or Google's "12/24/2026".
export function parseDate(value)
{
  const text = (value || '').trim()
  let match = text.match(/^(\d{1,2})\.(\d{1,2})\.(\d{2,4})/)
  if(match)
    return buildDate(match[3], match[2], match[1])
  match = text.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)
  if(match)
    return buildDate(match[1], match[2], match[3])
  match = text.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/)
  if(match)
    return buildDate(match[3], match[1], match[2])
  return null
}

/// Shortens times like "19:30:00" to "19:30".
export function formatTime(value)
{
  const match = (value || '').trim().match(/^(\d{1,2}):(\d{2})/)
  return match ? `${match[1].padStart(2, '0')}:${match[2]}` : (value || '').trim()
}

export function startOfToday()
{
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), now.getDate())
}

export function monthShort(date)
{
  return date.toLocaleDateString(LOCALE, { month: 'short' }).replace('.', '')
}

export function weekday(date)
{
  return date.toLocaleDateString(LOCALE, { weekday: 'long' })
}

export function formatLongDate(date)
{
  return date.toLocaleDateString(LOCALE, { day: 'numeric', month: 'long', year: 'numeric' })
}

/// Formats a date (plus optional "HH:MM" time) as ISO 8601 for structured data, e.g. "2026-12-05T19:30".
export function toIsoDate(date, time)
{
  const day = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
  return /^\d{2}:\d{2}$/.test(time) ? `${day}T${time}` : day
}
