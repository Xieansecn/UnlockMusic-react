import { Heading } from '@chakra-ui/react';
import React from 'react';

export interface Header4Props {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export function Header4({ children, className, id }: Header4Props) {
  return (
    <Heading as="h4" id={id} className={className} pt={3} pb={1} color="gray.700" size="md">
      {children}
    </Heading>
  );
}
