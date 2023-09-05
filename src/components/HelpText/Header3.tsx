import { Heading } from '@chakra-ui/react';
import React from 'react';

export interface Header3Props {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export function Header3({ children, className, id }: Header3Props) {
  return (
    <Heading
      as="h3"
      id={id}
      className={className}
      pt={3}
      pb={1}
      borderBottom={'1px solid'}
      borderColor="gray.300"
      color="gray.800"
      size="lg"
    >
      {children}
    </Heading>
  );
}
