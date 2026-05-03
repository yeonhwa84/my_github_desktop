<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { profile } from '@/data/profile';
import { navLinks } from '@/data/nav';
import { useScrollSpy } from '@/composables/useScrollSpy';
import { useSmoothScroll } from '@/composables/useSmoothScroll';

const scrolled = ref(false);
const sectionIds = navLinks.map((l) => l.id);
const { activeId } = useScrollSpy(sectionIds);
const { scrollTo } = useSmoothScroll(72);

const onScroll = () => { scrolled.value = window.scrollY > 24; };
const onLinkClick = (id) => scrollTo(id);

onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
});
onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll);
});
</script>

<template>
    <nav class="navbar" :class="{ 'is-scrolled': scrolled }" aria-label="Primary">
        <div class="container nav-inner">
            <a href="#home" class="brand" @click.prevent="onLinkClick('home')">
                <span class="brand-mark display">{{ profile.initials }}</span>
                <span class="brand-dot" />
            </a>

            <ul class="nav-links">
                <li v-for="link in navLinks" :key="link.id">
                    <a
                        :href="`#${link.id}`"
                        :class="['nav-link', { 'is-active': activeId === link.id, 'is-cta': link.cta }]"
                        @click.prevent="onLinkClick(link.id)"
                    >
                        {{ link.label }}
                    </a>
                </li>
            </ul>
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

        &:hover { background: $coral; }

        &.is-active { background: $coral; color: $surface; }
    }
}
</style>
