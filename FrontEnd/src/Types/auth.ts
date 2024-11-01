// src/types/auth.ts
export type UserRole = 'admin' | 'user';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface AuthContextType {
  login: (credentials: LoginCredentials) => Promise<UserRole>;
  logout: () => void;
  isTokenValid: () => boolean;
  isAdmin: () => boolean;
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
