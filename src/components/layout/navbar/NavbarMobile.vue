<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { profile } from '@/data/profile';
import { navLinks } from '@/data/nav';
import { useScrollSpy } from '@/composables/useScrollSpy';
import { useScrollLock } from '@/composables/useScrollLock';
import { useSmoothScroll } from '@/composables/useSmoothScroll';

const scrolled = ref(false);
const open = ref(false);

const sectionIds = navLinks.map((l) => l.id);
const { activeId } = useScrollSpy(sectionIds);
const { scrollTo } = useSmoothScroll(64);
useScrollLock(open);

const onScroll = () => { scrolled.value = window.scrollY > 16; };
const onLinkClick = (id) => {
    open.value = false;
    scrollTo(id);
};
const onEsc = (e) => { if (e.key === 'Escape') open.value = false; };

onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('keydown', onEsc);
    onScroll();
});
onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll);
    document.removeEventListener('keydown', onEsc);
});
</script>

<template>
    <nav class="m-nav" :class="{ 'is-scrolled': scrolled, 'is-open': open }" aria-label="Primary">
        <div class="m-nav__bar">
            <a href="#home" class="brand" @click.prevent="onLinkClick('home')">
                <span class="brand-mark">{{ profile.initials }}</span>
                <span class="brand-dot" />
            </a>

            <button
                class="hamburger"
                :class="{ 'is-open': open }"
                aria-label="Toggle menu"
                :aria-expanded="open"
                type="button"
                @click="open = !open"
            >
                <span /><span /><span />
            </button>
        </div>

        <transition name="overlay">
            <div v-if="open" class="overlay" @click.self="open = false">
                <div class="overlay__bg" aria-hidden="true">
                    <span class="bg-blob bg-blob-1" />
                    <span class="bg-blob bg-blob-2" />
                    <span class="bg-blob bg-blob-3" />
                </div>

                <div class="overlay__inner">
                    <span class="overlay-eye">/ Navigate</span>
                    <ul class="menu">
                        <li v-for="(link, i) in navLinks" :key="link.id">
                            <a
                                :href="`#${link.id}`"
                                :class="['menu-link', { 'is-active': activeId === link.id, 'is-cta': link.cta }]"
                                :style="{ '--i': i }"
                                @click.prevent="onLinkClick(link.id)"
                            >
                                <span class="menu-num">0{{ i + 1 }}</span>
                                <span class="menu-label">{{ link.label }}</span>
                                <i class="fas fa-arrow-right menu-arrow" />
                            </a>
                        </li>
                    </ul>

                    <footer class="overlay-foot">
                        <span class="foot-status">
                            <span class="foot-dot" /> Available · 2026
                        </span>
                        <span class="foot-mail">{{ profile.email }}</span>
                    </footer>
                </div>
            </div>
        </transition>
    </nav>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/mobile' as *;

.m-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    font-family: $mc-font-sans;
}

.m-nav__bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid transparent;
    transition: background 0.3s $mc-ease, border-color 0.3s $mc-ease, box-shadow 0.3s $mc-ease;

    .is-scrolled & {
        background: rgba(255, 255, 255, 0.95);
        border-bottom-color: $mc-border-soft;
        box-shadow: $mc-shadow-xs;
    }

    .is-open & {
        background: transparent;
        border-bottom-color: transparent;
        box-shadow: none;
    }
}

.brand {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
}

.brand-mark {
    font-family: $mc-font-display;
    font-size: 20px;
    font-weight: 800;
    color: $mc-ink;
    letter-spacing: -0.04em;
    font-style: italic;

    .is-open & { color: $mc-ink; }
}

.brand-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: $mc-aqua;
    box-shadow: 0 0 0 3px $mc-aqua-bg;
}

