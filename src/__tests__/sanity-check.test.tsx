import App from '~/App';
import { renderWithProviders, screen } from '~/test-utils/test-helper';

test('should be able to render App', () => {
  renderWithProviders(<App />);

  // Quick sanity check of known strings.
  expect(screen.getByText(/仅在浏览器内对文件进行解锁/i)).toBeInTheDocument();
  expect(screen.getByText(/UnlockMusic 团队/i)).toBeInTheDocument();
});
