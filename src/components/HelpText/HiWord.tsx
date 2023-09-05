import { Mark } from '@chakra-ui/react';

export function HiWord({ children }: { children: React.ReactNode }) {
  return (
    <Mark bg="orange.100" borderRadius={5} px={2} mx={1}>
      {children}
    </Mark>
  );
}
