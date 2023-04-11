import { spider } from './spider';
import { buildMarkdown } from './module-markdown';
import { saveFile } from './saveFile';

export function generateModuleMarkdown() {
  const moduleMarkdown = spider('../content/modules', buildMarkdown);

  const content = `// This file is auto generated, don't edit it manually.
export const ModuleMarkdown = ${JSON.stringify(moduleMarkdown, null, 2)};

export default ModuleMarkdown;`;

  saveFile('generated/ModuleMarkdown.ts', content);
}
