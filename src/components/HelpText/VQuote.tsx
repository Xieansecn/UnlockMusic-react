import { chakra, css } from '@chakra-ui/react';

const cssUnselectable = css({ pointerEvents: 'none', userSelect: 'none' });

export function VQuote({ children }: { children: React.ReactNode }) {
  return (
    <>
      <chakra.span css={cssUnselectable}>「</chakra.span>
      {children}
      <chakra.span css={cssUnselectable}>」</chakra.span>
    </>
  );
}
