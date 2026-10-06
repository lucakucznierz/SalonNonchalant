import { toIsoDate } from '../utils/dates'
import { SHEET_ID } from '../config'

const SITE_URL = 'https://salon-nonchalant.de/'
const SCRIPT_ID = 'structured-data-events'

function toEvent(concert)
{
  const event = {
    '@type': 'MusicEvent',
    name: concert.title ? `Salon Nonchalant: ${concert.title}` : 'Salon Nonchalant live',
    startDate: toIsoDate(concert.date, concert.time),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    performer: { '@type': 'MusicGroup', name: 'Salon Nonchalant', url: SITE_URL },
    location: { '@type': 'Place', name: concert.venue || concert.address },
    image: [`${SITE_URL}og-image.jpg`]
  }
  if(concert.address)
    event.location.address = concert.address
  if(concert.info)
    event.description = concert.info
  if(concert.link)
    event.offers = { '@type': 'Offer', url: concert.link }
  return event
}

/// Publishes the upcoming concerts as schema.org events so search engines can show them as event results.
export function publishConcertEvents(concerts)
{
  document.getElementById(SCRIPT_ID)?.remove()
  // Without a Google Sheet the site shows example concerts, which must not reach search engines.
  if(!SHEET_ID || !concerts.length)
    return

  const script = document.createElement('script')
  script.id = SCRIPT_ID
  script.type = 'application/ld+json'
  script.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': concerts.map(toEvent) })
  document.head.appendChild(script)
}
