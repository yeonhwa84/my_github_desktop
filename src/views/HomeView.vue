<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useDevice } from '@/composables/useDevice';

import HeroSection from '@/components/sections/HeroSection.vue';
import AboutSection from '@/components/sections/AboutSection.vue';
import StanceSection from '@/components/sections/StanceSection.vue';
import SkillsSection from '@/components/sections/SkillsSection.vue';
import ProjectsSection from '@/components/sections/ProjectsSection.vue';
import ExperienceSection from '@/components/sections/ExperienceSection.vue';
import ContactSection from '@/components/sections/ContactSection.vue';
import { useReveal } from '@/composables/useReveal';

const { isMobile } = useDevice();
const route = useRoute();
const tab = computed(() => route.meta?.tab ?? 'home');

useReveal();
</script>

<template>
    <main class="home" :class="{ 'is-mobile': isMobile }">
        <template v-if="!isMobile">
            <HeroSection />
            <AboutSection />
            <StanceSection />
            <SkillsSection />
            <ProjectsSection />
            <ExperienceSection />
            <ContactSection />
        </template>

        <template v-else>
            <HeroSection v-if="tab === 'home'" />

            <template v-else-if="tab === 'about'">
                <AboutSection />
                <StanceSection />
            </template>

            <SkillsSection v-else-if="tab === 'skills'" />

            <template v-else-if="tab === 'work'">
                <ProjectsSection />
                <ExperienceSection />
            </template>

            <ContactSection v-else-if="tab === 'contact'" />
        </template>
    </main>
</template>

<style lang="scss" scoped>
.home.is-mobile {
    // 바텀탭(68px) + 여유 공간 확보
    padding-bottom: calc(80px + env(safe-area-inset-bottom));
}
</style>
