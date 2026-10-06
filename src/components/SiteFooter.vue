<script setup>
const YEAR = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container footer__inner">
      <a href="#top" class="footer__logo">Salon <em>Nonchalant</em></a>
      <nav class="footer__links">
        <a href="#impressum">Impressum</a>
        <a href="#datenschutz">Datenschutz</a>
      </nav>
      <p class="footer__copy">© {{ YEAR }} Salon Nonchalant</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--line);
  padding: 2.5rem 0;
}
.footer__inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem 2rem;
}
.footer__logo {
  font-family: var(--font-display);
  font-size: 1.3rem;
  color: var(--text);
  text-decoration: none;
}
.footer__logo em {
  color: var(--gold);
}
.footer__links {
  display: flex;
  gap: 1.5rem;
}
.footer__links a {
  color: var(--muted);
}
.footer__copy {
  margin: 0;
  color: var(--muted);
  font-size: 0.9rem;
}
</style>
