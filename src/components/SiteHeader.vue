<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { t, LANGUAGE_SWITCH } from '../i18n'

defineProps({ solid: Boolean })

const LINKS = [
  { href: '#band', label: t('navBand') },
  { href: '#konzerte', label: t('navConcerts') },
  { href: '#galerie', label: t('navGallery') },
  { href: '#kontakt', label: t('navBooking') }
]

const scrolled = ref(false)
const menuOpen = ref(false)

function updateScrolled()
{
  scrolled.value = window.scrollY > 40
}

onMounted(() =>
{
  updateScrolled()
  window.addEventListener('scroll', updateScrolled, { passive: true })
})

onBeforeUnmount(() => window.removeEventListener('scroll', updateScrolled))
</script>

<template>
  <header class="header" :class="{ 'header--solid': solid || scrolled || menuOpen }">
    <div class="header__inner container">
      <a href="#top" class="header__logo" @click="menuOpen = false">Salon <em>Nonchalant</em></a>
      <button
        class="header__toggle"
        :aria-expanded="menuOpen"
        aria-controls="main-nav"
        :aria-label="t('openMenu')"
        @click="menuOpen = !menuOpen"
      >
        <span></span><span></span><span></span>
      </button>
      <nav id="main-nav" class="header__nav" :class="{ 'header__nav--open': menuOpen }">
        <a v-for="link in LINKS" :key="link.href" :href="link.href" @click="menuOpen = false">{{ link.label }}</a>
        <a
          class="header__lang"
          :href="LANGUAGE_SWITCH.href"
          :hreflang="LANGUAGE_SWITCH.hreflang"
          :lang="LANGUAGE_SWITCH.hreflang"
          :title="LANGUAGE_SWITCH.title"
        >{{ LANGUAGE_SWITCH.label }}</a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  inset: 0 0 auto;
  z-index: 50;
  transition: background 0.3s, box-shadow 0.3s;
}
.header--solid {
  background: rgb(14 11 11 / 0.92);
  backdrop-filter: blur(10px);
  box-shadow: 0 1px 0 var(--line);
}
.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
}
.header__logo {
  font-family: var(--font-display);
  font-size: 1.5rem;
  color: var(--text);
  text-decoration: none;
}
.header__logo em {
  color: var(--gold);
}
.header__nav {
  display: flex;
  gap: 2rem;
}
.header__nav a {
  color: var(--text);
  text-decoration: none;
  font-size: 0.95rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.header__nav a:hover {
  color: var(--gold);
}
.header__nav .header__lang {
  padding: 0.1rem 0.55rem;
  border: 1px solid var(--gold);
  border-radius: 999px;
  color: var(--gold);
  font-size: 0.8rem;
}
.header__toggle {
  display: none;
  background: none;
  border: 0;
  padding: 10px;
  cursor: pointer;
}
.header__toggle span {
  display: block;
  width: 24px;
  height: 2px;
  margin: 5px 0;
  background: var(--text);
}

@media (max-width: 760px) {
  .header__toggle {
    display: block;
  }
  .header__nav {
    display: none;
    position: absolute;
    top: 72px;
    left: 0;
    right: 0;
    flex-direction: column;
    gap: 0;
    background: var(--bg);
    border-bottom: 1px solid var(--line);
  }
  .header__nav--open {
    display: flex;
  }
  .header__nav a {
    padding: 1rem 24px;
    border-top: 1px solid var(--line);
  }
  .header__nav .header__lang {
    align-self: flex-start;
    margin: 1rem 24px;
    padding: 0.3rem 0.9rem;
    border-top-color: var(--gold);
  }
}
</style>
