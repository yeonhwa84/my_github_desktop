<script setup>
import { useDevice } from '@/composables/useDevice';
import ProjectsDesktop from './projects/ProjectsDesktop.vue';
import ProjectsMobile from './projects/ProjectsMobile.vue';

const { isMobile } = useDevice();
</script>

<template>
    <ProjectsMobile v-if="isMobile" />
    <ProjectsDesktop v-else />
</template>
