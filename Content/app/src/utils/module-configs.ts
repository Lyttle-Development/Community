import { SpiderResults } from '../types/Spider';
import path from 'path';
import * as fs from 'fs';

export function buildInterfaceConfig(spiderResults: SpiderResults): void {
  const regexInterface =
    /\/\/ export:? ?(.*?)\nexport interface (.*) ({(.|\n)*?})/gm;

  buildConfig(spiderResults, regexInterface);
}

export function buildConstConfig(spiderResults: SpiderResults): void {
  // get the selected groups back from regex
  const regexConst = /\/\/ export:? ?(.*?)\nexport const (.*) = ({(.|\n)*?})/gm;

  buildConfig(spiderResults, regexConst);
}

function buildConfig(
  { files, filePath, fileName, rawFilePath }: SpiderResults,
  regex,
): void {
  // Check if the file is markdown.
  if (rawFilePath.endsWith('config.ts')) {
    // Resolve the file.
    const file = path.resolve(filePath);

    // Get the files content
    const fileContents = fs
      // Get contents
      .readFileSync(file, 'utf8')
      // Remove all Zero Width No-Break Space characters ( https://www.compart.com/en/unicode/U+FEFF )
      .replaceAll('﻿', '')
      // Fix lf and crlf
      .replace(/\r\n/g, '\n');

    const rawContent = fileContents.endsWith('\n')
      ? // If the string ends with a new line, remove it
        fileContents.slice(0, -1)
      : // Otherwise, return the string as is
        fileContents;

    let m;
    const result = [];

    while ((m = regex.exec(rawContent)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }

      result.push(m[2]);
    }

    // Set variable to the main object
    files[fileName] = result;
  }
}
