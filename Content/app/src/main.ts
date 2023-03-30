import { generateModuleMarkdown } from './utils/generate-module-markdown';
import { getModuleMarkdownContent } from './utils';
import { generateModuleConfigs } from './utils/generate-module-configs';

generateModuleMarkdown();
generateModuleConfigs();

const r = getModuleMarkdownContent('Activity.levels.cmd.you');
console.log(r);
