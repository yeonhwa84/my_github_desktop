<script setup>
defineProps({
    eyebrow: { type: String, default: '' },
    align:   { type: String, default: 'left' }, // left | center
});
</script>

<template>
    <header class="section-head" :class="`is-${align}`" data-reveal>
        <span v-if="eyebrow" class="eyebrow">/ {{ eyebrow }}</span>
        <h2 class="section-title display">
            <slot name="title" />
        </h2>
        <p v-if="$slots.lead" class="section-lead">
            <slot name="lead" />
        </p>
    </header>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.section-head {
    margin-bottom: 64px;
    max-width: 720px;

    &.is-center {
        margin-left: auto;
        margin-right: auto;
        text-align: center;
    }
}

.section-title {
    font-size: clamp(36px, 5.5vw, 64px);
    color: $ink;
    margin-top: 12px;
}

.section-lead {
    margin-top: 18px;
    font-size: clamp(15px, 1.4vw, 17px);
    color: $ink-3;
    line-height: 1.7;
    max-width: 640px;

    .is-center & {
        margin-left: auto;
        margin-right: auto;
    }
}

:deep(.accent) {
    color: $coral;
    font-style: italic;
}
</style>
