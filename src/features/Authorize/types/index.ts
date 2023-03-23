import { type UserCredential, type User } from 'firebase/auth';

export interface TAuthContext {
  isAuthenticated: boolean | null;
  user?: User;
  loginWithEmailAndPassword: (email: string, password: string, rememberMe?: boolean) => Promise<UserCredential>;
  registerUserWithEmailAndPassword: (email: string, password: string) => Promise<void>;
  loginWithOauthPopup: (provider: string, rememberMe?: boolean) => Promise<UserCredential>;
  sendPasswordReset: (email: string) => Promise<void>;
  logout: () => void;
}
