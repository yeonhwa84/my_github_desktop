<script setup>
defineProps({
    project: { type: Object, required: true },
});
</script>

<template>
    <article class="project-card" :class="`is-${project.accent}`" data-reveal>
        <div class="project-head">
            <span class="project-num display">{{ project.num }}</span>
            <span class="project-period mono">{{ project.period }}</span>
        </div>

        <span class="project-sector">{{ project.sector }}</span>

        <h3 class="project-title display">{{ project.title }}</h3>

        <p class="project-desc">{{ project.description }}</p>

        <div class="project-stack">
            <span v-for="s in project.stack" :key="s" class="stack-chip mono">{{ s }}</span>
        </div>
    </article>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.project-card {
    padding: 40px 36px;
    background: $surface;
    border-radius: $radius-lg;
    border: 1px solid $border-soft;
    position: relative;
    overflow: hidden;
    transition: all 0.4s $ease;
    display: flex;
    flex-direction: column;
    gap: 14px;

    &::after {
        content: '';
        position: absolute;
        bottom: -60px;
        right: -60px;
        width: 240px;
        height: 240px;
        border-radius: 50%;
        opacity: 0;
        filter: blur(60px);
        transition: opacity 0.5s $ease;
        pointer-events: none;
    }

    &:hover {
        transform: translateY(-6px);
        box-shadow: $shadow-lg;
        border-color: $border;

        &::after { opacity: 0.55; }

        .project-num { color: $coral; }
    }
}

.is-coral::after  { background: $coral-soft; }
.is-sage::after   { background: $sage-soft; }
.is-butter::after { background: $butter; }
.is-rose::after   { background: $rose-soft; }

.project-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 12px;
}

.project-num {
    font-size: 56px;
    line-height: 1;
    color: $ink-5;
    transition: color 0.3s $ease;
    font-weight: 800;
    font-style: italic;
}

.project-period {
    font-size: 12px;
    color: $ink-4;
    letter-spacing: 0.04em;
}

.project-sector {
    font-family: $font-mono;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: $coral;
    font-weight: 600;
}

.project-title {
    font-size: clamp(22px, 2.4vw, 28px);
    color: $ink;
    line-height: 1.25;
    letter-spacing: -0.025em;
    position: relative;
    z-index: 1;
}

.project-desc {
    color: $ink-3;
    font-size: 15px;
    line-height: 1.7;
    position: relative;
    z-index: 1;
}

.project-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 8px;
    position: relative;
    z-index: 1;
}

.stack-chip {
    padding: 4px 10px;
    background: $bg-warm;
    color: $ink-2;
    border-radius: $radius-xs;
    font-size: 11px;
    font-weight: 500;
}
</style>
