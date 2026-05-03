<script setup>
import { profile } from '@/data/profile';
import SectionHead from '@/components/ui/SectionHead.vue';
import StatCard from '@/components/ui/StatCard.vue';
import PrincipleCard from '@/components/ui/PrincipleCard.vue';

const about = profile.about;
const accents = ['coral', 'sage', 'butter'];
</script>

<template>
    <section id="about" class="about section">
        <div class="container">
            <SectionHead eyebrow="About" align="center">
                <template #title>
                    {{ about.title[0] }}<span class="accent">{{ about.title[1] }}</span>{{ about.title[2] }}
                </template>
                <template #lead>{{ about.lead }}</template>
            </SectionHead>

            <div class="stats-row">
                <StatCard
                    v-for="(s, i) in about.stats"
                    :key="s.label"
                    :label="s.label"
                    :value="s.value"
                    :suffix="s.suffix"
                    :desc="s.desc"
                    :accent="accents[i]"
                />
            </div>

            <blockquote class="quote-card" data-reveal>
                <i class="fas fa-quote-left quote-icon" />
                <p class="quote-text display">{{ about.quote }}</p>
                <span class="quote-attr mono">— Lee Yeonhwa</span>
            </blockquote>

            <div class="principles-row">
                <PrincipleCard
                    v-for="(p, i) in about.principles"
                    :key="p.title"
                    :icon="p.icon"
                    :title="p.title"
                    :desc="p.desc"
                    :index="i"
                />
            </div>

            <article class="domains-card" data-reveal>
                <header class="domains-head">
                    <span class="eyebrow">Domain Footprint</span>
                    <h3 class="display">5+ industries, deep enough to speak the language.</h3>
                </header>

                <ul class="domains-list">
                    <li v-for="d in about.domains" :key="d.name">
                        <strong>{{ d.name }}</strong>
                        <span>{{ d.detail }}</span>
                    </li>
                </ul>
            </article>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.about {
    background: $bg-paper;
}

.stats-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-bottom: 64px;

    @include md-down {
        grid-template-columns: 1fr;
    }
}

.quote-card {
    background: $ink;
    color: $surface;
    border-radius: $radius-2xl;
    padding: 64px 56px;
    text-align: center;
    margin-bottom: 64px;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: -50px;
        right: -50px;
        width: 240px;
        height: 240px;
        border-radius: 50%;
        background: $coral;
        opacity: 0.18;
        filter: blur(60px);
    }

    @include md-down {
        padding: 40px 24px;
    }
}

.quote-icon {
    font-size: 32px;
    color: $coral;
    margin-bottom: 20px;
}

.quote-text {
    font-size: clamp(20px, 3.2vw, 36px);
    line-height: 1.4;
    max-width: 760px;
    margin: 0 auto 24px;
    font-style: italic;
    font-weight: 500;
    color: $surface;
    position: relative;
    z-index: 1;
}

.quote-attr {
    color: $ink-4;
    font-size: 12px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
}

.principles-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-bottom: 32px;

    @include lg-down {
        grid-template-columns: repeat(2, 1fr);
    }

    @include sm-down {
        grid-template-columns: 1fr;
    }
}

.domains-card {
    background: $surface;
    border: 1px solid $border-soft;
    border-radius: $radius-lg;
    padding: 40px 36px;
    transition: box-shadow 0.3s $ease;

    &:hover {
        box-shadow: $shadow-md;
    }
}

.domains-head {
    margin-bottom: 28px;

    h3 {
        font-size: clamp(20px, 2.4vw, 28px);
        color: $ink;
        margin-top: 8px;
        letter-spacing: -0.02em;
        line-height: 1.3;
    }
}

.domains-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 16px;

    li {
        padding: 16px 18px;
        background: $bg-soft;
        border-radius: $radius-md;
        border: 1px solid $border-soft;

        strong {
            display: block;
            font-weight: 700;
            color: $ink;
            font-size: 14px;
            margin-bottom: 4px;
        }

        span {
            font-size: 13px;
            color: $ink-3;
            line-height: 1.5;
        }
    }
}
</style>
