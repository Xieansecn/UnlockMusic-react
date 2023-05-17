import { render, screen } from '@testing-library/react';

test('hello', () => {
  render(<div>hello</div>);
  expect(screen.getByText('hello')).toBeInTheDocument();
});
