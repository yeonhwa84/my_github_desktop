<script setup>
import { profile } from '@/data/profile';

const stance = profile.stance;
</script>

<template>
    <section id="stance" class="stance section">
        <div class="container">
            <header class="stance-head">
                <span class="eyebrow">/ {{ stance.eyebrow }}</span>
                <span class="stance-tag mono">In the age of AI · 2026</span>
            </header>

            <div class="stance-body" data-reveal>
                <h2 class="stance-statement display">
                    <span v-for="(part, i) in stance.title" :key="i" class="line">
                        <template v-if="typeof part === 'string'">{{ part }}</template>
                        <span v-else class="display-italic accent">{{ part.italic }}</span>
                    </span>
                </h2>

                <aside class="stance-lead">
                    <p v-html="stance.lead" />
                    <span class="lead-sig mono">— Yeonhwa Lee · 17y of context</span>
                </aside>
            </div>

            <div class="stance-cards">
                <article
                    v-for="p in stance.principles"
                    :key="p.num"
                    class="stance-card"
                    data-reveal
                >
                    <header>
                        <span class="num display">{{ p.num }}</span>
                        <span class="bar" />
                    </header>
                    <h3 class="card-title display">{{ p.title }}</h3>
                    <p class="card-kicker mono">// {{ p.kicker }}</p>
                    <p class="card-desc">{{ p.desc }}</p>
                </article>
            </div>

            <article class="learn-block" data-reveal>
                <header class="learn-head">
                    <div>
                        <span class="eyebrow">Learning Log</span>
                        <h3 class="learn-title display">
                            Always in <span class="display-italic accent">beta.</span>
                        </h3>
                        <p class="learn-sub">
                            17년차여도 매일 새 것이 나옵니다. 가장 먼저 들여다보고, 안전하게 도구함에 넣는 게 시니어의 일.
                        </p>
                    </div>
                    <span class="learn-status mono">
                        <span class="dot" /> currently studying
                    </span>
                </header>

                <ul class="learn-list">
                    <li v-for="item in stance.learning" :key="item.tag">
                        <span class="ltag mono">{{ item.tag }}</span>
                        <span class="ldetail">{{ item.detail }}</span>
                    </li>
                </ul>
            </article>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.stance {
    background: $surface;
    padding-top: 130px;
    padding-bottom: 130px;
    position: relative;
}

.stance-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 12px;
    padding-bottom: 28px;
    margin-bottom: 56px;
    border-bottom: 1px solid $border-soft;
}

.stance-tag {
    font-size: 11px;
    color: $ink-4;
    letter-spacing: 0.1em;
    text-transform: uppercase;
}

.stance-body {
    display: grid;
    grid-template-columns: 1.6fr 1fr;
    gap: 64px;
    align-items: end;
    margin-bottom: 96px;
}

.stance-statement {
    font-size: clamp(40px, 8vw, 108px);
    line-height: 0.96;
    color: $ink;
    letter-spacing: -0.04em;
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

.stance-lead {
    padding: 28px 30px;
    border-left: 3px solid $coral;
    background: $coral-bg;
    border-radius: 0 $radius-md $radius-md 0;

    p {
        font-size: clamp(15px, 1.4vw, 17px);
        line-height: 1.7;
        color: $ink-2;

        :deep(strong) { color: $ink; font-weight: 700; }
    }

    .lead-sig {
        display: block;
        margin-top: 16px;
        font-size: 11px;
        color: $coral;
        letter-spacing: 0.06em;
        font-weight: 600;
    }
}

.stance-cards {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0;
    margin-bottom: 96px;
    border-top: 1px solid $border;
    border-bottom: 1px solid $border;
}

.stance-card {
    padding: 36px 28px;
    border-right: 1px solid $border;
    transition: background 0.25s $ease;

    &:last-child { border-right: none; }

    &:hover {
        background: $bg-paper;
        .bar { width: 64px; background: $coral; }
        .num { color: $coral; }
    }

    > header {
        display: flex;
        align-items: center;
        gap: 14px;
        margin-bottom: 20px;
    }

    .num {
        font-size: 24px;
        font-style: italic;
        color: $ink-4;
        font-weight: 700;
        transition: color 0.25s $ease;
    }

    .bar {
        flex: 1;
        height: 1px;
        width: 24px;
        background: $border;
        transition: width 0.3s $ease, background 0.3s $ease;
    }

    .card-title {
        font-size: 22px;
        color: $ink;
        line-height: 1.2;
        letter-spacing: -0.025em;
        margin-bottom: 6px;
    }

    .card-kicker {
        font-size: 11px;
        color: $coral;
        letter-spacing: 0.06em;
        margin-bottom: 14px;
        font-weight: 500;
    }

    .card-desc {
        font-size: 14px;
        color: $ink-3;
        line-height: 1.65;
    }
}

.learn-block {
    background: $bg-paper;
    border-radius: $radius-2xl;
    padding: clamp(36px, 5vw, 56px);
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: -120px;
        right: -120px;
        width: 320px;
        height: 320px;
        border-radius: 50%;
        background: radial-gradient($lilac-soft, transparent 70%);
        opacity: 0.5;
    }
}

.learn-head {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 24px;
    margin-bottom: 36px;
    flex-wrap: wrap;
    position: relative;
    z-index: 1;
}

.learn-title {
    font-size: clamp(28px, 3.6vw, 44px);
    color: $ink;
    line-height: 1.05;
    margin-top: 8px;
    letter-spacing: -0.03em;

    .display-italic { font-style: italic; font-weight: 500; }
    .accent { color: $coral; }
}

.learn-sub {
    margin-top: 14px;
    font-size: 14.5px;
    color: $ink-3;
    line-height: 1.65;
    max-width: 520px;
}

.learn-status {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 7px 14px;
    background: $surface;
    border: 1px solid $border;
    border-radius: 999px;
    font-size: 11px;
    color: $ink-2;
    font-weight: 500;
    letter-spacing: 0.06em;

    .dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: $coral;
        box-shadow: 0 0 0 3px $coral-bg;
        animation: pulse 2s ease-in-out infinite;
    }
}

@keyframes pulse {
    0%, 100% { box-shadow: 0 0 0 3px rgba(255, 88, 65, 0.3); }
    50%      { box-shadow: 0 0 0 7px rgba(255, 88, 65, 0); }
}

.learn-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
    position: relative;
    z-index: 1;

    li {
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 16px 18px;
        background: $surface;
        border: 1px solid $border-soft;
        border-radius: $radius-md;
        transition: all 0.25s $ease;

        &:hover {
            border-color: $coral;
            transform: translateY(-2px);
            box-shadow: $shadow-sm;
        }
    }

    .ltag {
        font-size: 13px;
        font-weight: 700;
        color: $ink;
        letter-spacing: -0.01em;
    }

    .ldetail {
        font-size: 12px;
        color: $ink-3;
        line-height: 1.5;
    }
}
</style>
