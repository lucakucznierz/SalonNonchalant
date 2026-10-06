<script setup>
import { ref, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { loadContent } from './services/content'
import SiteHeader from './components/SiteHeader.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import ConcertsSection from './components/ConcertsSection.vue'
import GallerySection from './components/GallerySection.vue'
import ContactSection from './components/ContactSection.vue'
import SiteFooter from './components/SiteFooter.vue'
import LegalPage from './components/LegalPage.vue'

const LEGAL_PAGES = ['impressum', 'datenschutz']
const legalPage = ref(null)

// Impressum and Datenschutz are shown as separate views via "#impressum" / "#datenschutz".
async function updateViewFromHash()
{
  const hash = window.location.hash.replace('#', '')
  const isLegal = LEGAL_PAGES.includes(hash)
  const wasLegal = !!legalPage.value
  legalPage.value = isLegal ? hash : null
  if(isLegal)
  {
    window.scrollTo(0, 0)
  }
  else if(wasLegal)
  {
    // Coming back from a legal page: the sections only exist after re-rendering, so scroll to the target afterwards.
    await nextTick()
    const target = hash ? document.getElementById(hash) : null
    if(target)
      target.scrollIntoView()
    else
      window.scrollTo(0, 0)
  }
}

onMounted(() =>
{
  loadContent()
  updateViewFromHash()
  window.addEventListener('hashchange', updateViewFromHash)
})

onBeforeUnmount(() => window.removeEventListener('hashchange', updateViewFromHash))
</script>

<template>
  <SiteHeader :solid="!!legalPage" />
  <main v-if="legalPage">
    <LegalPage :page="legalPage" />
  </main>
  <main v-else>
    <HeroSection />
    <AboutSection />
    <ConcertsSection />
    <GallerySection />
    <ContactSection />
  </main>
  <SiteFooter />
</template>
