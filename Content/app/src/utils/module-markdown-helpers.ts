import { isVoid } from './isVoid';
import { ModuleMarkdownItem } from '../types/ModuleMarkdown';
import markdown from '../../generated/ModuleMarkdown';

function getModuleMarkdownItem(path: string): ModuleMarkdownItem {
  const res = path.split('.').reduce((acc, cur) => acc[cur], markdown);
  if (!res || typeof res !== 'object') throw new Error('No object found.');
  if (isVoid(res.content) || isVoid(res.documentation))
    throw new Error('No content or documentation found.');
  return {
    content: res.content as string,
    documentation: res.documentation as string,
  };
}

export function getModuleMarkdownContent(path: string): string {
  const markdown = getModuleMarkdownItem(path);
  return markdown.content;
}

export function getModuleMarkdownDocumentation(path: string): string {
  const markdown = getModuleMarkdownItem(path);
  return markdown.documentation;
}