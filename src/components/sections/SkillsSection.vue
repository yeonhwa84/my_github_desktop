<script setup>
import { skillCategories, skillKeywords } from '@/data/skills';
import SectionHead from '@/components/ui/SectionHead.vue';
import SkillRow from '@/components/ui/SkillRow.vue';
import MarqueeStrip from '@/components/ui/MarqueeStrip.vue';
</script>

<template>
    <section id="skills" class="skills section">
        <div class="container">
            <SectionHead eyebrow="Skills">
                <template #title>
                    What I bring<br />
                    to the <span class="accent">table.</span>
                </template>
                <template #lead>
                    17년치 도구함. 깊이는 연차로, 폭은 도메인으로 — 모든 항목은 실제 프로젝트에서 검증된 것만 적었습니다.
                </template>
            </SectionHead>

            <!-- Matrix legend -->
            <div class="legend mono" data-reveal>
                <span><span class="dot dot-filled" /><span class="dot dot-filled" /><span class="dot dot-filled" /><span class="dot dot-filled" /><span class="dot dot-filled" /> Mastery (5)</span>
                <span><span class="dot dot-filled" /><span class="dot dot-filled" /><span class="dot dot-filled" /><span class="dot dot-filled" /><span class="dot" /> Strong (4)</span>
                <span><span class="dot dot-filled" /><span class="dot dot-filled" /><span class="dot dot-filled" /><span class="dot" /><span class="dot" /> Working (3)</span>
                <span class="legend-meta">Years &nbsp;= 실 사용 연차</span>
            </div>
        </div>

        <!-- Marquee divider with keywords -->
        <MarqueeStrip
            class="skills-marquee"
            :items="skillKeywords"
            :speed="80"
            variant="bordered"
        />

        <div class="container">
            <div class="cat-grid">
                <article
                    v-for="cat in skillCategories"
                    :key="cat.id"
                    class="cat"
                    :class="`is-${cat.accent}`"
                    data-reveal
                >
                    <header class="cat-head">
                        <span class="cat-num display">{{ cat.kicker }}</span>
                        <div class="cat-meta-block">
                            <span class="cat-icon">
                                <i :class="['fas', cat.icon]" />
                            </span>
                            <h3 class="cat-title display">{{ cat.title }}</h3>
                            <span class="cat-meta mono">{{ cat.meta }}</span>
                        </div>
                        <p class="cat-summary">{{ cat.summary }}</p>
                    </header>

                    <div class="cat-rows">
                        <SkillRow
                            v-for="s in cat.skills"
                            :key="s.name"
                            :skill="s"
                            :accent="cat.accent"
                        />
                    </div>
                </article>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.skills {
    background: $bg-paper;
    padding-bottom: 60px;
}

// Legend (above the marquee)
.legend {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 28px;
    font-size: 11px;
    color: $ink-3;
    letter-spacing: 0.05em;

    > span {
        display: inline-flex;
        align-items: center;
        gap: 6px;
    }

    .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: $border;
        margin-right: 1px;

        &.dot-filled { background: $coral; }
    }

    .legend-meta {
        margin-left: auto;
        color: $ink-4;
    }
}

.skills-marquee {
    margin: 0 0 64px;
}

// 6 categories: 2 columns on desktop, 1 on mobile
.cat-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 32px 40px;

    @include md-down {
        grid-template-columns: 1fr;
        gap: 32px;
    }
}

.cat {
    padding: 36px 0;
    border-top: 2px solid $ink;
    position: relative;
}

.cat-head {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto auto;
    column-gap: 18px;
    margin-bottom: 24px;

    .cat-num {
        grid-row: 1 / 3;
        font-size: clamp(48px, 6vw, 72px);
        line-height: 1;
        color: $ink;
        font-style: italic;
        letter-spacing: -0.04em;
    }

    .cat-meta-block {
        display: flex;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
    }

    .cat-icon {
        width: 32px;
        height: 32px;
        border-radius: 8px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        flex-shrink: 0;
    }

    .cat-title {
        font-size: clamp(22px, 2.4vw, 28px);
        color: $ink;
        line-height: 1.15;
        letter-spacing: -0.025em;
    }

    .cat-meta {
        width: 100%;
        font-size: 11px;
        color: $ink-3;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        margin-top: 2px;
    }

    .cat-summary {
        grid-column: 2;
        font-size: 14px;
        color: $ink-3;
        line-height: 1.65;
        margin-top: 8px;
        max-width: 480px;
    }
}

// Per-accent top border + icon color
.is-coral  { border-top-color: $coral;  .cat-icon { background: $coral-bg;  color: $coral; } }
.is-sage   { border-top-color: $sage;   .cat-icon { background: $sage-bg;   color: $sage; } }
.is-butter { border-top-color: $butter-deep; .cat-icon { background: $butter-bg; color: $butter-deep; } }
.is-lilac  { border-top-color: $lilac;  .cat-icon { background: $lilac-bg;  color: $lilac; } }
.is-rose   { border-top-color: $rose;   .cat-icon { background: $rose-bg;   color: $rose; } }
.is-mint   { border-top-color: $mint;   .cat-icon { background: $mint-bg;   color: $mint; } }
</style>
