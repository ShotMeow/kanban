import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from './';

describe('Button', () => {
  test('Rendered', () => {
    render(<Button>Test value</Button>);

    expect(screen.getByText('Test value')).toBeInTheDocument();
  });

  test('Onclick worked', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(<Button onClick={handleClick}>Test value</Button>);

    await user.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalled();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('Onclick not worked with disabled attribute', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(
      <Button onClick={handleClick} disabled>
        Test value
      </Button>
    );

    await user.click(screen.getByRole('button'));

    expect(handleClick).not.toHaveBeenCalled();
  });

  test('Spinner rendered if button disabled', () => {
    render(<Button disabled>Test value</Button>);

    const spinner = screen.getByLabelText('Spinner');

    expect(spinner).toBeInTheDocument();
  });
});
