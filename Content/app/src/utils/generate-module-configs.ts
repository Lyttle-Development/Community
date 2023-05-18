import { spider } from './spider';
import { saveFile } from './saveFile';
import {
  buildConstConfig,
  buildInterfaceConfig,
  buildTypeConfig,
} from './module-configs';
import { SpiderFile } from '../types/Spider';

export function generateModuleConfigs() {
  const moduleInterfaceConfig = spider(
    '../content/modules',
    buildInterfaceConfig,
  );
  const moduleConstConfig = spider('../content/modules', buildConstConfig);
  const moduleTypeConfig = spider('../content/modules', buildTypeConfig);

  let content = '// This file is auto generated, do not edit it manually.\n';

  const builder = (obj: SpiderFile, path: string) => {
    Object.keys(obj).forEach((key) => {
      if (typeof obj[key] === 'object') {
        builder(obj[key], `${path}/${key}`);
      } else {
        if (!obj[key]) return;
        const globalVariable = path
          .replaceAll('../../content/modules/', '')
          .split(/[/_-]/gm)
          .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
          .join('');
        content += `\nexport * as ModuleConfig${globalVariable} from '${path}/config';\n`;
      }
    });
    content += '\n';
  };

  builder(moduleInterfaceConfig, '../../content/modules');
  builder(moduleTypeConfig, '../../content/modules');
  builder(moduleConstConfig, '../../content/modules');

  content = content.trim();

  // remove all empty lines
  content = content.replaceAll('\n\n', '');

  saveFile('generated/ModuleConfigs.ts', content);
}
