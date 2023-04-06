import { generateModuleMarkdown } from './utils/generate-module-markdown';
import { generateModuleConfigs } from './utils/generate-module-configs';

console.log('Generating module markdown...');
generateModuleMarkdown();
console.log('Generating module configs...');
generateModuleConfigs();
console.log('Done!');
