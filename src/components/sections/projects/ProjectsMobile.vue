<script setup>
import { projects } from '@/data/projects';

const accentMap = {
    coral:  'is-aqua',
    sage:   'is-lime',
    butter: 'is-sun',
    rose:   'is-coral',
};
</script>

<template>
    <section id="projects" class="m-projects">
        <header class="head">
            <span class="eyebrow">/ Selected Work</span>
            <h2 class="title">
                Featured<br />
                <span class="title-pop">Projects.</span>
            </h2>
            <p class="lead">
                그린필드 신규 구축과 레거시 전환, 양쪽 결의 대표 프로젝트 4건.
            </p>
        </header>

        <div class="cards">
            <article
                v-for="p in projects"
                :key="p.num"
                class="card"
                :class="accentMap[p.accent]"
            >
                <header class="c-head">
                    <span class="c-num">{{ p.num }}</span>
                    <span class="c-sector">{{ p.sector }}</span>
                </header>

                <h3 class="c-title">{{ p.title }}</h3>
                <span class="c-period">{{ p.period }}</span>
                <p class="c-desc">{{ p.description }}</p>

                <div class="c-stack">
                    <span v-for="s in p.stack" :key="s" class="chip">{{ s }}</span>
                </div>

                <span class="c-deco" />
            </article>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/mobile' as *;

.m-projects {
    @include mc-section($mc-bg-soft);
    font-family: $mc-font-sans;
}

.eyebrow { @include mc-eyebrow; }

.head {
    margin-bottom: 28px;

    .title {
        margin-top: 12px;
        font-family: $mc-font-display;
        font-size: 34px;
        line-height: 1.05;
        letter-spacing: -0.03em;
        color: $mc-ink;
        font-weight: 800;
    }

    .title-pop {
        font-style: italic;
        color: $mc-aqua-deep;
        font-weight: 600;
    }

    .lead {
        margin-top: 14px;
        font-size: 14px;
        line-height: 1.7;
        color: $mc-ink-3;
    }
}

.cards {
    display: flex;
    flex-direction: column;
    gap: 14px;
}

.card {
    background: $mc-surface;
    border-radius: $mc-radius-lg;
    padding: 24px 22px;
    box-shadow: $mc-shadow-sm;
    border: 1px solid $mc-border-soft;
    position: relative;
    overflow: hidden;
    transition: transform 0.2s $mc-ease, box-shadow 0.2s $mc-ease;

    &:active {
        transform: scale(0.99);
    }

    .c-deco {
        position: absolute;
        top: -40px;
        right: -40px;
        width: 120px;
        height: 120px;
        border-radius: 50%;
        opacity: 0.18;
        z-index: 0;
    }

    &.is-aqua  { .c-deco { background: $mc-aqua; }  .c-num, .c-sector { color: $mc-aqua-deep; }  border-top: 4px solid $mc-aqua; }
    &.is-sun   { .c-deco { background: $mc-sun; }   .c-num, .c-sector { color: $mc-sun-deep; }   border-top: 4px solid $mc-sun; }
    &.is-lime  { .c-deco { background: $mc-lime; }  .c-num, .c-sector { color: $mc-lime-deep; }  border-top: 4px solid $mc-lime; }
    &.is-coral { .c-deco { background: $mc-coral; } .c-num, .c-sector { color: $mc-coral-deep; } border-top: 4px solid $mc-coral; }
}

.c-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 10px;
    position: relative;
    z-index: 1;
}

.c-num {
    font-family: $mc-font-display;
    font-size: 38px;
    line-height: 1;
    font-weight: 800;
    font-style: italic;
    letter-spacing: -0.05em;
}

.c-sector {
    font-family: $mc-font-mono;
    font-size: 10.5px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
}

.c-title {
    font-family: $mc-font-display;
    font-size: 19px;
    color: $mc-ink;
    line-height: 1.25;
    letter-spacing: -0.025em;
    font-weight: 700;
    margin-bottom: 4px;
    position: relative;
    z-index: 1;
}

.c-period {
    display: block;
    font-family: $mc-font-mono;
    font-size: 11px;
    color: $mc-ink-4;
    letter-spacing: 0.08em;
    margin-bottom: 12px;
    font-weight: 600;
    position: relative;
    z-index: 1;
}

.c-desc {
    font-size: 13px;
    color: $mc-ink-3;
    line-height: 1.65;
    margin-bottom: 14px;
    position: relative;
    z-index: 1;
}

.c-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    position: relative;
    z-index: 1;
}

.chip {
    padding: 4px 10px;
    background: $mc-bg-tint;
    color: $mc-aqua-deep;
    border-radius: $mc-radius-pill;
    font-family: $mc-font-mono;
    font-size: 10.5px;
    font-weight: 700;
}
</style>
