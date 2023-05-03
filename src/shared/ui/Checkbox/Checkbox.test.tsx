import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Checkbox } from './';

describe('Checkbox', () => {
  test('Rendered', () => {
    const isActive = true;
    const setIsActive = jest.fn();

    render(<Checkbox isActive={isActive} setIsActive={setIsActive} />);

    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  test('Have title', () => {
    const isActive = true;
    const setIsActive = jest.fn();
    const title = 'testCheckboxTitle';

    render(<Checkbox isActive={isActive} setIsActive={setIsActive} title={title} />);

    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  test('Onclick not worked with disabled attribute', async () => {
    const user = userEvent.setup();
    const isActive = true;
    const setIsActive = jest.fn();

    render(<Checkbox isActive={isActive} setIsActive={setIsActive} disabled />);

    await user.click(screen.getByRole('checkbox'));

    expect(setIsActive).not.toHaveBeenCalled();
  });

  test('Spinner rendered if checkbox disabled', () => {
    const isActive = true;
    const setIsActive = jest.fn();

    render(<Checkbox isActive={isActive} setIsActive={setIsActive} disabled />);

    const spinner = screen.getByLabelText('Spinner');

    expect(spinner).toBeInTheDocument();
  });
});
