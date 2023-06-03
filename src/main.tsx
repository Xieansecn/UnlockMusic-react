import ReactDOM from 'react-dom/client';

import { setupStore } from './store';
import { Loader } from './Loader';

// Private to this file only.
const store = setupStore();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<Loader store={store} />);
