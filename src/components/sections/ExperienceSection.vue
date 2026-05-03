<script setup>
import { useDevice } from '@/composables/useDevice';
import ExperienceDesktop from './experience/ExperienceDesktop.vue';
import ExperienceMobile from './experience/ExperienceMobile.vue';

const { isMobile } = useDevice();
</script>

<template>
    <ExperienceMobile v-if="isMobile" />
    <ExperienceDesktop v-else />
</template>
