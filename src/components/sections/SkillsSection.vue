<script setup>
import { useDevice } from '@/composables/useDevice';
import SkillsDesktop from './skills/SkillsDesktop.vue';
import SkillsMobile from './skills/SkillsMobile.vue';

const { isMobile } = useDevice();
</script>

<template>
    <SkillsMobile v-if="isMobile" />
    <SkillsDesktop v-else />
</template>
