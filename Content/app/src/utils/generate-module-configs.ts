import { spider } from './spider';
import { saveFile } from './saveFile';
import { buildConstConfig, buildInterfaceConfig } from './module-configs';
import { SpiderFile } from '../types/Spider';

export function generateModuleConfigs() {
  const moduleInterfaceConfig = spider(
    '../content/modules',
    buildInterfaceConfig,
  );
  const moduleConstConfig = spider('../content/modules', buildConstConfig);

  let content = "// This file is auto generated, don't edit it manually.\n";

  const builder = (obj: SpiderFile, path: string) => {
    Object.keys(obj).forEach((key) => {
      if (typeof obj[key] === 'object') {
        builder(obj[key], `${path}/${key}`);
      } else {
        if (!obj[key]) return;
        const globalVariable = path
          .replaceAll('../../content/modules/', '')
          .split('/')
          .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
          .join('');
        content += `export * as ModuleConfig${globalVariable} from '${path}/config';\n`;
      }
    });
    content += '\n';
  };

  builder(moduleInterfaceConfig, '../../content/modules');
  builder(moduleConstConfig, '../../content/modules');

  content = content.trim();

  // remove all empty lines
  content = content.replaceAll('\n\n', '');

  saveFile('generated/ModuleConfigs.ts', content);
}
