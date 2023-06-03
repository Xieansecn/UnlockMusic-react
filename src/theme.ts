import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  fonts: {
    body: [
      '-system-ui,-apple-system,BlinkMacSystemFont',
      'Source Han Sans CN,Noto Sans CJK SC',
      'Segoe UI,Helvetica,Arial,sans-serif',
      'Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',
    ].join(','),
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'normal',
      },
      defaultProps: {
        colorScheme: 'teal',
      },
    },
  },
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