// === Hamburger ===
.hamburger {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    background: transparent;
    border: none;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    z-index: 1;

    span {
        display: block;
        width: 22px;
        height: 2px;
        background: $mc-ink;
        border-radius: 2px;
        transition: transform 0.3s $mc-ease, opacity 0.3s $mc-ease, background 0.3s $mc-ease;
    }

    &.is-open {
        span {
            background: $mc-ink;
        }
        span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        span:nth-child(2) { opacity: 0; }
        span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
    }
}

// === Fullscreen Overlay ===
.overlay {
    position: fixed;
    inset: 0;
    z-index: -1;
    background: $mc-bg;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.overlay__bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;

    .bg-blob {
        position: absolute;
        border-radius: 50%;
        filter: blur(60px);
        opacity: 0.35;
    }
    .bg-blob-1 {
        width: 260px; height: 260px;
        top: 10%; right: -40px;
        background: $mc-aqua-light;
    }
    .bg-blob-2 {
        width: 220px; height: 220px;
        top: 50%; left: -60px;
        background: $mc-sun-light;
        opacity: 0.3;
    }
    .bg-blob-3 {
        width: 180px; height: 180px;
        bottom: 8%; right: -30px;
        background: $mc-lime-light;
        opacity: 0.25;
    }
}

.overlay__inner {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 84px 20px 28px;
}

.overlay-eye {
    @include mc-eyebrow;
    margin-bottom: 16px;
}

.menu {
    list-style: none;
    margin: 0;
    padding: 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.menu-link {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 14px;
    padding: 18px 20px;
    background: rgba(255, 255, 255, 0.6);
    border: 1px solid $mc-border-soft;
    border-radius: $mc-radius-md;
    text-decoration: none;
    transition: transform 0.2s $mc-ease, background 0.2s $mc-ease, border-color 0.2s $mc-ease;
    -webkit-tap-highlight-color: transparent;
    animation: slide-in 0.45s $mc-ease both;
    animation-delay: calc(var(--i) * 0.05s + 0.1s);

    &:active {
        transform: scale(0.98);
    }

    &.is-active {
        background: $mc-aqua;
        border-color: $mc-aqua;
        box-shadow: $mc-shadow-aqua;

        .menu-num,
        .menu-label,
        .menu-arrow { color: $mc-surface; }
    }

    &.is-cta {
        background: $mc-ink;
        border-color: $mc-ink;

        .menu-num    { color: rgba(255, 255, 255, 0.55); }
        .menu-label,
        .menu-arrow  { color: $mc-surface; }

        &.is-active {
            background: $mc-sun;
            border-color: $mc-sun;
            box-shadow: $mc-shadow-sun;
            .menu-num   { color: rgba(15, 43, 61, 0.55); }
            .menu-label,
            .menu-arrow { color: $mc-ink; }
        }
    }
}

@keyframes slide-in {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
}

.menu-num {
    font-family: $mc-font-mono;
    font-size: 11px;
    color: $mc-ink-4;
    letter-spacing: 0.12em;
    font-weight: 700;
}

.menu-label {
    font-family: $mc-font-display;
    font-size: 22px;
    color: $mc-ink;
    line-height: 1;
    font-weight: 700;
    letter-spacing: -0.025em;
}

.menu-arrow {
    color: $mc-ink-4;
    font-size: 14px;
}

.overlay-foot {
    margin-top: 24px;
    padding-top: 20px;
    border-top: 1px solid $mc-border-soft;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
}

.foot-status {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-family: $mc-font-mono;
    font-size: 11px;
    color: $mc-ink-2;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
}

.foot-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: $mc-lime;
    animation: mc-pulse-aqua 2.4s ease-in-out infinite;
}

.foot-mail {
    font-family: $mc-font-mono;
    font-size: 11px;
    color: $mc-ink-3;
    letter-spacing: 0.05em;
    overflow: hidden;
    text-overflow: ellipsis;
}

// === Overlay transition ===
.overlay-enter-active,
.overlay-leave-active {
    transition: opacity 0.3s $mc-ease;
}

.overlay-enter-from,
.overlay-leave-to {
    opacity: 0;
}

.is-open .overlay {
    z-index: 99;
}
</style>
