<script setup>
import { RouterView } from 'vue-router';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue'
import '@fontsource-variable/jost';
import '@fortawesome/fontawesome-free/css/all.css'
import VistaAdmin from './components/sesiones/VistaAdmin.vue';

</script>

<template>
  <header>
    <Header />
  </header>

  <body>
    <VistaAdmin></VistaAdmin>
    <RouterView />
  </body>
  <footer>
    <Footer />
  </footer>

</template>

<style>
@import url('./assets/styles/tablasEventos.css');
@import url('./assets/styles/botones.css');
@import url('./assets/styles/styles.css');

* {
  box-sizing: border-box;
  font-family: 'Jost Variable', sans-serif;
}

body {
  min-height: 80dvh;
  background-color: var(--color-background);
  scrollbar-color: var(--color-secundario) rgba(0, 0, 0, 0);
  scrollbar-width: none;
}

h1, h2, h3, h4 {
  text-wrap: balance;
}

p {
  text-wrap: pretty;
}

header, footer, body {
  min-width: 400px;
}
</style>
