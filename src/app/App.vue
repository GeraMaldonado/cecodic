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
* {
  box-sizing: border-box;
  font-family: 'Jost Variable', sans-serif;
}

body {
  min-height: 80dvh;
  background-color: #F6F6F6;
  scrollbar-color: rgb(248, 179, 179) rgba(0, 0, 0, 0);
  scrollbar-width: none;
}

h1,
h2,
h3,
h4 {
  text-wrap: balance;
}

p {
  text-wrap: pretty;
}

header,
footer,
body {
  min-width: 400px;
}
</style>
