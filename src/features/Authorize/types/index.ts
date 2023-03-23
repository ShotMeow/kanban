import { type UserCredential, type User } from 'firebase/auth';

type TLoginWithEmailAndPasswordResult = UserCredential;

export interface TAuthContext {
  isAuthenticated: boolean | null;
  user?: User;
  loginWithEmailAndPassword: (
    email: string,
    password: string,
    rememberMe?: boolean
  ) => Promise<TLoginWithEmailAndPasswordResult>;
  registerUserWithEmailAndPassword: (email: string, password: string) => Promise<void>;
  loginWithOauthPopup: (provider: string, rememberMe?: boolean) => Promise<TLoginWithEmailAndPasswordResult>;
  sendPasswordReset: (email: string) => Promise<void>;
  logout: () => void;
}
