import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

const BP_MOBILE = 768;
const BP_TABLET = 980;

export function useDevice() {
    const width = ref(typeof window === 'undefined' ? 1280 : window.innerWidth);

    const onResize = () => {
        width.value = window.innerWidth;
    };

    onMounted(() => {
        width.value = window.innerWidth;
        window.addEventListener('resize', onResize, { passive: true });
    });

    onBeforeUnmount(() => {
        window.removeEventListener('resize', onResize);
    });

    const isMobile = computed(() => width.value <= BP_MOBILE);
    const isTablet = computed(() => width.value > BP_MOBILE && width.value <= BP_TABLET);
    const isDesktop = computed(() => width.value > BP_TABLET);

    return { width, isMobile, isTablet, isDesktop };
}
