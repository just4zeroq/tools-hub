<script setup lang="ts">
import { useStyleStore } from '@/stores/style.store';

const styleStore = useStyleStore();
const { isMenuCollapsed, isSmallScreen } = toRefs(styleStore);
const siderPosition = computed(() => (isSmallScreen.value ? 'absolute' : 'static'));
</script>

<template>
  <n-layout has-sider class="tech-layout">
    <n-layout-sider
      bordered
      collapse-mode="width"
      :collapsed-width="0"
      :width="260"
      :collapsed="isMenuCollapsed"
      :show-trigger="false"
      :native-scrollbar="false"
      :position="siderPosition"
      class="tech-sider"
    >
      <slot name="sider" />
    </n-layout-sider>
    <n-layout class="content">
      <slot name="content" />
      <div v-show="isSmallScreen && !isMenuCollapsed" class="overlay" @click="isMenuCollapsed = true" />
    </n-layout>
  </n-layout>
</template>

<style lang="less" scoped>
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  cursor: pointer;
  z-index: 100;
}

.content {
  ::v-deep(.n-layout-scroll-container) {
    padding: 26px;
  }
}

.n-layout {
  height: 100vh;
}

.tech-layout {
  ::v-deep(.n-layout-sider) {
    background: linear-gradient(180deg,
      rgba(24, 160, 88, 0.02) 0%,
      transparent 30%,
      transparent 70%,
      rgba(24, 160, 88, 0.02) 100%
    ) !important;
  }
}

.tech-sider {
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 1px;
    height: 100%;
    background: linear-gradient(180deg,
      transparent 0%,
      rgba(24, 160, 88, 0.3) 20%,
      rgba(24, 160, 88, 0.3) 80%,
      transparent 100%
    );
  }
}

// Dark mode
.dark {
  .tech-sider::before {
    background: linear-gradient(180deg,
      transparent 0%,
      rgba(139, 92, 246, 0.3) 20%,
      rgba(139, 92, 246, 0.3) 80%,
      transparent 100%
    );
  }
}
</style>
