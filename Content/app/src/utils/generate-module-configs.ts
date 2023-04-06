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

  let content = '';

  const builder = (obj: SpiderFile, path: string) => {
    Object.keys(obj).forEach((key) => {
      if (typeof obj[key] === 'object') {
        builder(obj[key], `${path}/${key}`);
      } else {
        const variable = (
          obj[key][0].toUpperCase() + obj[key].slice(1)
        ).replaceAll('.', '');
        const globalVariable = (
          path.replaceAll('../../content/modules/', '').split('/').join('_') +
          '_' +
          variable
        )
          .replaceAll('.', '')
          .toUpperCase();
        content += `export { ${variable} as __${globalVariable}__ } from '${path}';\n`;
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
