<script setup>
defineProps({
    label:  { type: String, required: true },
    value:  { type: [Number, String], required: true },
    suffix: { type: String, default: '' },
    desc:   { type: String, default: '' },
    accent: { type: String, default: 'coral' }, // coral | sage | butter
});
</script>

<template>
    <article class="stat-card" :class="`is-${accent}`" data-reveal>
        <span class="stat-label mono">{{ label }}</span>
        <strong class="stat-value display">
            {{ value }}<sup v-if="suffix">{{ suffix }}</sup>
        </strong>
        <span v-if="desc" class="stat-desc">{{ desc }}</span>
    </article>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.stat-card {
    padding: 32px 28px;
    border-radius: $radius-lg;
    background: $surface;
    border: 1px solid $border-soft;
    display: flex;
    flex-direction: column;
    gap: 6px;
    transition: all 0.4s $ease;
    position: relative;
    overflow: hidden;

    &::after {
        content: '';
        position: absolute;
        bottom: -40%;
        right: -20%;
        width: 200px;
        height: 200px;
        border-radius: 50%;
        opacity: 0.5;
        filter: blur(40px);
        transition: opacity 0.4s $ease;
    }

    &:hover {
        transform: translateY(-4px);
        box-shadow: $shadow-md;

        &::after { opacity: 0.85; }
    }
}

.is-coral {
    background: linear-gradient(135deg, $coral-bg 0%, $surface 100%);
    &::after { background: $coral-soft; }
}
.is-sage {
    background: linear-gradient(135deg, $sage-bg 0%, $surface 100%);
    &::after { background: $sage-soft; }
}
.is-butter {
    background: linear-gradient(135deg, $butter-bg 0%, $surface 100%);
    &::after { background: $butter; }
}

.stat-label {
    font-size: 12px;
    color: $ink-3;
    letter-spacing: 0.06em;
    text-transform: uppercase;
}

.stat-value {
    font-size: clamp(56px, 7vw, 84px);
    line-height: 1;
    color: $ink;
    margin-top: 14px;
    position: relative;
    z-index: 1;

    sup {
        font-size: 0.35em;
        color: $coral;
        font-weight: 700;
        margin-left: 2px;
        vertical-align: super;
    }
}

.stat-desc {
    font-size: 13px;
    color: $ink-3;
    margin-top: 6px;
    position: relative;
    z-index: 1;
}
</style>
