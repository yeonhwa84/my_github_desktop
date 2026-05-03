/**
 * Smoothly scroll to an element by id, accounting for fixed header height.
 */
export function useSmoothScroll(headerOffset = 72) {
    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.scrollTo({ top, behavior: 'smooth' });
    };
    return { scrollTo };
}
