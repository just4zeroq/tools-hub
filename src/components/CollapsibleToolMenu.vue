<script setup lang="ts">
import { useStorage } from '@vueuse/core';
import { useThemeVars } from 'naive-ui';
import { RouterLink, useRoute } from 'vue-router';
import MenuIconItem from './MenuIconItem.vue';
import type { Tool, ToolCategory } from '@/tools/tools.types';

const props = withDefaults(defineProps<{ toolsByCategory?: ToolCategory[] }>(), { toolsByCategory: () => [] });
const { toolsByCategory } = toRefs(props);
const route = useRoute();

const makeLabel = (tool: Tool) => () => h(RouterLink, { to: tool.path }, { default: () => tool.name });
const makeIcon = (tool: Tool) => () => h(MenuIconItem, { tool });

// Default: all categories collapsed on first visit
const collapsedCategories = useStorage<Record<string, boolean>>(
  'menu-tool-option:collapsed-categories',
  null, // null = first visit, no storage yet
  undefined,
  {
    deep: true,
    serializer: {
      read: v => {
        if (!v) {
          // First visit: collapse all categories by default
          const allCollapsed: Record<string, boolean> = {};
          toolsByCategory.value.forEach(cat => { allCollapsed[cat.name] = true; });
          return allCollapsed;
        }
        return JSON.parse(v);
      },
      write: v => JSON.stringify(v),
    },
  },
);

function toggleCategoryCollapse({ name }: { name: string }) {
  collapsedCategories.value[name] = !collapsedCategories.value[name];
}

const menuOptions = computed(() =>
  toolsByCategory.value.map(({ name, components }) => ({
    name,
    isCollapsed: collapsedCategories.value[name] === true,
    tools: components.map(tool => ({
      label: makeLabel(tool),
      icon: makeIcon(tool),
      key: tool.path,
    })),
  })),
);

const themeVars = useThemeVars();
</script>

<template>
  <div class="menu-container">
    <div v-for="{ name, tools, isCollapsed } of menuOptions" :key="name" class="category-item">
      <div
        class="category-header"
        :class="{ collapsed: isCollapsed }"
        @click="toggleCategoryCollapse({ name })"
      >
        <div class="header-left">
          <span class="collapse-icon" :class="{ expanded: !isCollapsed }">
            <icon-mdi-chevron-right />
          </span>
          <span class="category-name">{{ name }}</span>
        </div>
        <span class="tool-count">{{ tools.length }}</span>
        <div class="glow-line" />
      </div>

      <transition name="expand">
        <div v-if="!isCollapsed" class="menu-wrapper">
          <div class="toggle-bar" @click="toggleCategoryCollapse({ name })" />
          <n-menu
            class="menu"
            :value="route.path"
            :collapsed-width="64"
            :collapsed-icon-size="22"
            :options="tools"
            :indent="8"
            :default-expand-all="true"
          />
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped lang="less">
.menu-container {
  padding: 8px 0;
}

.category-item {
  margin-bottom: 4px;
}

.category-header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  margin: 0 8px;
  border-radius: 8px;
  cursor: pointer;
  background: linear-gradient(135deg, rgba(24, 160, 88, 0.05) 0%, transparent 100%);
  border: 1px solid transparent;
  transition: all 0.3s ease;
  overflow: hidden;

  .glow-line {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, v-bind('themeVars.primaryColor'), transparent);
    transition: width 0.3s ease;
  }

  &:hover {
    background: linear-gradient(135deg, rgba(24, 160, 88, 0.1) 0%, rgba(24, 160, 88, 0.02) 100%);
    border-color: rgba(24, 160, 88, 0.2);

    .glow-line {
      width: 80%;
    }

    .category-name {
      color: v-bind('themeVars.primaryColor');
    }

    .collapse-icon {
      color: v-bind('themeVars.primaryColor');
    }
  }

  &.collapsed {
    background: transparent;

    &:hover {
      background: linear-gradient(135deg, rgba(24, 160, 88, 0.05) 0%, transparent 100%);
    }
  }
}

.header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.collapse-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  color: v-bind('themeVars.textColor3');
  transition: all 0.3s ease;

  &.expanded {
    transform: rotate(90deg);
  }
}

.category-name {
  font-size: 13px;
  font-weight: 600;
  color: v-bind('themeVars.textColor2');
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: color 0.3s ease;
}

.tool-count {
  font-size: 10px;
  padding: 2px 6px;
  background: linear-gradient(135deg, v-bind('themeVars.primaryColor') 0%, rgba(24, 160, 88, 0.8) 100%);
  color: white;
  border-radius: 10px;
  font-weight: 600;
  min-width: 20px;
  text-align: center;
}

.menu-wrapper {
  position: relative;
  margin-left: 16px;
  padding-left: 8px;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(180deg,
      transparent 0%,
      v-bind('themeVars.primaryColor') 20%,
      v-bind('themeVars.primaryColor') 80%,
      transparent 100%
    );
    opacity: 0.3;
    border-radius: 2px;
  }
}

.menu {
  flex: 1;
  margin-bottom: 5px;

  ::v-deep(.n-menu-item-content) {
    margin: 2px 0;
    border-radius: 6px;
    transition: all 0.2s ease;

    &:hover {
      background: linear-gradient(90deg, rgba(24, 160, 88, 0.1) 0%, transparent 100%);
    }

    &::before {
      left: 0;
      right: 13px;
    }
  }

  ::v-deep(.n-menu-item-content--selected) {
    background: linear-gradient(90deg, rgba(24, 160, 88, 0.15) 0%, transparent 100%) !important;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 3px;
      height: 60%;
      background: v-bind('themeVars.primaryColor');
      border-radius: 0 2px 2px 0;
      box-shadow: 0 0 10px v-bind('themeVars.primaryColor');
    }
  }
}

.toggle-bar {
  width: 24px;
  opacity: 0.1;
  transition: opacity ease 0.2s;
  position: relative;
  cursor: pointer;

  &::before {
    width: 2px;
    height: 100%;
    content: ' ';
    background-color: v-bind('themeVars.textColor3');
    border-radius: 2px;
    position: absolute;
    top: 0;
    left: 14px;
  }

  &:hover {
    opacity: 0.5;
  }
}

// Expand transition
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

// Dark mode
.dark {
  .category-header {
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, transparent 100%);

    &:hover {
      background: linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(139, 92, 246, 0.05) 100%);
      border-color: rgba(139, 92, 246, 0.3);
    }
  }

  .tool-count {
    background: linear-gradient(135deg, #8b5cf6 0%, rgba(139, 92, 246, 0.8) 100%);
  }

  .menu-wrapper::before {
    background: linear-gradient(180deg,
      transparent 0%,
      #8b5cf6 20%,
      #8b5cf6 80%,
      transparent 100%
    );
  }

  .menu ::v-deep(.n-menu-item-content--selected) {
    background: linear-gradient(90deg, rgba(139, 92, 246, 0.2) 0%, transparent 100%) !important;

    &::after {
      background: #8b5cf6;
      box-shadow: 0 0 10px #8b5cf6;
    }
  }
}
</style>
