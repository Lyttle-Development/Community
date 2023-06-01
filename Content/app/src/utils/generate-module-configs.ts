import { saveFile } from './saveFile';
import fs from 'fs';
import path from 'path';

export function generateModuleConfigs() {
  let content = '// This file is auto generated, do not edit it manually.';

  // Build the file getter function.
  const crawlIn = (fileNames: string, dir: string): void => {
    const dirFiles = fs.readdirSync(dir);
    dirFiles.forEach((rawFilePath) => {
      // Get the file path
      const filePath = path.join(dir, rawFilePath);

      // Get the name of the file.
      let fileName = filePath
        // Remove all path structure
        .split('/')
        .pop()
        .split('\\')
        .pop()
        // Remove the file extension or sub extensions
        .split('.')
        .shift();

      fileName =
        fileNames + fileName?.charAt(0).toUpperCase() + fileName?.slice(1);

      // If it's a directory, call the function again
      if (fs.statSync(filePath).isDirectory()) {
        return crawlIn(fileName, filePath);
      }

      if (!filePath.endsWith('config.ts')) return;

      let globalVariable = fileName
        .replaceAll('../../content/modules/', '')
        .split(/[/_-]/gm)
        .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
        .join('');

      // Remove file name 'config'
      globalVariable = globalVariable.slice(0, -6);

      content += `\nexport * as ModuleConfig${globalVariable} from '../${dir}/config';`;
    });
  };

  // Get all files
  crawlIn('', '../content/modules');

  content = content.trim();

  // remove all empty lines
  content = content.replaceAll('\n\n', '');
  content = content.replaceAll('\\', '/');

  saveFile('generated/ModuleConfigs.ts', content);
}
