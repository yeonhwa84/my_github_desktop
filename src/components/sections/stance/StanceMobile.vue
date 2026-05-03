<script setup>
import { profile } from '@/data/profile';

const stance = profile.stance;
const cardColors = ['is-aqua', 'is-sun', 'is-lime', 'is-coral'];
</script>

<template>
    <section id="stance" class="m-stance">
        <header class="head">
            <span class="eyebrow">/ {{ stance.eyebrow }}</span>
            <span class="tag">In the age of AI · 2026</span>
        </header>

        <h2 class="statement">
            <span v-for="(part, i) in stance.title" :key="i" class="line">
                <template v-if="typeof part === 'string'">{{ part }}</template>
                <span v-else class="line-italic">{{ part.italic }}</span>
            </span>
        </h2>

        <aside class="lead">
            <p v-html="stance.lead" />
            <span class="lead-sig">— Yeonhwa Lee · 17y of context</span>
        </aside>

        <div class="cards">
            <article v-for="(p, i) in stance.principles" :key="p.num" class="card" :class="cardColors[i]">
                <span class="c-num">{{ p.num }}</span>
                <h3 class="c-title">{{ p.title }}</h3>
                <p class="c-kicker">// {{ p.kicker }}</p>
                <p class="c-desc">{{ p.desc }}</p>
            </article>
        </div>

        <article class="learn">
            <header class="l-head">
                <div class="l-head-text">
                    <span class="eyebrow">/ Learning Log</span>
                    <h3 class="l-title">
                        Always in <span class="l-italic">beta.</span>
                    </h3>
                </div>
                <span class="l-status">
                    <span class="dot" /> studying
                </span>
            </header>
            <p class="l-sub">17년차여도 매일 새 것이 나옵니다. 가장 먼저 들여다보고, 안전하게 도구함에 넣는 게 시니어의 일.</p>

            <ul class="l-list">
                <li v-for="item in stance.learning" :key="item.tag">
                    <span class="ltag">{{ item.tag }}</span>
                    <span class="ldetail">{{ item.detail }}</span>
                </li>
            </ul>
        </article>
    </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/mobile' as *;

.m-stance {
    @include mc-section($mc-surface);
    font-family: $mc-font-sans;
}

.eyebrow { @include mc-eyebrow; }

.head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding-bottom: 18px;
    border-bottom: 2px dashed $mc-aqua-light;
    margin-bottom: 24px;
    flex-wrap: wrap;
    gap: 8px;

    .tag {
        font-family: $mc-font-mono;
        font-size: 10px;
        color: $mc-ink-4;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        font-weight: 600;
    }
}

.statement {
    font-family: $mc-font-display;
    font-size: 30px;
    line-height: 1.05;
    color: $mc-ink;
    letter-spacing: -0.03em;
    font-weight: 800;
    margin-bottom: 22px;

    .line { display: block; }

    .line-italic {
        font-style: italic;
        font-weight: 500;
        color: $mc-aqua-deep;
        text-transform: none;
        letter-spacing: -0.02em;
    }
}

.lead {
    background: $mc-aqua-bg;
    border-radius: $mc-radius-md;
    padding: 18px 16px;
    margin-bottom: 32px;
    position: relative;

    &::before {
        content: '';
        position: absolute;
        top: 14px;
        left: 0;
        bottom: 14px;
        width: 4px;
        background: $mc-aqua;
        border-radius: 0 4px 4px 0;
    }

    p {
        font-size: 13.5px;
        line-height: 1.7;
        color: $mc-ink-2;
        padding-left: 10px;

        :deep(strong) { color: $mc-aqua-deep; font-weight: 700; }
    }

    .lead-sig {
        display: block;
        margin-top: 12px;
        padding-left: 10px;
        font-family: $mc-font-mono;
        font-size: 10.5px;
        color: $mc-aqua-deep;
        letter-spacing: 0.1em;
        font-weight: 700;
    }
}

.cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-bottom: 36px;
}

.card {
    border-radius: $mc-radius-md;
    padding: 18px 16px;
    box-shadow: $mc-shadow-xs;
    display: flex;
    flex-direction: column;
    gap: 6px;

    &.is-aqua  { background: $mc-aqua-bg;  border: 1.5px solid $mc-aqua-light;  .c-num { color: $mc-aqua-deep; }  .c-kicker { color: $mc-aqua-deep; } }
    &.is-sun   { background: $mc-sun-bg;   border: 1.5px solid $mc-sun-light;   .c-num { color: $mc-sun-deep; }   .c-kicker { color: $mc-sun-deep; } }
    &.is-lime  { background: $mc-lime-bg;  border: 1.5px solid $mc-lime-light;  .c-num { color: $mc-lime-deep; }  .c-kicker { color: $mc-lime-deep; } }
    &.is-coral { background: $mc-coral-bg; border: 1.5px solid $mc-coral;       .c-num { color: $mc-coral-deep; } .c-kicker { color: $mc-coral-deep; } }
}

.c-num {
    font-family: $mc-font-display;
    font-size: 28px;
    font-style: italic;
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.04em;
}

.c-title {
    font-family: $mc-font-display;
    font-size: 15px;
    color: $mc-ink;
    line-height: 1.25;
    letter-spacing: -0.02em;
    font-weight: 700;
    margin-top: 4px;
}

.c-kicker {
    font-family: $mc-font-mono;
    font-size: 10.5px;
    letter-spacing: 0.06em;
    font-weight: 700;
}

.c-desc {
    font-size: 12px;
    color: $mc-ink-3;
    line-height: 1.6;
}

.learn {
    background: $mc-bg-cream;
    border-radius: $mc-radius-lg;
    padding: 22px 20px;
    border: 1px solid $mc-sun-light;
    box-shadow: $mc-shadow-sm;
}

.l-head {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 8px;
    flex-wrap: wrap;
}

.l-head-text { flex: 1; }

.l-title {
    margin-top: 8px;
    font-family: $mc-font-display;
    font-size: 22px;
    color: $mc-ink;
    line-height: 1.1;
    letter-spacing: -0.025em;
    font-weight: 800;
}

.l-italic {
    font-style: italic;
    font-weight: 500;
    color: $mc-sun-deep;
}

.l-sub {
    font-size: 12.5px;
    color: $mc-ink-3;
    line-height: 1.65;
    margin-bottom: 14px;
}

.l-status {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 11px;
    background: $mc-surface;
    border: 1px solid $mc-sun-light;
    border-radius: $mc-radius-pill;
    font-family: $mc-font-mono;
    font-size: 10px;
    color: $mc-ink-2;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    flex-shrink: 0;

    .dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: $mc-sun;
        animation: mc-pulse-sun 2.4s ease-in-out infinite;
    }
}

.l-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px;
    list-style: none;
    padding: 0;

    li {
        display: flex;
        flex-direction: column;
        gap: 3px;
        padding: 10px 12px;
        background: $mc-surface;
        border-radius: $mc-radius-sm;
        border: 1px solid $mc-sun-light;
    }

    .ltag {
        font-family: $mc-font-mono;
        font-size: 10.5px;
        font-weight: 700;
        color: $mc-ink;
        letter-spacing: -0.01em;
    }

    .ldetail {
        font-size: 10.5px;
        color: $mc-ink-3;
        line-height: 1.45;
    }
}
</style>
