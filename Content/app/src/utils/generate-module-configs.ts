import { spider } from './spider';
import { saveFile } from './saveFile';
import { buildConfig } from './module-configs';

export function generateModuleConfigs() {
  const moduleMarkdown = spider('../content/modules', buildConfig);

  let content = '';

  const builder = (obj: any, path: string) => {
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

  builder(moduleMarkdown, '../../content/modules');

  content = content.trim();

  saveFile('generated/ModuleConfigs.ts', content);
}
