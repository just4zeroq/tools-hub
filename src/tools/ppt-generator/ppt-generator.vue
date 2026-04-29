<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useHead } from '@vueuse/head';

useHead({ title: 'PPT Generator - AI Tools' });

const { t } = useI18n();
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">{{ t('tools.ppt-generator.title') }}</h1>
    <p class="text-gray-600 dark:text-gray-400">
      {{ t('tools.ppt-generator.description') }}
    </p>
    <div class="mt-8 p-8 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-center">
      <n-icon size="48" class="text-gray-400 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      </n-icon>
      <p class="text-gray-500">Coming soon...</p>
    </div>
  </div>
</template>
