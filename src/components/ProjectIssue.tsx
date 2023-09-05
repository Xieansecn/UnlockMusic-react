export interface ProjectIssueProps {
  id: number | string;
  title?: string;
}

export function ProjectIssue({ id, title }: ProjectIssueProps) {
  return (
    <a
      rel="noopener noreferrer nofollow"
      target="_blank"
      href={`https://git.unlock-music.dev/um/um-react/issues/${id}`}
    >
      {`#${id}`}
      {title && ` - ${title}`}
    </a>
  );
}
