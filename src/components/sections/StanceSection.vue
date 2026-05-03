<script setup>
import { useDevice } from '@/composables/useDevice';
import StanceDesktop from './stance/StanceDesktop.vue';
import StanceMobile from './stance/StanceMobile.vue';

const { isMobile } = useDevice();
</script>

<template>
    <StanceMobile v-if="isMobile" />
    <StanceDesktop v-else />
</template>
