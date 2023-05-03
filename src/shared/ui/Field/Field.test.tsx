import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Field } from './';

describe('Field', () => {
  test('Rendered', () => {
    render(<Field placeholder="field" />);

    expect(screen.getByPlaceholderText('field')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('field')).toHaveAttribute('type', 'text');
  });

  test('Have title', () => {
    const title = 'testFieldTitle';

    render(<Field title={title} placeholder="field" />);

    expect(screen.getByPlaceholderText('field')).toBeInTheDocument();
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  test('Shown Password Button visible if type field equal to password', () => {
    render(<Field type="password" placeholder="field" />);

    expect(screen.getByPlaceholderText('field')).toBeInTheDocument();
    expect(screen.getByLabelText('Shown password')).toBeInTheDocument();
  });

  test('Shown password button click', async () => {
    const user = userEvent.setup();
    render(<Field type="password" placeholder="field" />);

    await user.click(screen.getByLabelText('Shown password'));
    expect(screen.getByPlaceholderText('field')).toHaveAttribute('type', 'text');

    await user.click(screen.getByLabelText('Shown password'));
    expect(screen.getByPlaceholderText('field')).toHaveAttribute('type', 'password');
  });

  test('Input worked', async () => {
    const user = userEvent.setup();
    render(<Field placeholder="field" />);

    await user.type(screen.getByPlaceholderText('field'), 'test@mail.com');

    expect(screen.getByPlaceholderText('field')).toHaveValue('test@mail.com');
  });
});
