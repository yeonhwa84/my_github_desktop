<script setup>
import { ref, computed } from 'vue';
import { skillCategories } from '@/data/skills';

const activeId = ref(skillCategories[0].id);
const active = computed(() => skillCategories.find((c) => c.id === activeId.value));

const accentMap = {
    coral:  'is-aqua',
    sage:   'is-lime',
    butter: 'is-sun',
    lilac:  'is-aqua',
    rose:   'is-coral',
    mint:   'is-lime',
};
</script>

<template>
    <section id="skills" class="m-skills">
        <header class="head">
            <span class="eyebrow">/ Skills</span>
            <h2 class="title">
                What I bring<br />
                <span class="title-pop">to the table.</span>
            </h2>
            <p class="lead">
                17년치 도구함. 깊이는 연차로, 폭은 도메인으로 — 모든 항목은 실제 프로젝트에서 검증된 것만 적었습니다.
            </p>
        </header>

        <!-- Tab pills -->
        <div class="tabs">
            <button
                v-for="cat in skillCategories"
                :key="cat.id"
                type="button"
                class="tab"
                :class="[accentMap[cat.accent], { 'is-active': activeId === cat.id }]"
                @click="activeId = cat.id"
            >
                <span class="t-num">{{ cat.kicker }}</span>
                <span class="t-label">{{ cat.title }}</span>
            </button>
        </div>

        <!-- Active category card -->
        <article class="cat-card" :class="accentMap[active.accent]">
            <header class="c-head">
                <span class="c-icon">
                    <i :class="['fas', active.icon]" />
                </span>
                <div class="c-text">
                    <h3 class="c-title">{{ active.title }}</h3>
                    <span class="c-meta">{{ active.meta }}</span>
                </div>
            </header>
            <p class="c-summary">{{ active.summary }}</p>

            <ul class="rows">
                <li v-for="s in active.skills" :key="s.name" class="row">
                    <div class="row-top">
                        <span class="row-name">
                            {{ s.name }}
                            <span v-if="s.current" class="row-now">NOW</span>
                        </span>
                        <span class="row-years">{{ s.years }}y</span>
                    </div>
                    <div class="row-bar">
                        <span class="bar-track" />
                        <span class="bar-fill" :style="{ width: `${(s.level / 5) * 100}%` }" />
                    </div>
                    <p class="row-context">{{ s.context }}</p>
                </li>
            </ul>
        </article>

        <p class="legend">
            <strong>● ● ● ● ●</strong> Mastery &nbsp;·&nbsp;
            <strong>● ● ● ● ○</strong> Strong &nbsp;·&nbsp;
            <strong>● ● ● ○ ○</strong> Working
        </p>
    </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/mobile' as *;

.m-skills {
    @include mc-section($mc-bg);
    font-family: $mc-font-sans;
}

.eyebrow { @include mc-eyebrow; }

.head {
    margin-bottom: 24px;

    .title {
        margin-top: 12px;
        font-family: $mc-font-display;
        font-size: 32px;
        line-height: 1.1;
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

// === Tabs ===
.tabs {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    margin-bottom: 16px;
}

.tab {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    padding: 12px 14px;
    background: $mc-surface;
    border: 1.5px solid $mc-border-soft;
    border-radius: $mc-radius-md;
    text-align: left;
    cursor: pointer;
    transition: all 0.2s $mc-ease;
    -webkit-tap-highlight-color: transparent;

    .t-num {
        font-family: $mc-font-display;
        font-size: 14px;
        font-weight: 700;
        color: $mc-ink-4;
        font-style: italic;
        letter-spacing: -0.02em;
    }

    .t-label {
        font-size: 12.5px;
        font-weight: 700;
        color: $mc-ink;
        line-height: 1.2;
    }

    &.is-aqua.is-active  { background: $mc-aqua;  border-color: $mc-aqua;  .t-num, .t-label { color: $mc-surface; } }
    &.is-sun.is-active   { background: $mc-sun;   border-color: $mc-sun;   .t-num, .t-label { color: $mc-ink; } }
    &.is-lime.is-active  { background: $mc-lime;  border-color: $mc-lime;  .t-num, .t-label { color: $mc-surface; } }
    &.is-coral.is-active { background: $mc-coral; border-color: $mc-coral; .t-num, .t-label { color: $mc-surface; } }
}

// === Active category card ===
.cat-card {
    background: $mc-surface;
    border-radius: $mc-radius-lg;
    padding: 22px 20px;
    box-shadow: $mc-shadow-md;
    border-top: 4px solid $mc-aqua;
    margin-bottom: 16px;

    &.is-aqua  { border-top-color: $mc-aqua; }
    &.is-sun   { border-top-color: $mc-sun; }
    &.is-lime  { border-top-color: $mc-lime; }
    &.is-coral { border-top-color: $mc-coral; }
}

.c-head {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 8px;
}

.c-icon {
    width: 42px;
    height: 42px;
    border-radius: 12px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;

    .is-aqua  & { background: $mc-aqua-bg;  color: $mc-aqua-deep; }
    .is-sun   & { background: $mc-sun-bg;   color: $mc-sun-deep; }
    .is-lime  & { background: $mc-lime-bg;  color: $mc-lime-deep; }
    .is-coral & { background: $mc-coral-bg; color: $mc-coral-deep; }
}

.c-text { flex: 1; }

.c-title {
    font-family: $mc-font-display;
    font-size: 19px;
    color: $mc-ink;
    line-height: 1.2;
    letter-spacing: -0.025em;
    font-weight: 700;
}

.c-meta {
    display: block;
    margin-top: 2px;
    font-family: $mc-font-mono;
    font-size: 10.5px;
    color: $mc-ink-3;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-weight: 600;
}

.c-summary {
    font-size: 13px;
    color: $mc-ink-3;
    line-height: 1.65;
    margin-bottom: 18px;
}

// === Rows ===
.rows {
    display: flex;
    flex-direction: column;
    gap: 14px;
    list-style: none;
    padding: 0;
}

.row {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.row-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
}

.row-name {
    font-size: 13px;
    color: $mc-ink;
    font-weight: 700;
    line-height: 1.3;
    display: inline-flex;
    align-items: center;
    gap: 6px;
}

.row-now {
    font-family: $mc-font-mono;
    font-size: 9px;
    background: $mc-sun;
    color: $mc-ink;
    padding: 2px 6px;
    border-radius: 4px;
    font-weight: 800;
    letter-spacing: 0.08em;
}

.row-years {
    font-family: $mc-font-mono;
    font-size: 11px;
    color: $mc-aqua-deep;
    font-weight: 700;
    letter-spacing: 0.05em;
    flex-shrink: 0;
}

.row-bar {
    position: relative;
    height: 6px;
    border-radius: 3px;
    overflow: hidden;
}

.bar-track {
    position: absolute;
    inset: 0;
    background: $mc-bg-tint;
    border-radius: 3px;
}

.bar-fill {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    background: $mc-aqua;
    border-radius: 3px;
    transition: width 0.3s $mc-ease;

    .is-sun   & { background: $mc-sun-deep; }
    .is-lime  & { background: $mc-lime; }
    .is-coral & { background: $mc-coral; }
}

.row-context {
    font-size: 11.5px;
    color: $mc-ink-3;
    line-height: 1.5;
}

.legend {
    text-align: center;
    font-family: $mc-font-mono;
    font-size: 10px;
    color: $mc-ink-4;
    letter-spacing: 0.1em;

    strong { color: $mc-aqua; font-weight: 400; }
}
</style>
