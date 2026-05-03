<script setup>
import { profile } from '@/data/profile';

const stocksUrl = `${import.meta.env.BASE_URL}stocks/`;
</script>

<template>
    <footer class="footer">
        <div class="container footer-inner">
            <div class="footer-brand">
                <span class="brand-mark display">{{ profile.initials }}</span>
                <span class="footer-text">© {{ profile.year }} {{ profile.nameEn }} · Crafted with care</span>
            </div>
            <nav class="footer-links" aria-label="Footer">
                <a :href="stocksUrl" class="side-link" title="Personal stock notes (Notion-style)">
                    <i class="fas fa-chart-line" /> notes
                </a>
                <a href="#home" class="top-link">Top ↑</a>
            </nav>
        </div>
    </footer>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.footer {
    padding: 36px 0 48px;
    border-top: 1px solid $border-soft;
    background: $bg-paper;
}

.footer-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
}

.footer-brand {
    display: flex;
    align-items: center;
    gap: 12px;
}

.brand-mark {
    font-size: 18px;
    color: $ink;
    font-weight: 800;
    font-style: italic;
}

.footer-text {
    font-size: 13px;
    color: $ink-3;
}

.footer-links {
    display: flex;
    gap: 14px;
    align-items: center;
}

.side-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 12px;
    border: 1px dashed $border;
    border-radius: 999px;
    font-size: 12px;
    color: $ink-4;
    font-family: $font-mono;
    transition: all 0.25s $ease;

    &:hover {
        color: $coral;
        border-color: $coral;
        border-style: solid;
        background: $coral-bg;
    }

    i { font-size: 11px; }
}

.top-link {
    font-size: 13px;
    color: $ink-3;
    transition: color 0.2s $ease;

    &:hover { color: $ink; }
}
</style>
