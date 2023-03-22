import { type UserCredential } from 'firebase/auth';

type TLoginWithEmailAndPasswordResult = UserCredential;

export interface TAuthContext {
  isAuthenticated: boolean | null;
  user?: any;
  loginWithEmailAndPassword: (email: string, password: string) => Promise<TLoginWithEmailAndPasswordResult>;
  registerUserWithEmailAndPassword: (email: string, password: string) => Promise<TLoginWithEmailAndPasswordResult>;
  loginWithOauthPopup: (provider: string) => Promise<TLoginWithEmailAndPasswordResult>;
  logout: () => void;
}
