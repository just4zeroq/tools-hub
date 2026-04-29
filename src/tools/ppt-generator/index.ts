import { IconPresentation } from '@tabler/icons-vue';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugin';

export const tool = defineTool({
  name: translate('tools.ppt-generator.title'),
  path: '/ppt-generator',
  description: translate('tools.ppt-generator.description'),
  keywords: ['ppt', 'powerpoint', 'presentation', 'slide'],
  component: () => import('./ppt-generator.vue'),
  icon: IconPresentation,
});
