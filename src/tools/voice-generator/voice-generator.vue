<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useHead } from '@vueuse/head';

useHead({ title: 'Voice Generator - AI Tools' });

const { t } = useI18n();
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">{{ t('tools.voice-generator.title') }}</h1>
    <p class="text-gray-600 dark:text-gray-400">
      {{ t('tools.voice-generator.description') }}
    </p>
    <div class="mt-8 p-8 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-center">
      <n-icon size="48" class="text-gray-400 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      </n-icon>
      <p class="text-gray-500">Coming soon...</p>
    </div>
  </div>
</template>
