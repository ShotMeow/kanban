import { render, screen } from '@testing-library/react';
import { Switch } from '@/shared/ui';

describe('Switch', () => {
  test('Rendered', () => {
    const isActive = true;

    render(<Switch isActive={isActive} />);

    expect(screen.getByRole('switch')).toBeInTheDocument();
  });
});
