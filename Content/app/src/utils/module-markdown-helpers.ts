import { isVoid } from './isVoid';
import { ModuleMarkdownItem } from '../types/ModuleMarkdown';
import markdown from '../../generated/ModuleMarkdown';

export function getModuleMarkdownItem(path: string): ModuleMarkdownItem {
  const res = path.split('.').reduce((acc, cur) => acc[cur], markdown);
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

export function getModuleMarkdownContent(path: string): string {
  const _markdown = getModuleMarkdownItem(path);
  return _markdown.content;
}

export function getModuleMarkdownDocumentation(path: string): string {
  const _markdown = getModuleMarkdownItem(path);
  return _markdown.documentation;
}
