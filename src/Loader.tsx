import React, { useEffect } from 'react';
import App from './App';

import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { theme } from './theme';
import { persistSettings } from './features/settings/persistSettings';
import type { AppStore } from './store';

export function Loader({ store }: { store: AppStore }) {
  useEffect(() => {
    return persistSettings(store);
  }, [store]);

  return (
    <React.StrictMode>
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          <App />
        </Provider>
      </ChakraProvider>
    </React.StrictMode>
  );
}
