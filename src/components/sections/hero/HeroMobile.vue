<script setup>
import { profile } from '@/data/profile';
import { useSmoothScroll } from '@/composables/useSmoothScroll';

const { scrollTo } = useSmoothScroll(64);

const onCta = (id) => (e) => {
    e.preventDefault();
    scrollTo(id);
};
</script>

<template>
    <section id="home" class="m-hero">
        <div class="m-hero__cloud" aria-hidden="true">
            <span class="cloud cloud-1" />
            <span class="cloud cloud-2" />
            <span class="cloud cloud-3" />
        </div>

        <div class="m-hero__inner">
            <span class="status">
                <span class="status-dot" /> Available · 2026
            </span>

            <h1 class="title">
                <span class="t-line">Seventeen</span>
                <span class="t-line">years,</span>
                <span class="t-line t-italic">endlessly</span>
                <span class="t-line">responsible.</span>
            </h1>

            <p class="bio">
                <strong>"이거 될까?"</strong> 싶었던 문제를 풀어낸 짜릿함이 17년을 끌고 왔습니다. 발전·중공업·공공 SI 두 흐름을 모두 다뤄온 <em>풀스택 개발자</em>입니다.
            </p>

            <div class="cta-row">
                <a class="cta-primary" href="#projects" @click="onCta('projects')">
                    프로젝트 보기 <i class="fas fa-arrow-right" />
                </a>
                <a class="cta-soft" href="#contact" @click="onCta('contact')">
                    연락하기
                </a>
            </div>

            <!-- BENTO: 4 boxes (now-leading wide + 3 stats) -->
            <div class="bento">
                <article class="bento-now">
                    <header class="now-head">
                        <span class="now-dot" />
                        <span class="now-kicker">{{ profile.nowLeading.kicker }}</span>
                    </header>
                    <h2 class="now-title">{{ profile.nowLeading.company }}</h2>
                    <p class="now-meta">
                        <b>{{ profile.nowLeading.role }}</b>
                        <span class="dotsep">·</span>
                        <span>{{ profile.nowLeading.period }}</span>
                    </p>
                    <ul class="now-stack">
                        <li v-for="t in profile.nowLeading.stack" :key="t">{{ t }}</li>
                    </ul>
                </article>

                <article class="bento-stat is-aqua">
                    <span class="bs-num">17<sup>+</sup></span>
                    <span class="bs-lbl">years</span>
                </article>
                <article class="bento-stat is-sun">
                    <span class="bs-num">30<sup>+</sup></span>
                    <span class="bs-lbl">projects</span>
                </article>
                <article class="bento-stat is-lime">
                    <span class="bs-num">5<sup>+</sup></span>
                    <span class="bs-lbl">industries</span>
                </article>
            </div>

            <span class="kicker-bottom">이연화 · {{ profile.nameEn }} · Senior PL</span>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/mobile' as *;

.m-hero {
    min-height: 100vh;
    padding: 88px 0 48px;
    background: linear-gradient(180deg, $mc-bg-tint 0%, $mc-bg 60%, $mc-bg-soft 100%);
    font-family: $mc-font-sans;
    position: relative;
    overflow: hidden;
}

.m-hero__cloud {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;

    .cloud {
        position: absolute;
        border-radius: 50%;
        filter: blur(70px);
        opacity: 0.5;
    }
    .cloud-1 {
        width: 220px; height: 220px;
        top: 60px; right: -60px;
        background: $mc-aqua-light;
    }
    .cloud-2 {
        width: 180px; height: 180px;
        top: 380px; left: -50px;
        background: $mc-sun-light;
        opacity: 0.4;
    }
    .cloud-3 {
        width: 200px; height: 200px;
        bottom: 100px; right: -40px;
        background: $mc-lime-light;
        opacity: 0.3;
    }
}

.m-hero__inner {
    position: relative;
    z-index: 1;
    padding: 0 $mc-pad-x;
    display: flex;
    flex-direction: column;
    gap: 18px;
}

