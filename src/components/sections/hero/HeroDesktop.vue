<script setup>
import { profile } from '@/data/profile';
import { skillKeywords } from '@/data/skills';
import BaseButton from '@/components/ui/BaseButton.vue';
import MarqueeStrip from '@/components/ui/MarqueeStrip.vue';
import { useSmoothScroll } from '@/composables/useSmoothScroll';

const { scrollTo } = useSmoothScroll(72);

const onCta = (id) => (e) => {
    e.preventDefault();
    scrollTo(id);
};
</script>

<template>
    <section id="home" class="hero">
        <div class="top-bar mono">
            <span class="meta-item"><span class="status-dot" /> Available · 2026</span>
            <span class="meta-item">{{ profile.role }}</span>
            <span class="meta-item">Busan / Seoul · KR</span>
            <span class="meta-item">est. 2003</span>
        </div>

        <div class="container hero-grid">
            <div class="hero-main">
                <span class="hero-name mono">
                    이연화 &nbsp;/&nbsp; {{ profile.nameEn }}
                </span>

                <h1 class="hero-title display">
                    <span class="line">SEVENTEEN</span>
                    <span class="line">YEARS,</span>
                    <span class="line">
                        <span class="display-italic accent">endlessly</span>
                    </span>
                    <span class="line">RESPONSIBLE.</span>
                </h1>

                <p class="hero-bio">
                    <strong>"이거 될까?"</strong> 싶었던 문제를 풀어낸 짜릿함이 17년을 끌고 왔습니다.
                    발전·중공업·공공 SI 현장에서 <strong>그린필드 신규 구축</strong>과 <strong>레거시 전환</strong>,
                    두 흐름을 모두 다뤄온 풀스택 개발자입니다. 어떤 형태로 합류해도,
                    <em>맡은 일은 끝까지</em>—그게 17년의 룰입니다.
                </p>

                <div class="hero-actions">
                    <BaseButton variant="dark" :href="'#projects'" @click="onCta('projects')">
                        프로젝트 보기 <i class="fas fa-arrow-right" />
                    </BaseButton>
                    <BaseButton variant="ghost" :href="'#contact'" @click="onCta('contact')">
                        연락하기
                    </BaseButton>
                </div>
            </div>

            <aside class="hero-aside">
                <article class="now-card">
                    <header class="now-head">
                        <span class="now-pulse" />
                        <span class="mono now-kicker">{{ profile.nowLeading.kicker }}</span>
                    </header>

                    <h3 class="now-title display">
                        {{ profile.nowLeading.company }}
                    </h3>

                    <div class="now-meta-grid mono">
                        <div>
                            <span class="lbl">ROLE</span>
                            <strong>{{ profile.nowLeading.role }}</strong>
                        </div>
                        <div>
                            <span class="lbl">SINCE</span>
                            <strong>{{ profile.nowLeading.period }}</strong>
                        </div>
                        <div>
                            <span class="lbl">SCOPE</span>
                            <strong>{{ profile.nowLeading.scope }}</strong>
                        </div>
                    </div>

                    <ul class="now-stack">
                        <li v-for="t in profile.nowLeading.stack" :key="t">{{ t }}</li>
                    </ul>
                </article>

                <div class="hero-stats">
                    <div class="stat-block">
                        <span class="stat-num display">17<sup>+</sup></span>
                        <span class="stat-lbl mono">years</span>
                    </div>
                    <div class="stat-block">
                        <span class="stat-num display">30<sup>+</sup></span>
                        <span class="stat-lbl mono">projects</span>
                    </div>
                    <div class="stat-block">
                        <span class="stat-num display">5<sup>+</sup></span>
                        <span class="stat-lbl mono">industries</span>
                    </div>
                </div>
            </aside>
        </div>

        <MarqueeStrip
            class="hero-marquee"
            :items="skillKeywords"
            :speed="60"
            variant="dark"
        />
    </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.hero {
    position: relative;
    min-height: 100vh;
    padding: 88px 0 0;
    background: $bg-paper;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.top-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 28px;
    justify-content: center;
    padding: 14px 28px;
    border-bottom: 1px solid $border-soft;
    font-size: 11px;
    color: $ink-3;
    letter-spacing: 0.06em;
    text-transform: uppercase;

    @include md-down {
        gap: 14px;
        font-size: 10px;
        padding: 10px 16px;
    }
}

