<script setup>
import { profile } from '@/data/profile';

const about = profile.about;
const statColors = ['is-aqua', 'is-sun', 'is-lime'];
const principleColors = ['is-aqua', 'is-coral', 'is-sun', 'is-lime'];
</script>

<template>
    <section id="about" class="m-about">
        <header class="head">
            <span class="eyebrow">/ About</span>
            <h2 class="title">
                {{ about.title[0] }}<span class="title-pop">{{ about.title[1] }}</span>{{ about.title[2] }}
            </h2>
            <p class="lead">{{ about.lead }}</p>
        </header>

        <!-- Stats bento (3 colored squircles) -->
        <ul class="stats-bento">
            <li v-for="(s, i) in about.stats" :key="s.label" :class="statColors[i]">
                <span class="s-num">{{ s.value }}<sup>{{ s.suffix }}</sup></span>
                <span class="s-lbl">{{ s.label }}</span>
                <span class="s-desc">{{ s.desc }}</span>
            </li>
        </ul>

        <!-- Quote card (sun yellow pop) -->
        <blockquote class="quote">
            <span class="q-mark">"</span>
            <p class="q-text">{{ about.quote }}</p>
            <span class="q-attr">— Lee Yeonhwa</span>
        </blockquote>

        <!-- Principles bento 2x2 -->
        <h3 class="sub-title">/ Principles</h3>
        <div class="principles">
            <article v-for="(p, i) in about.principles" :key="p.title" class="prin" :class="principleColors[i]">
                <span class="p-icon">
                    <i :class="['fas', p.icon]" />
                </span>
                <h4 class="p-title">{{ p.title }}</h4>
                <p class="p-desc">{{ p.desc }}</p>
            </article>
        </div>

        <!-- Domains list -->
        <article class="domains">
            <header class="d-head">
                <span class="d-eye">/ Domain Footprint</span>
                <h3 class="d-title">
                    5+ industries.<br />
                    <span class="d-italic">Deep enough to speak the language.</span>
                </h3>
            </header>
            <ul class="d-list">
                <li v-for="d in about.domains" :key="d.name">
                    <span class="d-mark" />
                    <div class="d-body">
                        <strong>{{ d.name }}</strong>
                        <span>{{ d.detail }}</span>
                    </div>
                </li>
            </ul>
        </article>
    </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/mobile' as *;

.m-about {
    @include mc-section($mc-bg-soft);
    font-family: $mc-font-sans;
}

.eyebrow { @include mc-eyebrow; }

// === Header ===
.head {
    margin-bottom: 28px;

    .title {
        margin-top: 12px;
        font-family: $mc-font-display;
        font-size: 30px;
        line-height: 1.16;
        letter-spacing: -0.025em;
        color: $mc-ink;
        font-weight: 800;
    }

    .title-pop {
        background: $mc-sun;
        color: $mc-ink;
        padding: 0 10px;
        border-radius: 8px;
        font-style: italic;
        font-weight: 600;
        margin: 0 2px;
    }

    .lead {
        margin-top: 14px;
        font-size: 14.5px;
        line-height: 1.72;
        color: $mc-ink-3;
    }
}

// === Stats Bento ===
.stats-bento {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    gap: 8px;
    margin-bottom: 32px;
    list-style: none;
    padding: 0;

    li {
        border-radius: $mc-radius-lg;
        padding: 20px 18px;
        display: flex;
        flex-direction: column;
        gap: 4px;
        box-shadow: $mc-shadow-xs;
        min-height: 124px;

        &:first-child {
            grid-column: 1 / -1;
            min-height: 100px;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;

            .s-num { font-size: 44px; }
            .s-desc { display: none; }
        }
    }

    .is-aqua  { background: $mc-aqua;  color: $mc-surface; box-shadow: $mc-shadow-aqua; }
    .is-sun   { background: $mc-sun;   color: $mc-ink;     box-shadow: $mc-shadow-sun; }
    .is-lime  { background: $mc-lime;  color: $mc-surface; }
}

