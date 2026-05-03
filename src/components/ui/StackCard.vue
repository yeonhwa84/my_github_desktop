<script setup>
import BaseTag from './BaseTag.vue';

defineProps({
    skill: { type: Object, required: true },
});
</script>

<template>
    <article class="stack-card" :class="`is-${skill.accent}`" data-reveal>
        <header class="stack-head">
            <div class="stack-icon">
                <i :class="['fas', skill.icon]" />
            </div>
            <div class="stack-meta-block">
                <h3 class="stack-title display">{{ skill.title }}</h3>
                <span class="stack-meta mono">{{ skill.meta }}</span>
            </div>
        </header>

        <div class="stack-tags">
            <BaseTag v-for="t in skill.primary" :key="t" variant="strong">{{ t }}</BaseTag>
            <BaseTag v-for="t in skill.secondary" :key="t" variant="default">{{ t }}</BaseTag>
        </div>
    </article>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.stack-card {
    padding: 36px 32px;
    background: $surface;
    border-radius: $radius-lg;
    border: 1px solid $border-soft;
    transition: all 0.35s $ease;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 4px;
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 0.45s $ease;
    }

    &:hover {
        transform: translateY(-4px);
        box-shadow: $shadow-md;

        &::before { transform: scaleX(1); }
    }
}

.is-coral  .stack-icon { background: $coral-bg;  color: $coral; }
.is-sage   .stack-icon { background: $sage-bg;   color: $sage; }
.is-butter .stack-icon { background: $butter-bg; color: $butter-deep; }
.is-rose   .stack-icon { background: $rose-bg;   color: $rose; }
.is-lilac  .stack-icon { background: $lilac-bg;  color: $lilac; }
.is-mint   .stack-icon { background: $mint-bg;   color: $mint; }

.is-coral::before  { background: $coral; }
.is-sage::before   { background: $sage; }
.is-butter::before { background: $butter-deep; }
.is-rose::before   { background: $rose; }
.is-lilac::before  { background: $lilac; }
.is-mint::before   { background: $mint; }

.stack-head {
    display: flex;
    align-items: center;
    gap: 18px;
    margin-bottom: 28px;
}

.stack-icon {
    width: 56px;
    height: 56px;
    border-radius: 14px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    flex-shrink: 0;
}

.stack-title {
    font-size: 24px;
    color: $ink;
    line-height: 1.2;
    letter-spacing: -0.02em;
}

.stack-meta {
    font-size: 12px;
    color: $ink-4;
    letter-spacing: 0.04em;
    margin-top: 4px;
    display: block;
}

.stack-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}
</style>
