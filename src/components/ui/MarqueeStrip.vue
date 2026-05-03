<script setup>
defineProps({
    items:    { type: Array, required: true },
    speed:    { type: Number, default: 50 },     // seconds for one full loop
    reverse:  { type: Boolean, default: false },
    variant:  { type: String, default: 'default' }, // default | dark | bordered
    separator: { type: String, default: '✦' },
});
</script>

<template>
    <div class="marquee" :class="[`is-${variant}`, { 'is-reverse': reverse }]">
        <div class="marquee-track" :style="{ animationDuration: `${speed}s` }">
            <!-- duplicate twice for seamless loop -->
            <ul v-for="copy in 2" :key="copy" class="marquee-list" aria-hidden="copy === 2">
                <li v-for="(item, i) in items" :key="`${copy}-${i}`" class="marquee-item">
                    <span>{{ item }}</span>
                    <span class="sep">{{ separator }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.marquee {
    overflow: hidden;
    width: 100%;
    padding: 14px 0;

    &.is-bordered {
        border-top: 1px solid $border;
        border-bottom: 1px solid $border;
        background: $surface;
    }

    &.is-dark {
        background: $ink;
        color: $surface;
    }
}

.marquee-track {
    display: flex;
    width: max-content;
    animation: scroll linear infinite;

    .is-reverse & {
        animation-direction: reverse;
    }

    &:hover {
        animation-play-state: paused;
    }
}

.marquee-list {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
}

.marquee-item {
    display: inline-flex;
    align-items: center;
    gap: 18px;
    padding-right: 18px;
    font-family: $font-display;
    font-weight: 700;
    font-size: clamp(20px, 3vw, 36px);
    letter-spacing: -0.02em;
    white-space: nowrap;

    .is-dark & {
        color: $surface;
    }
}

.sep {
    font-family: $font-serif;
    font-style: italic;
    color: $coral;
    font-size: 0.7em;
    opacity: 0.85;
}

@keyframes scroll {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
}
</style>
