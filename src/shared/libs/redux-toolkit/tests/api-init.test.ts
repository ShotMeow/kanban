import { rtkApi } from '../api-init';

describe('rtkApi', () => {
  it('Should create an RTK API', () => {
    expect(rtkApi).toBeDefined();
  });

  it('Should have endpoints', () => {
    expect(rtkApi.endpoints).toBeDefined();
  });
});
