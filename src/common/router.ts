import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

const applicationPostfix = 'Расписание УКСИВТ';
const routes: Array<RouteRecordRaw> = [
  {
    name: 'home',
    path: '/',
    component: () => import('@/views/home/HomeView.vue'),
    meta: {
      title: 'Заглавная',
    },
  },
  {
    name: 'about',
    path: '/about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/home/InformationView.vue'),
    meta: {
      title: 'Информация',
    },
  },
  {
    name: 'settings',
    path: '/settings',
    component: () => import('@/views/home/SettingsView.vue'),
    meta: {
      title: 'Настройки',
    },
  },
  {
    name: 'result',
    path: '/result',
    component: () => import('@/views/ResultView.vue'),
    meta: {
      title: 'Результат',
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} — ${applicationPostfix}`;
  next();
});

export default router;
