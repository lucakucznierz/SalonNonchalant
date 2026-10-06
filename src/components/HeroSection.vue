<script setup>
import { computed } from 'vue'
import { content, text } from '../services/content'
import { photoUrl } from '../gallery'
import { formatLongDate } from '../utils/dates'
import { t } from '../i18n'

const nextConcert = computed(() => content.upcomingConcerts[0])
</script>

<template>
  <section id="top" class="hero">
    <img
      class="hero__image"
      :src="photoUrl('mg-6401-2')"
      :srcset="`${photoUrl('mg-6401-2', 'small')} 800w, ${photoUrl('mg-6401-2')} 2000w`"
      sizes="100vw"
      :alt="t('heroAlt')"
      fetchpriority="high"
    />
    <div class="hero__content container">
      <p class="eyebrow">{{ text('hero_zeile', t('heroFallback')) }}</p>
      <h1 class="hero__title">Salon <em>Nonchalant</em></h1>
      <p class="hero__slogan">{{ text('slogan') }}</p>
      <div class="hero__actions">
        <a href="#konzerte" class="button">{{ t('upcomingConcerts') }}</a>
        <a href="#kontakt" class="button button--ghost">{{ t('bookBand') }}</a>
      </div>
      <a v-if="nextConcert" href="#konzerte" class="hero__next">
        <span class="hero__next-label">{{ t('nextShow') }}</span>
        <span>{{ formatLongDate(nextConcert.date) }} · {{ nextConcert.title }}<template v-if="nextConcert.venue">, {{ nextConcert.venue }}</template></span>
      </a>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: flex-end;
  padding: 120px 0 72px;
  isolation: isolate;
  overflow: hidden;
}
.hero__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 35%;
  z-index: -2;
}
.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    linear-gradient(to top, var(--bg) 0%, rgb(14 11 11 / 0.8) 38%, rgb(14 11 11 / 0.2) 72%, rgb(14 11 11 / 0.5) 100%);
}
.hero__content {
  text-shadow: 0 2px 18px rgb(0 0 0 / 0.6);
}
.hero__title {
  font-size: clamp(3.2rem, 11vw, 8rem);
  line-height: 0.95;
  margin: 0.2em 0 0.25em;
}
.hero__title em {
  color: var(--gold);
}
.hero__slogan {
  max-width: 36rem;
  font-size: clamp(1.1rem, 2.4vw, 1.35rem);
  color: var(--text);
  margin: 0 0 2rem;
}
.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.hero__next {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 0.25rem 0.75rem;
  align-items: center;
  margin-top: 2.5rem;
  padding: 0.75rem 1.1rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: rgb(14 11 11 / 0.6);
  backdrop-filter: blur(6px);
  color: var(--text);
  text-decoration: none;
  font-size: 0.95rem;
}
.hero__next:hover {
  border-color: var(--gold);
}
.hero__next-label {
  color: var(--gold);
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
</style>
