<script setup>
import { useDevice } from '@/composables/useDevice';
import ContactDesktop from './contact/ContactDesktop.vue';
import ContactMobile from './contact/ContactMobile.vue';

const { isMobile } = useDevice();
</script>

<template>
    <ContactMobile v-if="isMobile" />
    <ContactDesktop v-else />
</template>
