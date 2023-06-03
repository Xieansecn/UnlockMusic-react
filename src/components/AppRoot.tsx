import { useEffect } from 'react';
import App from './App';

import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { theme } from '~/theme';
import { persistSettings } from '~/features/settings/persistSettings';
import { setupStore } from '~/store';

// Private to this file only.
const store = setupStore();

export function AppRoot() {
  useEffect(() => persistSettings(store), []);

  return (
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ChakraProvider>
  );
}
