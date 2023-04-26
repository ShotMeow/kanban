import { getRandomPlaceholder, placeholders } from '../';

describe('Get random placeholder', () => {
  test('Current value', () => {
    expect(getRandomPlaceholder(0)).toBe(placeholders[0]);
  });

  test('Other value', () => {
    expect(getRandomPlaceholder(10)).toBe(placeholders[5]);
  });

  test('Negative value', () => {
    expect(getRandomPlaceholder(-10)).toBe(placeholders[5]);
  });
});