.s-num {
    font-family: $mc-font-display;
    font-size: 36px;
    line-height: 1;
    font-weight: 800;
    letter-spacing: -0.04em;
    font-style: italic;

    sup {
        font-size: 0.5em;
        margin-left: 2px;
        font-style: normal;
        opacity: 0.85;
    }
}

.s-lbl {
    font-family: $mc-font-mono;
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    font-weight: 700;
    opacity: 0.92;
}

.s-desc {
    font-size: 11.5px;
    line-height: 1.4;
    opacity: 0.85;
    margin-top: auto;
}

// === Quote ===
.quote {
    background: $mc-bg-cream;
    border-radius: $mc-radius-lg;
    padding: 28px 22px;
    text-align: center;
    margin-bottom: 36px;
    border: 2px dashed $mc-sun;
}

.q-mark {
    font-family: $mc-font-serif;
    font-size: 64px;
    line-height: 0.5;
    color: $mc-sun-deep;
    font-style: italic;
    display: block;
    margin-bottom: 8px;
}

.q-text {
    font-family: $mc-font-serif;
    font-style: italic;
    font-size: 17px;
    line-height: 1.55;
    color: $mc-ink;
    margin-bottom: 14px;
}

.q-attr {
    font-family: $mc-font-mono;
    font-size: 10.5px;
    color: $mc-sun-deep;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    font-weight: 700;
}

// === Principles ===
.sub-title {
    @include mc-eyebrow;
    margin-bottom: 14px;
}

.principles {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-bottom: 36px;
}

.prin {
    @include mc-bento;
    padding: 18px 14px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    border: 1.5px solid;

    .p-icon {
        width: 36px;
        height: 36px;
        border-radius: 12px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
    }

    .p-title {
        font-family: $mc-font-display;
        font-size: 13.5px;
        color: $mc-ink;
        line-height: 1.25;
        font-weight: 700;
        letter-spacing: -0.01em;
    }

    .p-desc {
        font-size: 11.5px;
        color: $mc-ink-3;
        line-height: 1.55;
    }

    &.is-aqua  { border-color: $mc-aqua-light;  .p-icon { background: $mc-aqua-bg;  color: $mc-aqua-deep; } }
    &.is-coral { border-color: $mc-coral;       .p-icon { background: $mc-coral-bg; color: $mc-coral-deep; } }
    &.is-sun   { border-color: $mc-sun-light;   .p-icon { background: $mc-sun-bg;   color: $mc-sun-deep; } }
    &.is-lime  { border-color: $mc-lime-light;  .p-icon { background: $mc-lime-bg;  color: $mc-lime-deep; } }
}

// === Domains ===
.domains {
    background: $mc-surface;
    border-radius: $mc-radius-lg;
    padding: 24px 20px;
    box-shadow: $mc-shadow-sm;
    border: 1px solid $mc-border-soft;
}

.d-eye { @include mc-eyebrow; }

.d-head {
    margin-bottom: 18px;

    .d-title {
        margin-top: 8px;
        font-family: $mc-font-display;
        font-size: 19px;
        line-height: 1.3;
        color: $mc-ink;
        letter-spacing: -0.02em;
        font-weight: 700;
    }

    .d-italic {
        font-style: italic;
        color: $mc-aqua-deep;
        font-weight: 500;
    }
}

.d-list {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        padding: 12px 0;
        border-bottom: 1px solid $mc-border-soft;

        &:last-child { border-bottom: none; }
    }

    .d-mark {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: $mc-aqua;
        margin-top: 8px;
        flex-shrink: 0;
    }

    .d-body {
        flex: 1;

        strong {
            display: block;
            font-size: 13.5px;
            color: $mc-ink;
            font-weight: 700;
            margin-bottom: 2px;
        }

        span {
            font-size: 12px;
            color: $mc-ink-3;
            line-height: 1.5;
        }
    }
}
</style>
