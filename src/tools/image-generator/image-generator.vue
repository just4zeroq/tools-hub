<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useHead } from '@vueuse/head';

useHead({ title: 'Image Generator - AI Tools' });

const { t } = useI18n();
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">{{ t('tools.image-generator.title') }}</h1>
    <p class="text-gray-600 dark:text-gray-400">
      {{ t('tools.image-generator.description') }}
    </p>
    <div class="mt-8 p-8 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-center">
      <n-icon size="48" class="text-gray-400 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </n-icon>
      <p class="text-gray-500">Coming soon...</p>
    </div>
  </div>
</template>
