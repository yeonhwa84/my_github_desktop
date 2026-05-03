<script setup>
import { ref } from 'vue';
import { experienceRecent, experienceArchive } from '@/data/experience';

const expanded = ref(false);
const toggle = () => { expanded.value = !expanded.value; };
</script>

<template>
    <section id="experience" class="m-experience">
        <header class="head">
            <span class="eyebrow">/ Career</span>
            <h2 class="title">
                Work <span class="title-pop">History</span>
            </h2>
            <p class="lead">
                2003년 학교 행정실 → 자재정보팀 4년 → 차장 → 수석연구원. 한 단계씩 쌓아온 17년의 궤적.
            </p>
        </header>

        <ol class="timeline">
            <li v-for="item in experienceRecent" :key="item.period" class="t-item" :class="{ 'is-highlight': item.highlight }">
                <span class="t-dot" />
                <div class="t-card">
                    <span class="t-period">{{ item.period }}</span>
                    <h3 class="t-company">{{ item.company }}</h3>
                    <span class="t-role">{{ item.role }}</span>
                    <p class="t-project"><strong>{{ item.project }}</strong></p>
                    <p class="t-desc">{{ item.description }}</p>
                    <div class="t-tags">
                        <span v-for="tag in item.tags" :key="tag" class="tag">{{ tag }}</span>
                    </div>
                </div>
            </li>

            <transition-group name="fade">
                <li v-for="item in (expanded ? experienceArchive : [])" :key="item.period" class="t-item is-archive">
                    <span class="t-dot" />
                    <div class="t-card">
                        <span class="t-period">{{ item.period }}</span>
                        <h3 class="t-company">{{ item.company }}</h3>
                        <span class="t-role">{{ item.role }}</span>
                        <p class="t-project"><strong>{{ item.project }}</strong></p>
                        <p class="t-desc">{{ item.description }}</p>
                        <div class="t-tags">
                            <span v-for="tag in item.tags" :key="tag" class="tag">{{ tag }}</span>
                        </div>
                    </div>
                </li>
            </transition-group>
        </ol>

        <button type="button" class="toggle" :aria-expanded="expanded" @click="toggle">
            <span>{{ expanded ? '간략히 보기' : '이전 경력 모두 보기' }}</span>
            <i class="fas fa-chevron-down" :class="{ rotated: expanded }" />
        </button>
    </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/mobile' as *;

.m-experience {
    @include mc-section($mc-bg);
    font-family: $mc-font-sans;
}

.eyebrow { @include mc-eyebrow; }

.head {
    margin-bottom: 28px;

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

.timeline {
    position: relative;
    list-style: none;
    padding: 0 0 0 24px;
    margin: 0;

    &::before {
        content: '';
        position: absolute;
        top: 6px;
        bottom: 6px;
        left: 6px;
        width: 2px;
        background: linear-gradient(to bottom, $mc-aqua, $mc-aqua-light 70%, $mc-border);
        border-radius: 1px;
    }
}

.t-item {
    position: relative;
    padding-bottom: 14px;

    &:last-child { padding-bottom: 0; }
}

.t-dot {
    position: absolute;
    left: -23px;
    top: 18px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: $mc-surface;
    border: 3px solid $mc-aqua;
    box-shadow: 0 0 0 3px $mc-aqua-bg;

    .is-highlight & {
        background: $mc-sun;
        border-color: $mc-sun-deep;
        box-shadow: 0 0 0 3px $mc-sun-bg, $mc-shadow-sun;
    }

    .is-archive & {
        background: $mc-bg-tint;
        border-color: $mc-aqua-light;
        box-shadow: none;
    }
}

.t-card {
    background: $mc-surface;
    border-radius: $mc-radius-md;
    padding: 16px 16px;
    border: 1px solid $mc-border-soft;
    box-shadow: $mc-shadow-xs;

    .is-highlight & {
        background: $mc-bg-cream;
        border: 2px solid $mc-sun;
    }
}

.t-period {
    font-family: $mc-font-mono;
    font-size: 10.5px;
    color: $mc-aqua-deep;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-weight: 700;

    .is-highlight & { color: $mc-sun-deep; }
}

.t-company {
    margin-top: 4px;
    font-family: $mc-font-display;
    font-size: 15px;
    color: $mc-ink;
    line-height: 1.25;
    font-weight: 700;
    letter-spacing: -0.015em;
}

.t-role {
    display: inline-block;
    margin-top: 2px;
    font-size: 12px;
    color: $mc-ink-3;
    font-weight: 600;
}

.t-project {
    margin-top: 8px;
    font-size: 12.5px;
    color: $mc-ink-2;
    line-height: 1.45;

    strong { font-weight: 700; }
}

.t-desc {
    margin-top: 4px;
    font-size: 12px;
    color: $mc-ink-3;
    line-height: 1.6;
}

.t-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin-top: 10px;
}

.tag {
    padding: 3px 9px;
    background: $mc-bg-tint;
    color: $mc-aqua-deep;
    border-radius: $mc-radius-pill;
    font-family: $mc-font-mono;
    font-size: 10px;
    font-weight: 700;
}

.toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    margin-top: 22px;
    min-height: $mc-touch;
    padding: 14px 20px;
    background: $mc-surface;
    border: 1.5px solid $mc-aqua-light;
    border-radius: $mc-radius-pill;
    color: $mc-aqua-deep;
    font-family: $mc-font-sans;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s $mc-ease;
    -webkit-tap-highlight-color: transparent;

    &:active {
        background: $mc-aqua;
        color: $mc-surface;
        transform: scale(0.99);
    }

    i {
        transition: transform 0.3s $mc-ease;
        font-size: 11px;

        &.rotated { transform: rotate(180deg); }
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.4s $mc-ease, transform 0.4s $mc-ease;
}

.fade-enter-from { opacity: 0; transform: translateY(-8px); }
.fade-leave-to   { opacity: 0; transform: translateY(-8px); }
</style>