.status {
    align-self: flex-start;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 14px;
    background: $mc-surface;
    border-radius: $mc-radius-pill;
    box-shadow: $mc-shadow-sm;
    font-family: $mc-font-mono;
    font-size: 11px;
    color: $mc-ink-2;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}

.status-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: $mc-lime;
    animation: mc-pulse-aqua 2.4s ease-in-out infinite;
}

.title {
    font-family: $mc-font-display;
    font-size: 44px;
    line-height: 0.98;
    letter-spacing: -0.04em;
    color: $mc-ink;
    font-weight: 800;

    .t-line {
        display: block;
    }

    .t-italic {
        font-style: italic;
        font-weight: 500;
        color: $mc-aqua-deep;
        letter-spacing: -0.025em;
    }
}

.bio {
    font-size: 15px;
    line-height: 1.72;
    color: $mc-ink-2;

    strong { color: $mc-ink; font-weight: 700; }
    em {
        font-family: $mc-font-serif;
        font-style: italic;
        color: $mc-coral-deep;
        font-weight: 600;
        font-size: 1.02em;
    }
}

.cta-row {
    display: flex;
    gap: 8px;
}

.cta-primary {
    @include mc-button-primary;
    flex: 1;

    i { font-size: 12px; }
}

.cta-soft {
    @include mc-button-soft;
}

// === BENTO GRID ===
.bento {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto auto;
    gap: 8px;
    margin-top: 4px;
}

.bento-now {
    grid-column: 1 / -1;
    grid-row: 1;
    background: $mc-surface;
    border-radius: $mc-radius-lg;
    padding: 22px 20px;
    box-shadow: $mc-shadow-sm;
    border: 1px solid $mc-border-soft;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0;
        height: 4px;
        background: linear-gradient(90deg, $mc-aqua 0%, $mc-lime 100%);
    }
}

.now-head {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
}

.now-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: $mc-aqua;
    animation: mc-pulse-aqua 2.4s ease-in-out infinite;
}

.now-kicker {
    font-family: $mc-font-mono;
    font-size: 10.5px;
    color: $mc-aqua-deep;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.14em;
}

.now-title {
    font-family: $mc-font-display;
    font-size: 22px;
    line-height: 1.18;
    color: $mc-ink;
    letter-spacing: -0.025em;
    margin-bottom: 8px;
    font-weight: 700;
}

.now-meta {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: $mc-font-mono;
    font-size: 11.5px;
    color: $mc-ink-3;
    margin-bottom: 14px;
    flex-wrap: wrap;

    b { color: $mc-ink-2; font-weight: 700; }

    .dotsep { color: $mc-ink-4; }
}

.now-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    list-style: none;
    margin: 0;
    padding: 0;

    li {
        padding: 4px 10px;
        background: $mc-aqua-bg;
        color: $mc-aqua-deep;
        border-radius: $mc-radius-pill;
        font-family: $mc-font-mono;
        font-size: 10.5px;
        font-weight: 700;
    }
}

.bento-stat {
    grid-row: 2;
    border-radius: $mc-radius-md;
    padding: 18px 12px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    box-shadow: $mc-shadow-xs;
    min-height: 92px;

    &.is-aqua {
        background: $mc-aqua;
        color: $mc-surface;
        box-shadow: $mc-shadow-aqua;
    }
    &.is-sun {
        background: $mc-sun;
        color: $mc-ink;
        box-shadow: $mc-shadow-sun;
    }
    &.is-lime {
        background: $mc-lime;
        color: $mc-surface;
    }
}

.bs-num {
    font-family: $mc-font-display;
    font-size: 32px;
    line-height: 1;
    font-weight: 800;
    letter-spacing: -0.04em;
    font-style: italic;

    sup {
        font-size: 0.45em;
        margin-left: 1px;
        font-style: normal;
    }
}

.bs-lbl {
    font-family: $mc-font-mono;
    font-size: 10.5px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-weight: 700;
    margin-top: 4px;
    opacity: 0.92;
}

.kicker-bottom {
    align-self: center;
    font-family: $mc-font-mono;
    font-size: 10.5px;
    color: $mc-ink-3;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    font-weight: 600;
    margin-top: 8px;
}
</style>
