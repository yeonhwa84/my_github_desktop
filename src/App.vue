<script setup>
// 모찌 AI 터미널 단일 화면(옵션 3). 네비/푸터/플로팅 마스코트는
// 터미널이 자체적으로 모든 안내를 담당하므로 제거.
</script>

<template>
    <RouterView v-slot="{ Component }">
        <transition name="fade" mode="out-in">
            <component :is="Component" />
        </transition>
    </RouterView>
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
