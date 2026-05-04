<script setup>
import { mobileTabs } from '@/data/mobileTabs';
</script>

<template>
    <nav class="m-tabbar" aria-label="Primary">
        <div class="m-tabbar__inner">
            <RouterLink
                v-for="tab in mobileTabs"
                :key="tab.id"
                :to="{ name: tab.name }"
                class="tab"
                active-class="is-active"
                :aria-label="tab.label"
            >
                <span class="tab-icon" aria-hidden="true">
                    <i :class="['fas', tab.icon]" />
                </span>
                <span class="tab-label">{{ tab.label }}</span>
                <span class="tab-dot" aria-hidden="true" />
            </RouterLink>
        </div>
    </nav>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/mobile' as *;

.m-tabbar {
    position: fixed;
    left: 12px;
    right: 12px;
    bottom: max(12px, env(safe-area-inset-bottom));
    z-index: 100;
    font-family: $mc-font-sans;
    pointer-events: none;
}

.m-tabbar__inner {
    pointer-events: auto;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 2px;
    padding: 8px;
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(20px) saturate(140%);
    -webkit-backdrop-filter: blur(20px) saturate(140%);
    border: 1px solid $mc-border-soft;
    border-radius: $mc-radius-xl;
    box-shadow: $mc-shadow-md;
}

.tab {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3px;
    min-height: 52px;
    padding: 8px 4px 6px;
    border-radius: $mc-radius-md;
    text-decoration: none;
    color: $mc-ink-3;
    -webkit-tap-highlight-color: transparent;
    transition: background 0.25s $mc-ease, color 0.25s $mc-ease, transform 0.2s $mc-ease;

    &:active {
        transform: scale(0.94);
    }

    &.is-active {
        background: $mc-aqua-bg;
        color: $mc-aqua-deep;

        .tab-icon {
            transform: translateY(-1px) scale(1.06);
        }

        .tab-dot {
            opacity: 1;
            transform: translateX(-50%) scale(1);
        }
    }
}

.tab-icon {
    font-size: 17px;
    line-height: 1;
    transition: transform 0.3s $mc-ease;
}

.tab-label {
    font-size: 10.5px;
    font-weight: 700;
    letter-spacing: 0.02em;
    line-height: 1;
}

.tab-dot {
    position: absolute;
    bottom: -2px;
    left: 50%;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: $mc-aqua;
    opacity: 0;
    transform: translateX(-50%) scale(0.4);
    transition: opacity 0.25s $mc-ease, transform 0.3s $mc-ease;
}
</style>
