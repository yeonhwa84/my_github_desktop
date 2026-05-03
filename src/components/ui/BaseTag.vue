<script setup>
defineProps({
    variant: { type: String, default: 'default' }, // default | strong | mono | accent
});
</script>

<template>
    <span class="tag" :class="`tag-${variant}`">
        <slot />
    </span>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.tag {
    display: inline-flex;
    align-items: center;
    padding: 6px 14px;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 500;
    transition: all 0.2s $ease;
    border: 1px solid transparent;
}

.tag-default {
    background: $bg-warm;
    color: $ink-2;

    &:hover {
        background: $surface;
        border-color: $border;
    }
}

.tag-strong {
    background: $ink;
    color: $surface;

    &:hover {
        background: $coral;
    }
}

.tag-mono {
    font-family: $font-mono;
    font-size: 12px;
    background: $surface;
    color: $ink-2;
    border-color: $border-soft;
    box-shadow: $shadow-xs;
}

.tag-accent {
    background: $coral-bg;
    color: $coral-deep;
    font-weight: 600;
}
</style>
