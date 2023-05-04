import { render, screen } from '@testing-library/react';
import { Logo } from './';
import { BrowserRouter } from 'react-router-dom';

describe('Logo', () => {
  test('Rendered', () => {
    render(
      <BrowserRouter>
        <Logo />
      </BrowserRouter>
    );

    expect(screen.getByLabelText('Logo')).toBeInTheDocument();
  });

  test('Have index url path', () => {
    render(
      <BrowserRouter>
        <Logo />
      </BrowserRouter>
    );

    expect(screen.getByLabelText('Logo')).toHaveAttribute('href', '/');
  });
});
