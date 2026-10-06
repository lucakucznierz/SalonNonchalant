const MONTHS_SHORT = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez']
const WEEKDAYS = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag']

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
  return MONTHS_SHORT[date.getMonth()]
}

export function weekday(date)
{
  return WEEKDAYS[date.getDay()]
}

export function formatLongDate(date)
{
  return date.toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' })
}
