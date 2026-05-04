import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';

const baseTitle = 'Yeonhwa Lee · Senior Full-Stack Developer';

const tabs = [
    { path: '/',         name: 'home',    tab: 'home',    title: baseTitle },
    { path: '/about',    name: 'about',   tab: 'about',   title: `About · ${baseTitle}` },
    { path: '/skills',   name: 'skills',  tab: 'skills',  title: `Skills · ${baseTitle}` },
    { path: '/work',     name: 'work',    tab: 'work',    title: `Work · ${baseTitle}` },
    { path: '/contact',  name: 'contact', tab: 'contact', title: `Contact · ${baseTitle}` },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: tabs.map(({ path, name, tab, title }) => ({
        path,
        name,
        component: HomeView,
        meta: { tab, title },
    })),
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) return savedPosition;
        if (to.hash) return { el: to.hash, behavior: 'smooth', top: 72 };
        return { top: 0 };
    },
});

router.afterEach((to) => {
    if (to.meta?.title) document.title = to.meta.title;
});

export default router;
