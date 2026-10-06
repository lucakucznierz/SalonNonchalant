<script setup>
import { computed } from 'vue'
import { text, paragraphs } from '../services/content'
import { photoUrl } from '../gallery'

const socialLinks = computed(() => [
  { label: 'Instagram', url: text('instagram') },
  { label: 'Facebook', url: text('facebook') },
  { label: 'YouTube', url: text('youtube') }
].filter(link => link.url))
</script>

<template>
  <section id="kontakt" class="contact">
    <img class="contact__image" :src="photoUrl('img-6761')" alt="" loading="lazy" />
    <div class="container contact__inner">
      <p class="eyebrow">Booking & Kontakt</p>
      <h2>{{ text('buchen_titel', 'Kontakt') }}</h2>
      <p v-for="(paragraph, index) in paragraphs('buchen_text')" :key="index" class="contact__text">{{ paragraph }}</p>
      <div class="contact__actions">
        <a v-if="text('email')" :href="`mailto:${text('email')}`" class="button">{{ text('email') }}</a>
        <a v-if="text('telefon')" :href="`tel:${text('telefon').replace(/[^\d+]/g, '')}`" class="button button--ghost">{{ text('telefon') }}</a>
      </div>
      <ul v-if="socialLinks.length" class="contact__social">
        <li v-for="link in socialLinks" :key="link.label">
          <a :href="link.url" target="_blank" rel="noopener">{{ link.label }}</a>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.contact {
  position: relative;
  padding: clamp(5rem, 12vw, 9rem) 0;
  overflow: hidden;
  isolation: isolate;
}
.contact__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 70% 20%;
  z-index: -2;
}
.contact::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(90deg, var(--bg) 0%, rgb(14 11 11 / 0.92) 45%, rgb(14 11 11 / 0.35) 100%);
}
.contact__inner {
  max-width: var(--container);
}
.contact__inner > * {
  max-width: 34rem;
}
.contact__text {
  color: var(--text);
  font-size: 1.15rem;
}
.contact__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2rem;
}
.contact__social {
  list-style: none;
  display: flex;
  gap: 1.5rem;
  padding: 0;
  margin: 2rem 0 0;
}
.contact__social a {
  color: var(--gold);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.9rem;
}

@media (max-width: 760px) {
  .contact::before {
    background: rgb(14 11 11 / 0.85);
  }
}
</style>
