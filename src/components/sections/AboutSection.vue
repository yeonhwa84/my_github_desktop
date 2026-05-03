<script setup>
import { useDevice } from '@/composables/useDevice';
import AboutDesktop from './about/AboutDesktop.vue';
import AboutMobile from './about/AboutMobile.vue';

const { isMobile } = useDevice();
</script>

<template>
    <AboutMobile v-if="isMobile" />
    <AboutDesktop v-else />
</template>
