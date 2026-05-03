<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { profile } from '@/data/profile';
import { navLinks } from '@/data/nav';
import { useScrollSpy } from '@/composables/useScrollSpy';
import { useScrollLock } from '@/composables/useScrollLock';
import { useSmoothScroll } from '@/composables/useSmoothScroll';

const scrolled = ref(false);
const menuOpen = ref(false);

const sectionIds = navLinks.map((l) => l.id);
const { activeId } = useScrollSpy(sectionIds);
const { scrollTo } = useSmoothScroll(72);

useScrollLock(menuOpen);

const onScroll = () => { scrolled.value = window.scrollY > 24; };

const onLinkClick = (id) => {
    menuOpen.value = false;
    scrollTo(id);
};

const onEsc = (e) => { if (e.key === 'Escape') menuOpen.value = false; };

onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('keydown', onEsc);
    onScroll();
});
onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll);
    document.removeEventListener('keydown', onEsc);
});

const linkAccentClass = computed(() => 'is-coral');
</script>

<template>
    <nav class="navbar" :class="{ 'is-scrolled': scrolled }" aria-label="Primary">
        <div class="container nav-inner">
            <a href="#home" class="brand" @click.prevent="onLinkClick('home')">
                <span class="brand-mark display">{{ profile.initials }}</span>
                <span class="brand-dot" />
            </a>

            <button
                class="menu-btn"
                :class="{ 'is-open': menuOpen }"
                aria-label="Menu"
                @click="menuOpen = !menuOpen"
            >
                <span /><span /><span />
            </button>

            <ul class="nav-links" :class="{ 'is-open': menuOpen }">
                <li v-for="link in navLinks" :key="link.id">
                    <a
                        :href="`#${link.id}`"
                        :class="[
                            'nav-link',
                            { 'is-active': activeId === link.id, 'is-cta': link.cta }
                        ]"
                        @click.prevent="onLinkClick(link.id)"
                    >
                        {{ link.label }}
                    </a>
                </li>
            </ul>

            <div v-if="menuOpen" class="menu-overlay" @click="menuOpen = false" />
        </div>
    </nav>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.navbar {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    padding: 16px 0;
    background: rgba(247, 245, 240, 0.65);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid transparent;
    transition: background 0.3s $ease, border-color 0.3s $ease, box-shadow 0.3s $ease;

    &.is-scrolled {
        background: rgba(247, 245, 240, 0.92);
        border-bottom-color: $border-soft;
        box-shadow: $shadow-xs;
    }
}

.nav-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.brand {
    display: inline-flex;
    align-items: center;
    gap: 8px;
}

.brand-mark {
    font-size: 22px;
    font-weight: 800;
    color: $ink;
    letter-spacing: -0.04em;
    font-style: italic;
}

.brand-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: $coral;
    box-shadow: 0 0 0 3px $coral-bg;
}

.nav-links {
    display: flex;
    gap: 4px;
    align-items: center;

    @include md-down {
        position: fixed;
        top: 70px;
        right: 16px;
        left: 16px;
        flex-direction: column;
        align-items: stretch;
        gap: 4px;
        padding: 16px;
        background: rgba(255, 255, 255, 0.97);
        backdrop-filter: blur(20px);
        border: 1px solid $border-soft;
        border-radius: $radius-md;
        box-shadow: $shadow-lg;
        opacity: 0;
        transform: translateY(-12px);
        pointer-events: none;
        transition: opacity 0.25s $ease, transform 0.25s $ease;
        z-index: 90;

        &.is-open {
            opacity: 1;
            transform: translateY(0);
            pointer-events: auto;
        }
    }
}

.nav-link {
    display: inline-block;
    padding: 8px 16px;
    font-size: 14px;
    font-weight: 500;
    color: $ink-2;
    border-radius: 999px;
    transition: all 0.2s $ease;

    &:hover {
        color: $ink;
        background: $bg-warm;
    }

    &.is-active {
        color: $coral;
        background: $coral-bg;
    }

    &.is-cta {
        background: $ink;
        color: $surface;
        padding: 8px 20px;

        &:hover {
            background: $coral;
        }

        &.is-active {
            background: $coral;
            color: $surface;
        }
    }

    @include md-down {
        padding: 12px 14px;
    }
}

.menu-btn {
    display: none;
    width: 40px; height: 40px;
    border-radius: 10px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;

    @include md-down {
        display: flex;
    }

    span {
        display: block;
        width: 22px;
        height: 2px;
        background: $ink;
        border-radius: 2px;
        transition: transform 0.25s $ease, opacity 0.25s $ease;
    }

    &.is-open {
        span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        span:nth-child(2) { opacity: 0; }
        span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
    }
}

.menu-overlay {
    @include md-up { display: none; }

    position: fixed;
    inset: 0;
    background: rgba(26, 26, 26, 0.3);
    backdrop-filter: blur(4px);
    z-index: 80;
}
</style>
