<script setup>
import HeroSection from '@/components/sections/HeroSection.vue';
import AboutSection from '@/components/sections/AboutSection.vue';
import StanceSection from '@/components/sections/StanceSection.vue';
import SkillsSection from '@/components/sections/SkillsSection.vue';
import ProjectsSection from '@/components/sections/ProjectsSection.vue';
import ExperienceSection from '@/components/sections/ExperienceSection.vue';
import ContactSection from '@/components/sections/ContactSection.vue';
import { useReveal } from '@/composables/useReveal';

useReveal();
</script>

<template>
    <main class="home">
        <HeroSection />
        <AboutSection />
        <StanceSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
    </main>
</template>
