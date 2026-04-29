<script setup lang="ts">
import { IconDragDrop } from '@tabler/icons-vue';
import { useHead } from '@vueuse/head';
import { computed } from 'vue';
import Draggable from 'vuedraggable';
import ToolCard from '../components/ToolCard.vue';
import { useToolStore } from '@/tools/tools.store';
import { usePopularToolsStore } from '@/tools/popular-tools.store';

const toolStore = useToolStore();
const popularToolsStore = usePopularToolsStore();

useHead({ title: 'AI Tools - Handy online for everyone' });
const { t } = useI18n();

const favoriteTools = computed(() => toolStore.favoriteTools);

const popularTools = computed(() => {
  return popularToolsStore.defaultPopularToolPaths
    .map(path => toolStore.tools.find(tool => tool.path === path))
    .filter(Boolean) as typeof toolStore.tools;
});

function onUpdateFavoriteTools() {
  toolStore.updateFavoriteTools(favoriteTools.value);
}
</script>

<template>
  <div class="home-container">
    <transition name="fade">
      <section v-if="toolStore.favoriteTools.length > 0" class="tools-section">
        <div class="section-header">
          <h2 class="section-title">{{ $t('home.categories.favoriteTools') }}</h2>
          <c-tooltip :tooltip="$t('home.categories.favoritesDndToolTip')">
            <n-icon :component="IconDragDrop" size="18" class="drag-hint" />
          </c-tooltip>
        </div>
        <Draggable
          :list="favoriteTools"
          class="tools-grid"
          ghost-class="ghost-favorites-draggable"
          item-key="name"
          @end="onUpdateFavoriteTools"
        >
          <template #item="{ element: tool }">
            <ToolCard :tool="tool" />
          </template>
        </Draggable>
      </section>
    </transition>

    <section v-if="popularTools.length > 0" class="tools-section">
      <div class="section-header">
        <h2 class="section-title">{{ $t('tools.categories.popular') }}</h2>
        <span class="tools-count">{{ popularTools.length }} tools</span>
      </div>
      <div class="tools-grid">
        <ToolCard v-for="tool in popularTools" :key="tool.path" :tool="tool" />
      </div>
    </section>

    <section v-if="toolStore.newTools.length > 0" class="tools-section">
      <div class="section-header">
        <h2 class="section-title">{{ t('home.categories.newestTools') }}</h2>
      </div>
      <div class="tools-grid">
        <ToolCard v-for="tool in toolStore.newTools" :key="tool.name" :tool="tool" />
      </div>
    </section>

    <section class="tools-section">
      <div class="section-header">
        <h2 class="section-title">{{ $t('home.categories.allTools') }}</h2>
        <span class="tools-count">{{ toolStore.tools.length }} tools</span>
      </div>
      <div class="tools-grid">
        <ToolCard v-for="tool in toolStore.tools" :key="tool.name" :tool="tool" />
      </div>
    </section>
  </div>
</template>

<style scoped lang="less">
.home-container {
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --border-color: #e2e8f0;
  --bg-accent: rgba(14, 165, 233, 0.08);

  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
}

.tools-section {
  margin-bottom: 48px;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border-color);
}

.section-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  letter-spacing: -0.01em;
}

.tools-count {
  font-size: 12px;
  color: var(--text-secondary);
  background: var(--bg-accent);
  padding: 4px 12px;
  border-radius: 12px;
  font-weight: 500;
}

.drag-hint {
  color: var(--text-secondary);
  cursor: grab;
  transition: color 0.2s;

  &:hover {
    color: var(--text-primary);
  }

  &:active {
    cursor: grabbing;
  }
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

.ghost-favorites-draggable {
  opacity: 0.6;
  background: var(--bg-accent);
  border: 2px dashed var(--border-color);
  border-radius: 12px;
  transform: scale(1.02);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

// Dark mode
.dark {
  .home-container {
    --text-primary: #e2e8f0;
    --text-secondary: #94a3b8;
    --border-color: #2d2d42;
    --bg-accent: rgba(139, 92, 246, 0.1);
  }

  .tools-count {
    background: var(--bg-accent);
  }

  .ghost-favorites-draggable {
    background: var(--bg-accent);
    border-color: #3d3d52;
  }
}
</style>
