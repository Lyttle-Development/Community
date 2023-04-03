import * as fs from 'fs';
import path from 'path';

export function saveFile(file, content) {
  const absoluteFilePath = path.resolve(file);
  fs.writeFileSync(absoluteFilePath, content);
}
