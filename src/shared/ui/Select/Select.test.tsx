import { render, screen } from '@testing-library/react';
import { Select } from '@/shared/ui';
import { type ColumnType } from '@/entities/Column';

describe('Select', () => {
  test('Rendered', () => {
    const title = 'testSelectTitle';
    const options: ColumnType[] = [
      {
        id: '1',
        title: 'testTitle1',
        color: '#FFF',
      },
      {
        id: '2',
        title: 'testTitle2',
        color: '#000',
      },
    ];
    const setCurrentValue = jest.fn();

    render(
      <Select title={title} options={options} currentValue={options[0].title} setCurrentValue={setCurrentValue} />
    );

    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
  });
});
