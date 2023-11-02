import type { AnchorHTMLAttributes } from 'react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Link } from '@chakra-ui/react';

export function ExtLink({ children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <Link isExternal {...props} rel="noreferrer noopener nofollow">
      {children}
      <ExternalLinkIcon />
    </Link>
  );
}
