import { isVoid } from '../utils/is-void';
import ModuleMarkdown from '../content/generated-markdown';

export function getModuleMarkdownItem(path: string) {
  const res: any = path
    .split('.')
    .reduce((acc: any, cur) => acc[cur], ModuleMarkdown);
  if (!res || typeof res !== 'object') {
    throw new Error(
      `Was looking for content: "${path}", but no object was found!`,
    );
  }
  if (isVoid(res.content) || isVoid(res.documentation)) {
    throw new Error(
      `Was looking for content: "${path}", But no content or documentation was found.`,
    );
  }
  return {
    content: res.content as string,
    documentation: res.documentation as string,
  };
}

export function getMessage(path: string): string {
  const _markdown = getModuleMarkdownItem(path);
  return _markdown.content;
}

export const dashboardPrefix = 'Dashboard.';
