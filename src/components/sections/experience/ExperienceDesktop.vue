<script setup>
import { ref } from 'vue';
import { experienceRecent, experienceArchive } from '@/data/experience';
import SectionHead from '@/components/ui/SectionHead.vue';
import TimelineItem from '@/components/ui/TimelineItem.vue';

const expanded = ref(false);
const toggle = () => { expanded.value = !expanded.value; };
</script>

<template>
    <section id="experience" class="experience section">
        <div class="container">
            <SectionHead eyebrow="Career">
                <template #title>
                    Work <span class="accent">History</span>
                </template>
                <template #lead>
                    2003년 학교 행정실 → 자재정보팀 4년 → 차장 → 수석연구원. 한 단계씩 쌓아온 17년의 궤적.
                </template>
            </SectionHead>

            <div class="timeline-wrap">
                <ol class="timeline">
                    <TimelineItem v-for="item in experienceRecent" :key="item.period" :item="item" />

                    <transition-group name="fade">
                        <TimelineItem
                            v-for="item in (expanded ? experienceArchive : [])"
                            :key="item.period"
                            :item="item"
                        />
                    </transition-group>
                </ol>

                <div class="toggle-wrap">
                    <button
                        class="timeline-toggle"
                        :aria-expanded="expanded"
                        type="button"
                        @click="toggle"
                    >
                        <span>{{ expanded ? '간략히 보기' : '이전 경력 모두 보기' }}</span>
                        <i class="fas fa-chevron-down" :class="{ rotated: expanded }" />
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.experience { background: $bg-warm; }

.timeline-wrap { margin-top: 16px; }

.timeline {
    position: relative;
    padding-left: 36px;

    &::before {
        content: '';
        position: absolute;
        top: 8px;
        bottom: 8px;
        left: 11px;
        width: 2px;
        background: linear-gradient(to bottom, $coral, $border 80%);
    }
}

.toggle-wrap {
    display: flex;
    justify-content: center;
    margin-top: 32px;
}

.timeline-toggle {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 12px 24px;
    background: $surface;
    border: 1px solid $border;
    border-radius: 999px;
    color: $ink-2;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.25s $ease;

    &:hover {
        background: $ink;
        color: $surface;
        border-color: $ink;
        box-shadow: $shadow-md;
    }

    i {
        transition: transform 0.3s $ease;
        &.rotated { transform: rotate(180deg); }
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.4s $ease, transform 0.4s $ease;
}

.fade-enter-from { opacity: 0; transform: translateY(-8px); }
.fade-leave-to   { opacity: 0; transform: translateY(-8px); }
</style>
