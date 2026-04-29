import { IconPhoto } from '@tabler/icons-vue';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugin';

export const tool = defineTool({
  name: translate('tools.image-generator.title'),
  path: '/image-generator',
  description: translate('tools.image-generator.description'),
  keywords: ['image', 'generate', 'ai', 'picture', 'photo'],
  component: () => import('./image-generator.vue'),
  icon: IconPhoto,
});
