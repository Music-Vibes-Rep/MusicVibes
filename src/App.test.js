import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the main heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/My Vibe My Music/i);
  expect(headingElement).toBeInTheDocument();
});
