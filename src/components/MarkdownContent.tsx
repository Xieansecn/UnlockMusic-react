import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import MarkdownContentClass from './MarkdownContent.module.scss';

export function MarkdownContent({ children }: { children: string }) {
  return (
    <div className={MarkdownContentClass.markdown}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  );
}
