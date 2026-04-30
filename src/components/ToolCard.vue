<script setup lang="ts">
import { useThemeVars } from 'naive-ui';
import FavoriteButton from './FavoriteButton.vue';
import type { Tool } from '@/tools/tools.types';

const props = defineProps<{ tool: Tool & { category: string } }>();
const { tool } = toRefs(props);
const theme = useThemeVars();
</script>

<template>
  <div class="tool-card-wrapper">
    <router-link :to="tool.path" class="decoration-none">
      <c-card class="h-full tool-card">
        <div flex items-center justify-between>
          <n-icon class="tool-icon" size="40" :component="tool.icon" />

          <div v-if="tool.isNew" class="new-badge" :style="{ backgroundColor: theme.primaryColor }">
            {{ $t('toolCard.new') }}
          </div>
        </div>

        <div class="tool-name">
          {{ tool.name }}
        </div>

        <div class="tool-desc">
          {{ tool.description }}
        </div>
      </c-card>
    </router-link>

    <div class="favorite-btn">
      <FavoriteButton :tool="tool" />
    </div>
  </div>
</template>

<style scoped lang="less">
.tool-card-wrapper {
  position: relative;
}

.favorite-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 10;
}

.tool-card {
  position: relative;
  border: 1px solid transparent;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, v-bind('theme.primaryColor'), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(135deg, v-bind('theme.primaryColor') 0%, transparent 50%, v-bind('theme.primaryColor') 100%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow:
      0 20px 40px rgba(0, 0, 0, 0.15),
      0 0 30px rgba(24, 160, 88, 0.1);
    border-color: v-bind('theme.primaryColor');

    &::before {
      opacity: 1;
    }

    &::after {
      opacity: 0.5;
    }

    .tool-icon {
      transform: scale(1.1);
      filter: drop-shadow(0 0 8px v-bind('theme.primaryColor'));
    }
  }
}

.tool-icon {
  color: v-bind('theme.primaryColor');
  transition: all 0.3s ease;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.tool-name {
  font-size: 18px;
  font-weight: 600;
  color: v-bind('theme.textColor1');
  margin: 5px 0;
  transition: color 0.3s ease;
}

.tool-desc {
  color: v-bind('theme.textColor3');
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 14px;
  line-height: 1.5;
}

.new-badge {
  border-radius: 20px;
  padding: 3px 8px;
  font-size: 11px;
  color: white;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  animation: pulse-badge 2s ease-in-out infinite;
}

@keyframes pulse-badge {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(24, 160, 88, 0.4);
  }
  50% {
    box-shadow: 0 0 10px 2px rgba(24, 160, 88, 0.2);
  }
}

.dark .tool-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);

  &:hover {
    box-shadow:
      0 20px 40px rgba(0, 0, 0, 0.4),
      0 0 40px rgba(139, 92, 246, 0.15);
  }
}
</style>
