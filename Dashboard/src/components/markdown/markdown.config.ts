import remarkGfm from 'remark-gfm';
import { Link } from '../link';
import { MarkdownComponents } from './';

// Plugins used in markdown conversion
export const remarkPlugins = [remarkGfm];

// Components used in markdown conversion (html tag to react component)
export const components = {
  ol: MarkdownComponents.List,
  ul: MarkdownComponents.List,
  a: ({ ...props }) =>
    Link({
      href: props.href,
      children: props.children,
    }),
};
