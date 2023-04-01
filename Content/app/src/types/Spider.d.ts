export type SpiderFile = SpiderObject | string | undefined;

export interface SpiderObject {
  [key: string]: SpiderSpiderObject | string | undefined;
}

export interface SpiderResults {
  files: SpiderFile[];
  filePath: string;
  fileName: string;
  rawFilePath: string;
}