.meta-item {
    display: inline-flex;
    align-items: center;
    gap: 6px;
}

.status-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: $coral;
    box-shadow: 0 0 0 3px $coral-bg;
    animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
    0%, 100% { box-shadow: 0 0 0 3px rgba(255, 88, 65, 0.3); }
    50%      { box-shadow: 0 0 0 7px rgba(255, 88, 65, 0); }
}

.hero-grid {
    flex: 1;
    display: grid;
    grid-template-columns: 1fr;
    gap: 60px;
    padding-top: 60px;
    padding-bottom: 60px;

    @include lg-up {
        grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
        gap: 60px;
        align-items: start;
    }
}

.hero-name {
    display: inline-block;
    font-size: 13px;
    color: $ink-3;
    letter-spacing: 0.04em;
}

.hero-title {
    margin-top: 24px;
    font-size: clamp(60px, 12vw, 168px);
    line-height: 0.92;
    color: $ink;
    letter-spacing: -0.045em;
    font-weight: 800;
    text-transform: uppercase;

    .line { display: block; }

    .display-italic {
        text-transform: none;
        font-style: italic;
        font-weight: 500;
        letter-spacing: -0.025em;
    }

    .accent { color: $coral; }
}

.hero-bio {
    margin-top: 40px;
    max-width: 580px;
    font-size: clamp(15px, 1.4vw, 18px);
    line-height: 1.7;
    color: $ink-2;

    strong { color: $ink; font-weight: 700; }
    em {
        font-family: $font-serif;
        font-style: italic;
        color: $coral;
        font-weight: 600;
        font-size: 1.05em;
    }
}

.hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 36px;
}

.hero-aside {
    display: flex;
    flex-direction: column;
    gap: 24px;

    @include lg-up {
        position: sticky;
        top: 100px;
    }
}

.now-card {
    background: $surface;
    border: 1px solid $border;
    border-radius: $radius-lg;
    padding: 28px;
    box-shadow: $shadow-md;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0; left: 0;
        height: 100%;
        width: 5px;
        background: linear-gradient(to bottom, $coral, $lilac 70%);
    }
}

.now-head {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
}

.now-pulse {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: $coral;
    box-shadow: 0 0 0 3px $coral-bg;
    animation: pulse 2s ease-in-out infinite;
}

.now-kicker {
    font-size: 11px;
    color: $coral;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
}

.now-title {
    font-size: clamp(22px, 2.4vw, 28px);
    color: $ink;
    line-height: 1.15;
    margin-bottom: 24px;
    letter-spacing: -0.025em;
}

.now-meta-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 14px;
    margin-bottom: 20px;

    > div {
        padding: 10px 14px;
        background: $bg-paper;
        border-radius: $radius-sm;
        display: flex;
        flex-direction: column;
        gap: 2px;
    }

    .lbl {
        font-size: 10px;
        color: $ink-4;
        letter-spacing: 0.1em;
    }

    strong {
        font-size: 13px;
        color: $ink;
        font-weight: 600;
        font-family: $font-sans;
    }
}

.now-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;

    li {
        padding: 4px 10px;
        background: $lilac-bg;
        color: $lilac;
        border-radius: 999px;
        font-family: $font-mono;
        font-size: 11px;
        font-weight: 600;
    }
}

.hero-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
}

.stat-block {
    padding: 18px 14px;
    background: $surface;
    border: 1px solid $border-soft;
    border-radius: $radius-md;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    transition: all 0.25s $ease;

    &:hover {
        border-color: $ink;
        transform: translateY(-2px);
    }
}

.stat-num {
    font-size: clamp(28px, 3.4vw, 38px);
    color: $ink;
    line-height: 1;
    font-weight: 800;
    letter-spacing: -0.03em;

    sup {
        font-size: 0.4em;
        color: $coral;
        margin-left: 2px;
    }
}

.stat-lbl {
    font-size: 10px;
    color: $ink-4;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-top: 6px;
}

.hero-marquee {
    margin-top: auto;
}
</style>
