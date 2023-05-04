import { render, screen } from '@testing-library/react';
import { OtherButton } from './';
import userEvent from '@testing-library/user-event';

describe('OtherButton', () => {
  test('Rendered', () => {
    render(<OtherButton />);

    expect(screen.getByLabelText('Open other content popup')).toBeInTheDocument();
  });

  test('Onclick worked', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(<OtherButton onClick={handleClick} />);

    await user.click(screen.getByLabelText('Open other content popup'));

    expect(handleClick).toHaveBeenCalled();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
