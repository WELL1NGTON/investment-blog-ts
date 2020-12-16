import React from 'react';
import unified from 'unified';
import remarkParse from 'remark-parse';
// import from './styles';

interface MarkdownAsReactProps {
  value: string;
}

const MarkdownToReact: React.FC<MarkdownAsReactProps> = ({
  value,
}: MarkdownAsReactProps) => {
  const transformMarkdownToReact = (md: string): React.ReactElement | null => {
    const reactElement = unified()
      .use(remarkParse)
      // .use(require('remark-attr')) //This is too good, it need to be fixed
      // .use(require('remark-breaks')) //check if Ian wants this plugin
      .use(require('remark-slug'))
      .use(require('remark-toc'))
      .use(require('remark-unwrap-images'))
      .use(require('remark-emoji')) //useless, but check if Ian wants this
      .use(require('remark-external-links'), {
        target: '_blank',
        rel: ['nofollow', 'noopener', 'noreferrer'],
      })
      .use(require('remark-footnotes'), {
        inlineNotes: true,
        innerHTML: true,
      })
      // .use(require('remark-collapse'))
      .use(require('remark-rehype'), { allowDangerousHtml: true })
      .use(require('rehype-raw'))
      // .use(require('rehype-sanitize')) //good to have but breaks the page to be moved to links (#something-link)
      .use(require('rehype-react'), {
        createElement: React.createElement,
        Fragment: React.Fragment,
        // components: {
        //   a: MyLink,
        //   p: MyParagraph
        // }
      })
      .processSync(md).result as React.ReactElement;

    //also remark-fenced-divs and remark-directive could help

    return React.isValidElement(reactElement) ? reactElement : null;
  };

  return <>{transformMarkdownToReact(value)}</>;
};

export default MarkdownToReact;
