import { render, screen } from '@testing-library/react';
import { OtherButton } from '@/shared/ui';

describe('OtherButton', () => {
  test('Rendered', () => {
    render(<OtherButton />);

    expect(screen.getByLabelText('Open other content popup')).toBeInTheDocument();
  });
});
