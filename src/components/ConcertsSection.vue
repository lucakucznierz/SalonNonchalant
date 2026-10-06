<script setup>
import { ref } from 'vue'
import { content } from '../services/content'
import { monthShort, weekday, formatLongDate } from '../utils/dates'
import { t } from '../i18n'

const showPast = ref(false)

function mapsUrl(concert)
{
  const query = [concert.venue, concert.address].filter(Boolean).join(', ')
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}
</script>

<template>
  <section id="konzerte" class="section section--alt">
    <div class="container">
      <p class="eyebrow">{{ t('concertsEyebrow') }}</p>
      <h2>{{ t('concerts') }}</h2>

      <p v-if="content.loading" class="concerts__note">{{ t('loadingConcerts') }}</p>
      <p v-else-if="!content.upcomingConcerts.length" class="concerts__note">
        {{ t('noConcerts') }} <a href="#kontakt">{{ t('noConcertsLink') }}</a>.
      </p>

      <ol v-else class="concerts">
        <li v-for="(concert, index) in content.upcomingConcerts" :key="index" class="concert">
          <div class="concert__date">
            <span class="concert__day">{{ concert.date.getDate() }}</span>
            <span class="concert__month">{{ monthShort(concert.date) }} {{ concert.date.getFullYear() }}</span>
          </div>
          <div class="concert__details">
            <h3>{{ concert.title || t('concertFallback') }}</h3>
            <p class="concert__meta">
              {{ weekday(concert.date) }}<template v-if="concert.time"> · {{ concert.time }}{{ t('timeSuffix') }}</template>
              <template v-if="concert.venue"> · {{ concert.venue }}</template>
            </p>
            <p v-if="concert.address" class="concert__address">
              <a :href="mapsUrl(concert)" target="_blank" rel="noopener">{{ concert.address }}</a>
            </p>
            <p v-if="concert.info" class="concert__info">{{ concert.info }}</p>
          </div>
          <a v-if="concert.link" :href="concert.link" class="button button--small" target="_blank" rel="noopener">{{ t('moreInfo') }}</a>
        </li>
      </ol>

      <div v-if="content.pastConcerts.length" class="past">
        <button class="past__toggle" :aria-expanded="showPast" @click="showPast = !showPast">
          {{ showPast ? t('hidePast') : `${t('showPast')} (${content.pastConcerts.length})` }}
        </button>
        <ul v-if="showPast" class="past__list">
          <li v-for="(concert, index) in content.pastConcerts" :key="index">
            <span>{{ formatLongDate(concert.date) }}</span>
            <span>{{ concert.title }}<template v-if="concert.venue">, {{ concert.venue }}</template></span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.concerts__note {
  color: var(--muted);
  font-size: 1.1rem;
}
.concerts {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 1rem;
}
.concert {
  display: grid;
  grid-template-columns: 110px 1fr auto;
  gap: 1.5rem;
  align-items: center;
  padding: 1.5rem;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  transition: border-color 0.25s;
}
.concert:hover {
  border-color: var(--gold);
}
.concert__date {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.75rem 0.5rem;
  border-radius: calc(var(--radius) - 4px);
  background: var(--red);
  text-align: center;
}
.concert__day {
  font-family: var(--font-display);
  font-size: 2.6rem;
  line-height: 1;
}
.concert__month {
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--gold-light);
}
.concert__details h3 {
  line-height: 1.2;
  margin: 0 0 0.3rem;
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 1.5rem;
}
.concert__meta,
.concert__address,
.concert__info {
  margin: 0.15rem 0 0;
  color: var(--muted);
}
.concert__info {
  color: var(--text);
}
.past {
  margin-top: 2rem;
}
.past__toggle {
  background: none;
  border: 0;
  padding: 0.5rem 0;
  color: var(--gold);
  font: inherit;
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 4px;
}
.past__list {
  list-style: none;
  padding: 0;
  margin: 1rem 0 0;
  color: var(--muted);
}
.past__list li {
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: 1rem;
  padding: 0.6rem 0;
  border-bottom: 1px solid var(--line);
}

@media (max-width: 640px) {
  .concert {
    grid-template-columns: 76px 1fr;
    align-items: start;
    gap: 1rem;
    padding: 1rem;
  }
  .concert__day {
    font-size: 2rem;
  }
  .concert__month {
    font-size: 0.65rem;
  }
  .concert .button {
    grid-column: 1 / -1;
    justify-self: start;
  }
  .past__list li {
    grid-template-columns: 1fr;
    gap: 0.1rem;
  }
}
</style>
