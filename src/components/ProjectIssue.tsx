import { Link } from '@chakra-ui/react';

export interface ProjectIssueProps {
  id: number | string;
  title?: string;
}

export function ProjectIssue({ id, title }: ProjectIssueProps) {
  return (
    <Link isExternal target="_blank" href={`https://git.unlock-music.dev/um/um-react/issues/${id}`}>
      {`#${id}`}
      {title && ` - ${title}`}
    </Link>
  );
}
