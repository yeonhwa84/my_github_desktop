import { onMounted, onBeforeUnmount } from 'vue';

/**
 * Adds 'is-visible' class to elements with a `data-reveal` attribute
 * once they enter the viewport. Idempotent — runs only on mount.
 */
export function useReveal(selector = '[data-reveal]', options = {}) {
    let observer = null;

    onMounted(() => {
        const targets = document.querySelectorAll(selector);
        if (!targets.length) return;

        if (!('IntersectionObserver' in window)) {
            targets.forEach((el) => el.classList.add('is-visible'));
            return;
        }

        observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: options.threshold ?? 0.12,
                rootMargin: options.rootMargin ?? '0px 0px -40px 0px',
            }
        );

        targets.forEach((el) => observer.observe(el));
    });

    onBeforeUnmount(() => {
        observer?.disconnect();
    });
}
