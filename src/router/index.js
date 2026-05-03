import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            meta: { title: 'Yeonhwa Lee · Senior Full-Stack Developer' },
        },
    ],
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
