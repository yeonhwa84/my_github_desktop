<script setup>
defineProps({
    href:    { type: String, default: null },
    variant: { type: String, default: 'primary' }, // primary | ghost | dark
    size:    { type: String, default: 'md' },      // sm | md | lg
});
</script>

<template>
    <component
        :is="href ? 'a' : 'button'"
        :href="href || undefined"
        class="btn"
        :class="[`btn-${variant}`, `btn-${size}`]"
    >
        <slot />
    </component>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    border-radius: 999px;
    font-weight: 600;
    transition: all 0.25s $ease;
    cursor: pointer;
    white-space: nowrap;

    :deep(i) {
        transition: transform 0.25s $ease;
    }

    &:hover :deep(i) {
        transform: translateX(4px);
    }
}

.btn-sm { padding: 10px 18px; font-size: 13px; }
.btn-md { padding: 14px 26px; font-size: 15px; }
.btn-lg { padding: 16px 32px; font-size: 16px; }

.btn-primary {
    background: $coral;
    color: $surface;
    box-shadow: $shadow-coral;

    &:hover {
        background: $coral-deep;
        transform: translateY(-2px);
        box-shadow: 0 14px 36px rgba(255, 88, 65, 0.35);
    }
}

.btn-ghost {
    background: transparent;
    color: $ink;
    border: 1.5px solid $ink;

    &:hover {
        background: $ink;
        color: $surface;
        transform: translateY(-2px);
    }
}

.btn-dark {
    background: $ink;
    color: $surface;

    &:hover {
        background: $coral;
        transform: translateY(-2px);
        box-shadow: $shadow-coral;
    }
}
</style>
