<script setup>
import { useDevice } from '@/composables/useDevice';
import NavbarDesktop from './navbar/NavbarDesktop.vue';
import NavbarMobile from './navbar/NavbarMobile.vue';

const { isMobile } = useDevice();
</script>

<template>
    <NavbarMobile v-if="isMobile" />
    <NavbarDesktop v-else />
</template>
