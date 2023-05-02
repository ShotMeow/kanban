import { taskApi } from '../queries';

describe('taskApi', () => {
  it('Should inject endpoints', () => {
    expect(taskApi).toBeDefined();
  });

  it('Should have getTasks endpoint', () => {
    expect(taskApi.endpoints.getTasks).toBeDefined();
  });

  it('Should have moveTask endpoint', () => {
    expect(taskApi.endpoints.moveTask).toBeDefined();
  });

  it('Should have addTask endpoint', () => {
    expect(taskApi.endpoints.addTask).toBeDefined();
  });

  it('Should have changeTask endpoint', () => {
    expect(taskApi.endpoints.changeTask).toBeDefined();
  });

  it('Should have deleteTask endpoint', () => {
    expect(taskApi.endpoints.deleteTask).toBeDefined();
  });
});
