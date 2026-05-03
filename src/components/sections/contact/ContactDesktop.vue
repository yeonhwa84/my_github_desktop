<script setup>
import { profile } from '@/data/profile';

const links = [
    { icon: 'fas fa-envelope', label: 'Email',    value: profile.email,    href: `mailto:${profile.email}` },
    { icon: 'fab fa-github',   label: 'GitHub',   value: profile.github,   href: `https://${profile.github}` },
    { icon: 'fab fa-linkedin', label: 'LinkedIn', value: profile.linkedin, href: `https://${profile.linkedin}` },
];
</script>

<template>
    <section id="contact" class="contact section">
        <div class="container">
            <article class="contact-card" data-reveal>
                <div class="contact-left">
                    <span class="eyebrow">/ Contact</span>
                    <h2 class="contact-title display">
                        함께 일하고<br /><span class="accent">싶으시다면.</span>
                    </h2>
                    <p class="contact-lead">
                        새로운 프로젝트, 협업 제안, 기술 문의 — 무엇이든 환영합니다.
                    </p>
                </div>

                <div class="contact-right">
                    <a
                        v-for="l in links"
                        :key="l.label"
                        class="contact-row"
                        :href="l.href"
                        :target="l.label === 'Email' ? undefined : '_blank'"
                        rel="noopener"
                    >
                        <span class="contact-icon">
                            <i :class="l.icon" />
                        </span>
                        <span class="contact-meta">
                            <small class="mono">{{ l.label }}</small>
                            <strong>{{ l.value }}</strong>
                        </span>
                        <i class="fas fa-arrow-up-right-from-square go-arrow" />
                    </a>
                </div>
            </article>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.contact { background: $bg-paper; padding-bottom: 60px; }

.contact-card {
    background: linear-gradient(135deg, $sage 0%, $sage-deep 100%);
    color: $surface;
    border-radius: $radius-2xl;
    padding: clamp(40px, 5vw, 72px);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: -100px;
        right: -100px;
        width: 320px;
        height: 320px;
        border-radius: 50%;
        background: radial-gradient($coral, transparent 70%);
        opacity: 0.35;
    }
}

.contact-left {
    position: relative;
    z-index: 1;

    .eyebrow { color: $butter; }

    .contact-title {
        font-size: clamp(36px, 5vw, 56px);
        line-height: 1.1;
        color: $surface;
        margin-top: 16px;
    }

    .accent {
        color: $coral-soft;
        font-style: italic;
    }

    .contact-lead {
        margin-top: 20px;
        color: rgba(255, 255, 255, 0.75);
        font-size: 16px;
        max-width: 420px;
    }
}

.contact-right {
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: relative;
    z-index: 1;
}

.contact-row {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 18px 22px;
    background: rgba(255, 255, 255, 0.07);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: $radius-md;
    transition: all 0.25s $ease;

    &:hover {
        background: rgba(255, 255, 255, 0.12);
        border-color: $coral;
        transform: translateX(4px);

        .go-arrow { color: $coral; transform: translate(2px, -2px); }
    }
}

.contact-icon {
    width: 42px;
    height: 42px;
    border-radius: 12px;
    background: rgba(255, 88, 65, 0.18);
    color: $coral-soft;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    flex-shrink: 0;
}

.contact-meta {
    flex: 1;
    display: flex;
    flex-direction: column;

    small {
        font-size: 11px;
        color: rgba(255, 255, 255, 0.55);
        margin-bottom: 2px;
    }

    strong {
        font-size: 15px;
        font-weight: 600;
        color: $surface;
    }
}

.go-arrow {
    color: rgba(255, 255, 255, 0.4);
    transition: all 0.25s $ease;
}
</style>
