import path from 'path';
import * as fs from 'fs';
import { SpiderResults } from '../types/Spider';

export function buildMarkdown({
  files,
  filePath,
  fileName,
  rawFilePath,
}: SpiderResults): void {
  // Check if the file is markdown.
  if (rawFilePath.endsWith('.md')) {
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

    // Set variable to the main object
    files[fileName] = fileContents.endsWith('\n')
      ? // If the string ends with a new line, remove it
        fileContents.slice(0, -1)
      : // Otherwise, return the string as is
        fileContents;
  }
}
