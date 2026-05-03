<script setup>
import { useDevice } from '@/composables/useDevice';
import HeroDesktop from './hero/HeroDesktop.vue';
import HeroMobile from './hero/HeroMobile.vue';

const { isMobile } = useDevice();
</script>

<template>
    <HeroMobile v-if="isMobile" />
    <HeroDesktop v-else />
</template>
