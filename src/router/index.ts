import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from "@/views/DashboardView.vue";
import ExportView from "@/views/ExportView.vue";
import ImportView from '@/views/ImportView.vue';
import SettingsView from '@/views/SettingsView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/export',
      name: 'export',
      component: ExportView
    },
    {
      path: '/import',
      name: 'import',
      component: ImportView
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView
    },
  ]
})

export default router
