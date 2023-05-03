import { render, screen } from '@testing-library/react';
import { TextArea } from '@/shared/ui';

describe('TextArea', () => {
  test('Rendered', () => {
    render(<TextArea />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('Title shown', () => {
    const title = 'testTextAreaTitle';

    render(<TextArea title={title} />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByText(title)).toBeInTheDocument();
  });
});
