<script setup>
defineProps({
    skill:  { type: Object, required: true },
    accent: { type: String, default: 'coral' },
});
</script>

<template>
    <div class="skill-row" :class="[`is-${accent}`, { 'is-current': skill.current }]">
        <div class="cell cell-name">
            <span class="name">{{ skill.name }}</span>
            <span v-if="skill.current" class="now-badge mono">
                <span class="now-dot" /> NOW
            </span>
        </div>

        <div class="cell cell-level" :title="`${skill.level} / 5`">
            <span
                v-for="i in 5"
                :key="i"
                class="dot"
                :class="{ filled: i <= skill.level }"
            />
        </div>

        <div class="cell cell-years mono">
            {{ skill.years }}<span class="y">y</span>
        </div>

        <div class="cell cell-context">
            {{ skill.context }}
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.skill-row {
    display: grid;
    grid-template-columns: minmax(180px, 1.2fr) auto 60px minmax(220px, 2fr);
    gap: 24px;
    align-items: center;
    padding: 14px 0;
    border-bottom: 1px solid $border-soft;
    transition: padding 0.2s $ease, background 0.2s $ease;

    &:last-child { border-bottom: none; }

    &:hover {
        padding-left: 8px;
        padding-right: 8px;

        .name { color: $coral; }
    }

    @include md-down {
        grid-template-columns: 1fr auto auto;
        grid-template-areas:
            'name level years'
            'ctx  ctx   ctx';
        gap: 8px 16px;
        padding: 16px 0;

        .cell-name    { grid-area: name; }
        .cell-level   { grid-area: level; }
        .cell-years   { grid-area: years; }
        .cell-context { grid-area: ctx; }
    }
}

.cell-name {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
}

.name {
    font-size: 16px;
    font-weight: 600;
    color: $ink;
    transition: color 0.25s $ease;
    letter-spacing: -0.01em;
}

.now-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 2px 8px;
    background: $coral;
    color: $surface;
    border-radius: 999px;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.12em;
}

.now-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: $surface;
    animation: blink 1.4s ease-in-out infinite;
}

@keyframes blink {
    0%, 100% { opacity: 1; }
    50%      { opacity: 0.3; }
}

.cell-level {
    display: flex;
    gap: 5px;
}

.dot {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: $border;
    transition: background 0.2s $ease;

    &.filled { background: $ink; }
}

// Per-accent dot fill
.is-coral  .dot.filled { background: $coral; }
.is-sage   .dot.filled { background: $sage; }
.is-butter .dot.filled { background: $butter-deep; }
.is-lilac  .dot.filled { background: $lilac; }
.is-rose   .dot.filled { background: $rose; }
.is-mint   .dot.filled { background: $mint; }

.cell-years {
    font-size: 14px;
    font-weight: 600;
    color: $ink;
    text-align: right;

    .y {
        font-size: 11px;
        color: $ink-4;
        margin-left: 2px;
    }
}

.cell-context {
    font-size: 13px;
    color: $ink-3;
    line-height: 1.55;

    @include md-down {
        font-size: 12.5px;
        color: $ink-4;
    }
}

.is-current .name {
    color: $coral;
}
</style>
