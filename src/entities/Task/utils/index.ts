const placeholders = [
  'Warm up the milk',
  'Get coffee from the nightstand',
  'Make coffee',
  'Drink coffee',
  'Enjoy life',
  '...',
];

export const getRandomPlaceholder = (inputIndex: number): string => {
  switch (inputIndex) {
    case 0:
      return placeholders[0];
    case 1:
      return placeholders[1];
    case 2:
      return placeholders[2];
    case 3:
      return placeholders[3];
    case 4:
      return placeholders[4];
    default:
      return placeholders[5];
  }
};
