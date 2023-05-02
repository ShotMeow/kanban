import { initializeAPI } from '@/shared/libs/firebase';

describe('initializeAPI', () => {
  it('should initialize Firebase App', () => {
    const firebaseApp = initializeAPI();
    expect(firebaseApp).toBeDefined();
  });

  it('should have correct Firebase app configuration', () => {
    const firebaseApp = initializeAPI();
    const { options } = firebaseApp;
    expect(options.apiKey).toBe('AIzaSyDiW66AtubqOlBelvfKfuxb5pkcQCCBNr0');
    expect(options.authDomain).toBe('kanban-d9b79.firebaseapp.com');
    expect(options.projectId).toBe('kanban-d9b79');
    expect(options.storageBucket).toBe('kanban-d9b79.appspot.com');
    expect(options.messagingSenderId).toBe('634127650141');
    expect(options.appId).toBe('1:634127650141:web:1e87f64570887cfb046cb4');
  });
});
