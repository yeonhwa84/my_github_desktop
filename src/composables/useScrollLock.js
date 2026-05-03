import { watch } from 'vue';

/**
 * Locks/unlocks body scroll based on a boolean ref (e.g. mobile menu open).
 */
export function useScrollLock(activeRef) {
    watch(activeRef, (active) => {
        if (typeof document === 'undefined') return;
        document.body.style.overflow = active ? 'hidden' : '';
    });
}
