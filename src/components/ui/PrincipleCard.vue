<script setup>
defineProps({
    icon:  { type: String, required: true },
    title: { type: String, required: true },
    desc:  { type: String, required: true },
    index: { type: Number, default: 0 },
});
</script>

<template>
    <article class="principle-card" data-reveal>
        <div class="principle-icon" :class="`accent-${index % 4}`">
            <i :class="['fas', icon]" />
        </div>
        <h3 class="principle-title display">{{ title }}</h3>
        <p class="principle-desc">{{ desc }}</p>
    </article>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.principle-card {
    padding: 32px 28px;
    background: $surface;
    border-radius: $radius-lg;
    border: 1px solid $border-soft;
    transition: all 0.35s $ease;

    &:hover {
        transform: translateY(-4px);
        box-shadow: $shadow-md;
        border-color: $border;
    }
}

.principle-icon {
    width: 52px;
    height: 52px;
    border-radius: 14px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    margin-bottom: 20px;

    &.accent-0 { background: $coral-bg;  color: $coral; }
    &.accent-1 { background: $sage-bg;   color: $sage; }
    &.accent-2 { background: $butter-bg; color: $butter-deep; }
    &.accent-3 { background: $lilac-bg;  color: $lilac; }
}

.principle-title {
    font-size: 22px;
    color: $ink;
    margin-bottom: 10px;
    line-height: 1.25;
    letter-spacing: -0.02em;
}

.principle-desc {
    font-size: 14.5px;
    color: $ink-3;
    line-height: 1.65;
}
</style>
