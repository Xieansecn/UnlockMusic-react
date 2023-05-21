import { renderWithProviders, screen, waitFor } from '~/test-utils/test-helper';
import App from '~/App';

vi.mock('../decrypt-worker/client', () => {
  return {
    workerClientBus: {
      request: vi.fn().mockResolvedValue('dummy'),
    },
  };
});

test('should be able to render App', async () => {
  renderWithProviders(<App />);

  // Should eventually load sdk version
  await waitFor(() => screen.getByTestId('sdk-version'));

  // Quick sanity check of known strings.
  expect(screen.getByText(/仅在浏览器内对文件进行解锁/i)).toBeInTheDocument();
  expect(screen.getByText(/UnlockMusic 团队/i)).toBeInTheDocument();
});
