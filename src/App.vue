<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useDevice } from '@/composables/useDevice';
import { mobileTabs } from '@/data/mobileTabs';

import AppNavbar from '@/components/layout/AppNavbar.vue';
import AppFooter from '@/components/layout/AppFooter.vue';

const { isMobile } = useDevice();
const route = useRoute();

const tabIndex = computed(() => {
    const i = mobileTabs.findIndex((t) => t.name === route.name);
    return i === -1 ? 0 : i;
});

// 탭 인덱스 변화 방향에 따라 슬라이드 좌/우 결정
let prevIndex = tabIndex.value;
const transitionName = computed(() => {
    if (!isMobile.value) return 'fade';
    const next = tabIndex.value;
    const dir = next > prevIndex ? 'tab-slide-left' : next < prevIndex ? 'tab-slide-right' : 'fade';
    prevIndex = next;
    return dir;
});
</script>

<template>
    <AppNavbar />

    <RouterView v-slot="{ Component }">
        <transition :name="transitionName" mode="out-in">
            <component :is="Component" :key="route.name" />
        </transition>
    </RouterView>

    <AppFooter v-if="!isMobile" />
</template>

<style lang="scss">
// === Tab transitions (모바일 바텀탭 전환) ===
.tab-slide-left-enter-active,
.tab-slide-left-leave-active,
.tab-slide-right-enter-active,
.tab-slide-right-leave-active {
    transition: opacity 0.28s cubic-bezier(0.22, 1, 0.36, 1),
                transform 0.32s cubic-bezier(0.22, 1, 0.36, 1);
}

.tab-slide-left-enter-from { opacity: 0; transform: translateX(28px); }
.tab-slide-left-leave-to   { opacity: 0; transform: translateX(-28px); }
.tab-slide-right-enter-from { opacity: 0; transform: translateX(-28px); }
.tab-slide-right-leave-to   { opacity: 0; transform: translateX(28px); }

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
