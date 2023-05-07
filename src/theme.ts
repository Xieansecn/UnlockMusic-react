import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        minHeight: '100vh',
      },
    },
  },
  sizes: {
    footer: {
      container: '7rem',
      content: '5rem',
    },
  },
});
