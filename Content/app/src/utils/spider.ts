import * as fs from 'fs';
import path from 'path';
import { SpiderFile, SpiderResults } from '../types/Spider';

export function spider(
  directory: string,
  action: (spiderResults: SpiderResults) => void,
): SpiderFile {
  const files: SpiderFile = {};

  // Build the file getter function.
  const crawlIn = (files: any, dir: string): void => {
    const dirFiles = fs.readdirSync(dir);
    dirFiles.forEach((rawFilePath) => {
      // Get the file path
      const filePath: string = path.join(dir, rawFilePath) ?? '';
      // Get the name of the file.
      const fileName: string = filePath
        // Remove all path structure
        .split('/')
        .pop()
        .split('\\')
        .pop()
        // Remove the file extension or sub extensions
        .split('.')
        .shift();

      // If it's a directory, call the function again
      if (fs.statSync(filePath).isDirectory()) {
        files[fileName] = {};
        return crawlIn(files[fileName], filePath);
      }

      action({ files, filePath, fileName, rawFilePath });
    });
  };

  // Get all files
  crawlIn(files, directory);

  // Return the files object
  return files;
}
