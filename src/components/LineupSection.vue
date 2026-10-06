<script setup>
import { ref, reactive, nextTick } from 'vue'
import { content } from '../services/content'
import { photoUrl, sheetPhotoUrl } from '../gallery'
import { t } from '../i18n'

const openKey = ref(null)
// Member photos that failed to load (e.g. a Drive file that is not shared) fall back to initials.
const brokenPhotos = reactive(new Set())

async function toggle(key)
{
  openKey.value = openKey.value === key ? null : key
  if(!openKey.value)
    return
  await nextTick()
  document.getElementById(panelId(key))?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
}

function panelId(key)
{
  return `members-${key.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
}

function initials(name)
{
  return name.split(/\s+/).map(part => part[0]).join('').slice(0, 2).toUpperCase()
}

function memberPhoto(member)
{
  const url = sheetPhotoUrl(member.photo)
  return (url && !brokenPhotos.has(url)) ? url : null
}
</script>

<template>
  <div v-if="content.lineup.length" class="container lineup">
    <h3 class="lineup__title">{{ t('lineup') }}</h3>
    <ul class="lineup__grid">
      <template v-for="entry in content.lineup" :key="entry.key">
        <li class="lineup__card" :class="{ 'lineup__card--open': openKey === entry.key }">
          <button
            class="lineup__button"
            :aria-expanded="openKey === entry.key"
            :aria-controls="panelId(entry.key)"
            @click="toggle(entry.key)"
          >
            <img v-if="entry.photo" :src="photoUrl(entry.photo, 'small')" alt="" loading="lazy" />
            <span class="lineup__body">
              <span class="lineup__name">{{ entry.section }}</span>
              <span class="lineup__instruments">{{ entry.instruments }}</span>
              <span class="lineup__hint">{{ t('showMembers') }} <span class="lineup__chevron" aria-hidden="true">▾</span></span>
            </span>
          </button>
        </li>

        <li v-if="openKey === entry.key" :id="panelId(entry.key)" class="lineup__panel">
          <div class="panel__header">
            <h4>{{ entry.section }}</h4>
            <button class="panel__close" :aria-label="t('close')" @click="toggle(entry.key)">✕</button>
          </div>
          <ul v-if="entry.members.length" class="members">
            <li v-for="member in entry.members" :key="member.name" class="member">
              <img
                v-if="memberPhoto(member)"
                class="member__photo"
                :src="memberPhoto(member)"
                :alt="member.name"
                loading="lazy"
                referrerpolicy="no-referrer"
                @error="brokenPhotos.add(memberPhoto(member))"
              />
              <span v-else class="member__photo member__photo--initials" aria-hidden="true">{{ initials(member.name) }}</span>
              <p class="member__name">{{ member.name }}</p>
              <p v-if="member.instrument" class="member__instrument">{{ member.instrument }}</p>
              <p v-if="member.info" class="member__info">{{ member.info }}</p>
            </li>
          </ul>
          <p v-else class="panel__empty">{{ t('membersComingSoon') }}</p>
        </li>
      </template>
    </ul>
  </div>
</template>

<style scoped>
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
  /* "dense" lets the cards after an open panel fill up the panel's row, so the panel lands right below the clicked card. */
  grid-auto-flow: dense;
  gap: 1rem;
}
.lineup__card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  overflow: hidden;
  transition: transform 0.25s, border-color 0.25s;
}
.lineup__card:hover,
.lineup__card--open {
  transform: translateY(-4px);
  border-color: var(--gold);
}
.lineup__button {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0;
  border: 0;
  background: none;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
}
.lineup__button img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  display: block;
}
.lineup__body {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1rem 1.1rem 1.1rem;
}
.lineup__name {
  margin: 0 0 0.3rem;
  hyphens: auto;
  overflow-wrap: break-word;
  font-family: var(--font-display);
  font-size: 1.35rem;
  line-height: 1.2;
}
.lineup__instruments {
  color: var(--muted);
  font-size: 0.95rem;
}
.lineup__hint {
  margin-top: auto;
  padding-top: 0.8rem;
  color: var(--gold);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.lineup__chevron {
  display: inline-block;
  transition: transform 0.25s;
}
.lineup__card--open .lineup__chevron {
  transform: rotate(180deg);
}
.lineup__panel {
  grid-column: 1 / -1;
  padding: clamp(1.25rem, 3vw, 2rem);
  background: var(--surface-alt);
  border: 1px solid var(--gold);
  border-radius: var(--radius);
  animation: panel-in 0.3s ease-out;
}
.panel__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.25rem;
}
.panel__header h4 {
  margin: 0;
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(1.5rem, 3.5vw, 2rem);
}
.panel__close {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border: 1px solid var(--line);
  border-radius: 50%;
  background: none;
  color: var(--text);
  cursor: pointer;
}
.panel__close:hover {
  border-color: var(--gold);
  color: var(--gold);
}
.panel__empty {
  margin: 0;
  color: var(--muted);
}
.members {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  gap: 1.5rem 1.25rem;
}
.member__photo {
  display: block;
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: calc(var(--radius) - 2px);
  margin-bottom: 0.75rem;
  background: var(--surface);
}
.member__photo--initials {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--red);
  color: var(--gold-light);
  font-family: var(--font-display);
  font-size: 2.5rem;
}
.member__name {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.25rem;
  line-height: 1.2;
}
.member__instrument {
  margin: 0.2rem 0 0;
  color: var(--gold);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.member__info {
  margin: 0.5rem 0 0;
  color: var(--muted);
  font-size: 0.95rem;
}

@keyframes panel-in {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
}

@media (max-width: 520px) {
  .lineup__grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .lineup__body {
    padding: 0.85rem 0.8rem 0.9rem;
  }
  /* Scales with the screen so long words like "Rhythmusgruppe" fit into half the width. */
  .lineup__name {
    font-size: clamp(1rem, 4.2vw, 1.35rem);
  }
  .members {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem 0.9rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .lineup__panel {
    animation: none;
  }
}
</style>
