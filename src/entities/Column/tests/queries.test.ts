import { columnApi } from '../queries';

describe('columnApi', () => {
  it('Should inject endpoints', () => {
    expect(columnApi).toBeDefined();
  });

  it('Should have getColumns endpoint', () => {
    expect(columnApi.endpoints.getColumns).toBeDefined();
  });

  it('Should have addColumn endpoint', () => {
    expect(columnApi.endpoints.addColumn).toBeDefined();
  });

  it('Should have changeColumn endpoint', () => {
    expect(columnApi.endpoints.changeColumn).toBeDefined();
  });

  it('Should have deleteColumn endpoint', () => {
    expect(columnApi.endpoints.deleteColumn).toBeDefined();
  });
});
