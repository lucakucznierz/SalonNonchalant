<script setup>
import { computed } from 'vue'
import { text, paragraphs } from '../services/content'
import { photoUrl } from '../gallery'
import { t } from '../i18n'
import LineupSection from './LineupSection.vue'

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

    <LineupSection />
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

@media (max-width: 860px) {
  .about {
    grid-template-columns: 1fr;
  }
  .about__image img {
    aspect-ratio: 4 / 3;
  }
}
</style>
