<script setup>
import { computed } from 'vue'
import { paragraphs } from '../services/content'

const props = defineProps({ page: { type: String, required: true } })

const TITLES = { impressum: 'Impressum', datenschutz: 'Datenschutz' }

const title = computed(() => TITLES[props.page])
</script>

<template>
  <section class="section legal">
    <div class="container legal__inner">
      <a href="#top" class="legal__back">← Zurück zur Startseite</a>
      <h1>{{ title }}</h1>
      <p v-for="(paragraph, index) in paragraphs(page)" :key="index">{{ paragraph }}</p>
    </div>
  </section>
</template>

<style scoped>
.legal {
  padding-top: 140px;
  min-height: 70vh;
}
.legal__inner {
  max-width: 46rem;
}
.legal h1 {
  font-size: clamp(2.4rem, 6vw, 3.5rem);
  margin: 1rem 0 1.5rem;
}
.legal p {
  color: var(--muted);
  margin: 0 0 0.6rem;
}
.legal__back {
  color: var(--gold);
}
</style>
