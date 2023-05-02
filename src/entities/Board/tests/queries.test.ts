import { boardApi } from '../queries';

describe('boardApi', () => {
  it('Should inject endpoints', () => {
    expect(boardApi).toBeDefined();
  });

  it('Should have getBoards endpoint', () => {
    expect(boardApi.endpoints.getBoards).toBeDefined();
  });

  it('Should have getIcons endpoint', () => {
    expect(boardApi.endpoints.getIcons).toBeDefined();
  });

  it('Should have addBoard endpoint', () => {
    expect(boardApi.endpoints.addBoard).toBeDefined();
  });

  it('Should have changeBoard endpoint', () => {
    expect(boardApi.endpoints.changeBoard).toBeDefined();
  });

  it('Should have deleteBoard endpoint', () => {
    expect(boardApi.endpoints.deleteBoard).toBeDefined();
  });
});
