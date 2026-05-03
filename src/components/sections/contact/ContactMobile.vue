<script setup>
import { profile } from '@/data/profile';

const links = [
    { icon: 'fas fa-envelope', label: 'Email',    value: profile.email,    href: `mailto:${profile.email}`, accent: 'is-aqua' },
    { icon: 'fab fa-github',   label: 'GitHub',   value: profile.github,   href: `https://${profile.github}`, accent: 'is-sun' },
    { icon: 'fab fa-linkedin', label: 'LinkedIn', value: profile.linkedin, href: `https://${profile.linkedin}`, accent: 'is-lime' },
];
</script>

<template>
    <section id="contact" class="m-contact">
        <div class="m-contact__bg" aria-hidden="true">
            <span class="ray ray-1" />
            <span class="ray ray-2" />
        </div>

        <div class="card">
            <header class="head">
                <span class="eyebrow">/ Contact</span>
                <h2 class="title">
                    함께 일하고<br />
                    <span class="title-pop">싶으시다면.</span>
                </h2>
                <p class="lead">
                    새로운 프로젝트, 협업 제안, 기술 문의 — 무엇이든 환영합니다.
                </p>
            </header>

            <div class="links">
                <a
                    v-for="l in links"
                    :key="l.label"
                    class="row"
                    :class="l.accent"
                    :href="l.href"
                    :target="l.label === 'Email' ? undefined : '_blank'"
                    rel="noopener"
                >
                    <span class="row-icon">
                        <i :class="l.icon" />
                    </span>
                    <span class="row-meta">
                        <small>{{ l.label }}</small>
                        <strong>{{ l.value }}</strong>
                    </span>
                    <i class="fas fa-arrow-up-right-from-square row-arrow" />
                </a>
            </div>
        </div>

        <p class="footer-mark">
            ⌘ Made with care · 2026 · {{ profile.nameEn }}
        </p>
    </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/mobile' as *;

.m-contact {
    @include mc-section($mc-bg-tint);
    font-family: $mc-font-sans;
    padding-bottom: 48px;
}

.m-contact__bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;

    .ray {
        position: absolute;
        border-radius: 50%;
        filter: blur(60px);
        opacity: 0.35;
    }
    .ray-1 {
        width: 220px; height: 220px;
        top: -50px; right: -50px;
        background: $mc-sun-light;
    }
    .ray-2 {
        width: 200px; height: 200px;
        bottom: 60px; left: -60px;
        background: $mc-lime-light;
    }
}

.eyebrow { @include mc-eyebrow; }

.card {
    position: relative;
    z-index: 1;
    background: $mc-surface;
    border-radius: $mc-radius-xl;
    padding: 32px 24px 24px;
    box-shadow: $mc-shadow-md;
    border: 1px solid $mc-border-soft;
}

.head {
    margin-bottom: 24px;
    text-align: center;

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
        margin-top: 12px;
        font-size: 13.5px;
        line-height: 1.7;
        color: $mc-ink-3;
    }
}

.links {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.row {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 16px;
    background: $mc-bg-soft;
    border-radius: $mc-radius-md;
    border: 1px solid $mc-border-soft;
    text-decoration: none;
    transition: transform 0.2s $mc-ease, background 0.2s $mc-ease;
    -webkit-tap-highlight-color: transparent;

    &:active {
        transform: scale(0.99);
    }

    &.is-aqua  { &:active { background: $mc-aqua-bg; }  .row-icon { background: $mc-aqua-bg;  color: $mc-aqua-deep; } }
    &.is-sun   { &:active { background: $mc-sun-bg; }   .row-icon { background: $mc-sun-bg;   color: $mc-sun-deep; } }
    &.is-lime  { &:active { background: $mc-lime-bg; }  .row-icon { background: $mc-lime-bg;  color: $mc-lime-deep; } }
}

.row-icon {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    flex-shrink: 0;
}

.row-meta {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;

    small {
        font-family: $mc-font-mono;
        font-size: 10px;
        color: $mc-ink-4;
        margin-bottom: 2px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        font-weight: 700;
    }

    strong {
        font-size: 13px;
        font-weight: 700;
        color: $mc-ink;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}

.row-arrow {
    color: $mc-ink-4;
    font-size: 12px;
    flex-shrink: 0;
}

.footer-mark {
    position: relative;
    z-index: 1;
    text-align: center;
    margin-top: 24px;
    font-family: $mc-font-mono;
    font-size: 10px;
    color: $mc-ink-4;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    font-weight: 600;
}
</style>
