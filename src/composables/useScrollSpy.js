import { ref, onMounted, onBeforeUnmount } from 'vue';

/**
 * Tracks which section is currently in view based on scroll position.
 * Returns a reactive ref that holds the active section id (without '#').
 */
export function useScrollSpy(sectionIds, offset = 120) {
    const activeId = ref(sectionIds[0] || '');

    let rafId = null;

    const update = () => {
        const y = window.scrollY + offset;
        let current = sectionIds[0];

        for (const id of sectionIds) {
            const el = document.getElementById(id);
            if (!el) continue;
            const top = el.offsetTop;
            if (y >= top) current = id;
        }
        activeId.value = current;
    };

    const onScroll = () => {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(update);
    };

    onMounted(() => {
        window.addEventListener('scroll', onScroll, { passive: true });
        update();
    });

    onBeforeUnmount(() => {
        window.removeEventListener('scroll', onScroll);
        if (rafId) cancelAnimationFrame(rafId);
    });

    return { activeId };
}
