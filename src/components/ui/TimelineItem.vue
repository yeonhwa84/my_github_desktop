<script setup>
defineProps({
    item: { type: Object, required: true },
});
</script>

<template>
    <li class="tl-item" :class="{ 'is-highlight': item.highlight }" data-reveal>
        <span class="tl-dot" />

        <div class="tl-card">
            <header class="tl-meta">
                <span class="tl-period mono">{{ item.period }}</span>
                <span class="tl-role">{{ item.role }}</span>
                <span v-if="item.highlight" class="tl-now mono">
                    <span class="tl-now-dot" /> NOW
                </span>
            </header>

            <h4 class="tl-title display">
                {{ item.company }}
                <span class="tl-project">· {{ item.project }}</span>
            </h4>

            <p class="tl-desc">{{ item.description }}</p>

            <div class="tl-tags">
                <span v-for="t in item.tags" :key="t" class="tl-tag mono">{{ t }}</span>
            </div>
        </div>
    </li>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.tl-item {
    position: relative;
    padding-bottom: 24px;

    &.is-highlight {
        .tl-dot {
            background: $coral;
            box-shadow: 0 0 0 4px $coral-bg, 0 0 0 8px rgba(255, 88, 65, 0.15);
            animation: tlPulse 2s ease-in-out infinite;
            border-color: $surface;
        }

        .tl-card {
            background: linear-gradient(135deg, $coral-bg 0%, $surface 60%);
            border-color: $coral-soft;
            box-shadow: 0 8px 24px rgba(255, 88, 65, 0.12);
        }
    }
}

@keyframes tlPulse {
    0%, 100% { box-shadow: 0 0 0 4px $coral-bg, 0 0 0 8px rgba(255, 88, 65, 0.15); }
    50%      { box-shadow: 0 0 0 4px $coral-bg, 0 0 0 12px rgba(255, 88, 65, 0); }
}

.tl-dot {
    position: absolute;
    top: 28px;
    left: -36px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: $surface;
    border: 3px solid $coral;
    box-shadow: 0 0 0 4px $coral-bg;
    z-index: 1;
}

.tl-card {
    padding: 22px 28px;
    background: $surface;
    border-radius: $radius-md;
    border: 1px solid $border-soft;
    transition: all 0.3s $ease;

    &:hover {
        transform: translateX(4px);
        box-shadow: $shadow-sm;
        border-color: $border;
    }
}

.tl-now {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    margin-left: auto;
    padding: 3px 10px;
    background: $coral;
    color: $surface;
    border-radius: 999px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.1em;
}

.tl-now-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: $surface;
    animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
    0%, 100% { opacity: 1; }
    50%      { opacity: 0.4; }
}

.tl-meta {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
    margin-bottom: 8px;
}

.tl-period {
    font-size: 12px;
    color: $coral;
    font-weight: 600;
    padding: 3px 12px;
    background: $coral-bg;
    border-radius: 999px;
}

.tl-role {
    font-size: 12px;
    color: $ink-3;
    font-weight: 500;
}

.tl-title {
    font-size: 18px;
    color: $ink;
    line-height: 1.4;
    letter-spacing: -0.015em;
    margin-bottom: 8px;
}

.tl-project {
    color: $ink-3;
    font-weight: 500;
    font-size: 15px;
    font-style: italic;
}

.tl-desc {
    font-size: 14px;
    color: $ink-3;
    line-height: 1.65;
    margin-bottom: 12px;
}

.tl-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
}

.tl-tag {
    padding: 3px 10px;
    background: $bg-warm;
    color: $ink-2;
    border-radius: $radius-xs;
    font-size: 11px;
    font-weight: 500;
}
</style>
