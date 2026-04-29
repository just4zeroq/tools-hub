import { IconMicrophone } from '@tabler/icons-vue';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugin';

export const tool = defineTool({
  name: translate('tools.voice-generator.title'),
  path: '/voice-generator',
  description: translate('tools.voice-generator.description'),
  keywords: ['voice', 'audio', 'speech', 'tts', 'text to speech'],
  component: () => import('./voice-generator.vue'),
  icon: IconMicrophone,
});
