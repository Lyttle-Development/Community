export interface SpiderFile {
  [key: string]: string | SpiderFile;
}

export interface SpiderResults {
  files: SpiderFile[];
  filePath: string;
  fileName: string;
  rawFilePath: string;
}