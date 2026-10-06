<script setup>
import { ref, watch, onBeforeUnmount } from 'vue'
import { GALLERY_PHOTOS, photoUrl } from '../gallery'

const INITIAL_COUNT = 8

const showAll = ref(false)
const openIndex = ref(null)

function open(index)
{
  openIndex.value = index
}

function close()
{
  openIndex.value = null
}

function step(direction)
{
  const count = GALLERY_PHOTOS.length
  openIndex.value = (openIndex.value + direction + count) % count
}

function handleKey(event)
{
  if(event.key === 'Escape')
    close()
  else if(event.key === 'ArrowRight')
    step(1)
  else if(event.key === 'ArrowLeft')
    step(-1)
}

// Keyboard navigation and scroll lock only while the lightbox is open.
watch(openIndex, (index, previous) =>
{
  const isOpen = index !== null
  if(isOpen === (previous !== null && previous !== undefined))
    return
  document.body.style.overflow = isOpen ? 'hidden' : ''
  if(isOpen)
    window.addEventListener('keydown', handleKey)
  else
    window.removeEventListener('keydown', handleKey)
})

onBeforeUnmount(() =>
{
  window.removeEventListener('keydown', handleKey)
  document.body.style.overflow = ''
})
</script>

<template>
  <section id="galerie" class="section">
    <div class="container">
      <p class="eyebrow">Eindrücke</p>
      <h2>Galerie</h2>
      <ul class="gallery">
        <li
          v-for="(photo, index) in GALLERY_PHOTOS"
          v-show="showAll || index < INITIAL_COUNT"
          :key="photo.slug"
          class="gallery__item"
          :class="{ 'gallery__item--wide': index % 5 === 0 }"
        >
          <button class="gallery__button" :aria-label="`Foto vergrößern: ${photo.alt}`" @click="open(index)">
            <img :src="photoUrl(photo.slug, index % 5 === 0 ? 'large' : 'small')" :alt="photo.alt" loading="lazy" />
          </button>
        </li>
      </ul>
      <div v-if="GALLERY_PHOTOS.length > INITIAL_COUNT" class="gallery__more">
        <button class="button button--ghost" @click="showAll = !showAll">
          {{ showAll ? 'Weniger anzeigen' : 'Alle Fotos anzeigen' }}
        </button>
      </div>
    </div>

    <div v-if="openIndex !== null" class="lightbox" role="dialog" aria-modal="true" aria-label="Fotoansicht" @click.self="close">
      <img :src="photoUrl(GALLERY_PHOTOS[openIndex].slug)" :alt="GALLERY_PHOTOS[openIndex].alt" />
      <button class="lightbox__button lightbox__close" aria-label="Schließen" @click="close">✕</button>
      <button class="lightbox__button lightbox__prev" aria-label="Vorheriges Foto" @click="step(-1)">‹</button>
      <button class="lightbox__button lightbox__next" aria-label="Nächstes Foto" @click="step(1)">›</button>
      <p class="lightbox__caption">{{ openIndex + 1 }} / {{ GALLERY_PHOTOS.length }} · {{ GALLERY_PHOTOS[openIndex].alt }}</p>
    </div>
  </section>
</template>

<style scoped>
.gallery {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 220px;
  grid-auto-flow: dense;
  gap: 0.75rem;
}
.gallery__item--wide {
  grid-column: span 2;
  grid-row: span 2;
}
.gallery__button {
  display: block;
  width: 100%;
  height: 100%;
  padding: 0;
  border: 0;
  border-radius: var(--radius);
  overflow: hidden;
  cursor: zoom-in;
  background: var(--surface);
}
.gallery__button img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s, filter 0.5s;
  filter: saturate(0.9);
}
.gallery__button:hover img,
.gallery__button:focus-visible img {
  transform: scale(1.05);
  filter: saturate(1.1);
}
.gallery__more {
  margin-top: 2rem;
  text-align: center;
}
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3.5rem 1rem;
  background: rgb(5 3 3 / 0.95);
}
.lightbox img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 4px;
}
.lightbox__button {
  position: absolute;
  width: 48px;
  height: 48px;
  border: 1px solid var(--line);
  border-radius: 50%;
  background: rgb(14 11 11 / 0.7);
  color: var(--text);
  font-size: 1.6rem;
  line-height: 1;
  cursor: pointer;
}
.lightbox__button:hover {
  border-color: var(--gold);
  color: var(--gold);
}
.lightbox__close {
  top: 1rem;
  right: 1rem;
  font-size: 1.1rem;
}
.lightbox__prev {
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
}
.lightbox__next {
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
}
.lightbox__caption {
  position: absolute;
  bottom: 0.75rem;
  left: 0;
  right: 0;
  margin: 0;
  text-align: center;
  color: var(--muted);
  font-size: 0.9rem;
}

@media (max-width: 760px) {
  .gallery {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 150px;
  }
  .lightbox__prev,
  .lightbox__next {
    top: auto;
    bottom: 2.5rem;
    transform: none;
  }
}
</style>
