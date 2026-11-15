<script setup>
import { projects } from '@/data/projects';
import SectionHead from '@/components/ui/SectionHead.vue';

// 실무 SI와 개인 실습·사이드를 섹터 라벨로 구분해 그룹 헤더를 표시
const isLab = (p) => /실습|사이드/.test(p.sector);
</script>

<template>
    <section id="projects" class="projects section">
        <div class="container">
            <SectionHead eyebrow="Selected Work">
                <template #title>
                    Featured<br />
                    <span class="accent">Projects.</span>
                </template>
                <template #lead>
                    실무 SI 4건과 최근 개인 실습·사이드 프로젝트. 카드의 링크로 결과물을 바로 볼 수 있어요.
                </template>
            </SectionHead>

            <div class="project-list">
                <template v-for="(p, i) in projects" :key="p.num">
                <div
                    v-if="i === 0 || isLab(projects[i - 1]) !== isLab(p)"
                    class="group-label mono"
                >{{ isLab(p) ? '개인 실습 · 사이드' : '실무 · SI' }}</div>
                <article
                    class="project-row"
                    :class="`is-${p.accent}`"
                    data-reveal
                >
                    <div class="row-num display">{{ p.num }}</div>

                    <div class="row-meta">
                        <span class="row-sector mono">{{ p.sector }}</span>
                        <span class="row-period mono">{{ p.period }}</span>
                    </div>

                    <h3 class="row-title display">{{ p.title }}</h3>
                    <p class="row-desc">{{ p.description }}</p>

                    <div class="row-stack">
                        <span v-for="s in p.stack" :key="s" class="chip mono">{{ s }}</span>
                        <a
                            v-if="p.link"
                            class="row-link mono"
                            :href="p.link"
                            target="_blank"
                            rel="noopener"
                        >{{ p.linkLabel || '보기' }} ↗</a>
                    </div>

                    <div class="row-divider" :style="{ animationDelay: `${i * 100}ms` }" />
                </article>
                </template>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.projects { background: $bg-warm; }

.group-label {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: $ink-4;
    padding-top: 14px;
    border-top: 1px solid $border;
    margin-top: 28px;
}
.group-label:first-child { border-top: none; margin-top: 0; padding-top: 0; }

.project-list {
    display: flex;
    flex-direction: column;
    gap: 0;
}

.project-row {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-areas:
        'num meta'
        'num title'
        'num desc'
        'num stack'
        'div div';
    column-gap: 40px;
    row-gap: 12px;
    padding: 56px 0 40px;
    position: relative;
    transition: padding 0.3s $ease;

    &:first-child { padding-top: 0; }

    &:hover {
        padding-left: 16px;
        .row-num   { color: $ink; }
        .row-title { color: $ink; }
    }
}

.row-num {
    grid-area: num;
    font-size: clamp(72px, 12vw, 168px);
    line-height: 0.85;
    color: $ink-5;
    font-style: italic;
    font-weight: 800;
    letter-spacing: -0.05em;
    transition: color 0.4s $ease;
    align-self: start;
}

.row-meta {
    grid-area: meta;
    display: flex;
    align-items: center;
    gap: 16px;
    font-size: 11px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 4px;
}

.row-sector { color: $coral; font-weight: 700; }
.is-sage   .row-sector { color: $sage; }
.is-butter .row-sector { color: $butter-deep; }
.is-rose   .row-sector { color: $rose; }

.row-period { color: $ink-4; }

.row-title {
    grid-area: title;
    font-size: clamp(28px, 4vw, 44px);
    color: $ink;
    line-height: 1.1;
    letter-spacing: -0.03em;
    transition: color 0.3s $ease;
}

.row-desc {
    grid-area: desc;
    font-size: clamp(15px, 1.5vw, 17px);
    color: $ink-3;
    line-height: 1.65;
    max-width: 720px;
    margin-top: 4px;
}

.row-stack {
    grid-area: stack;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 8px;
}

.chip {
    padding: 5px 12px;
    background: $surface;
    border: 1px solid $border;
    color: $ink-2;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 500;
}

.row-link {
    padding: 5px 13px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 700;
    color: $coral;
    border: 1px solid currentColor;
    text-decoration: none;
    transition: background 0.2s $ease, color 0.2s $ease;
}
.is-sage   .row-link { color: $sage; }
.is-butter .row-link { color: $butter-deep; }
.is-rose   .row-link { color: $rose; }
.row-link:hover        { color: #fff; background: $coral; }
.is-sage   .row-link:hover { background: $sage; }
.is-butter .row-link:hover { background: $butter-deep; }
.is-rose   .row-link:hover { background: $rose; }

.row-divider {
    grid-area: div;
    height: 1px;
    background: $border;
    margin-top: 20px;
}

.project-row:last-child .row-divider { display: none; }
</style>
