import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import EventoIndividualView from '@/views/EventoIndividualView.vue'
import EventoNuevoView from '@/views/EventoNuevoView.vue'
import EditarEvento from '@/views/EditarEvento.vue'
import AdminView from '@/views/AdminView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // Cambiado a createWebHistory
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/eventos',
      name: 'eventos',
      component: () => import('@/views/EventosView.vue')
    },
    {
      path: '/evento/:id',
      name: 'evento-individual',
      component: EventoIndividualView
    },
    {
      path: '/crearevento',
      name: 'crear-evento',
      component: EventoNuevoView
    },
    {
      path: '/editevento/:id',
      name: 'editar-evento',
      component: EditarEvento
    },
    {
      path: '/equipo',
      name: 'equipo',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  }
});

export default router
