<script setup>
import { computed } from 'vue'
import { content, text, paragraphs } from '../services/content'
import { photoUrl } from '../gallery'
import { t } from '../i18n'

const facts = computed(() => [1, 2, 3]
  .map(n => ({ number: text(`fakt${n}_zahl`), label: text(`fakt${n}_text`) }))
  .filter(fact => fact.number))
</script>

<template>
  <section id="band" class="section">
    <div class="container about">
      <div class="about__text">
        <p class="eyebrow">{{ t('bandEyebrow') }}</p>
        <h2>{{ text('ueber_titel', t('aboutFallback')) }}</h2>
        <p v-for="(paragraph, index) in paragraphs('ueber_text')" :key="index">{{ paragraph }}</p>
        <dl v-if="facts.length" class="about__facts">
          <div v-for="fact in facts" :key="fact.label">
            <dt>{{ fact.number }}</dt>
            <dd>{{ fact.label }}</dd>
          </div>
        </dl>
      </div>
      <figure class="about__image">
        <img :src="photoUrl('img-6692')" :alt="t('aboutAlt')" loading="lazy" />
      </figure>
    </div>

    <div v-if="content.lineup.length" class="container lineup">
      <h3 class="lineup__title">{{ t('lineup') }}</h3>
      <ul class="lineup__grid">
        <li v-for="entry in content.lineup" :key="entry.section" class="lineup__card">
          <img v-if="entry.photo" :src="photoUrl(entry.photo, 'small')" :alt="entry.section" loading="lazy" />
          <div class="lineup__body">
            <h4>{{ entry.section }}</h4>
            <p>{{ entry.instruments }}</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.about {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: clamp(2rem, 6vw, 5rem);
  align-items: center;
}
.about__text p {
  color: var(--muted);
  font-size: 1.1rem;
}
.about__image {
  margin: 0;
}
.about__image img {
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  border-radius: var(--radius);
}
.about__facts {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin: 2.5rem 0 0;
  padding-top: 2rem;
  border-top: 1px solid var(--line);
}
.about__facts dt {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 2.8rem);
  color: var(--gold);
  line-height: 1;
}
.about__facts dd {
  margin: 0.4rem 0 0;
  color: var(--muted);
  font-size: 0.9rem;
}
.lineup {
  margin-top: clamp(4rem, 10vw, 7rem);
}
.lineup__title {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(1.8rem, 4vw, 2.4rem);
  margin: 0 0 1.5rem;
}
.lineup__grid {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  gap: 1rem;
}
.lineup__card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  overflow: hidden;
  transition: transform 0.25s, border-color 0.25s;
}
.lineup__card:hover {
  transform: translateY(-4px);
  border-color: var(--gold);
}
.lineup__card img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  display: block;
}
.lineup__body {
  padding: 1rem 1.1rem 1.2rem;
}
.lineup__body h4 {
  margin: 0 0 0.3rem;
  hyphens: auto;
  overflow-wrap: break-word;
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 1.35rem;
}
.lineup__body p {
  margin: 0;
  color: var(--muted);
  font-size: 0.95rem;
}

@media (max-width: 860px) {
  .about {
    grid-template-columns: 1fr;
  }
  .about__image img {
    aspect-ratio: 4 / 3;
  }
}

@media (max-width: 520px) {
  .lineup__grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .lineup__body {
    padding: 0.85rem 0.8rem 1rem;
  }
  /* Scales with the screen so long words like "Rhythmusgruppe" fit into half the width. */
  .lineup__body h4 {
    font-size: clamp(1rem, 4.2vw, 1.35rem);
  }
}
</style>
