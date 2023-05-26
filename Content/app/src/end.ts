import fs from 'fs';

const action = async () => {
  const markdown = fs.readFileSync('generated/ModuleMarkdown.ts', 'utf8');
  fs.writeFileSync(
    '../../Dashboard/src/content/generated-markdown.ts',
    markdown,
    'utf8',
  );
};

void action();
