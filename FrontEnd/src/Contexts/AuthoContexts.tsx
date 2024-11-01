// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType, AuthState, LoginCredentials, User, UserRole } from '../Types/auth';
import { AuthService } from '../Services/AuthServices';

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>(initialState);
  const [tokenIsValid, setTokenIsValid] = useState<boolean>(false);

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      try {
        const user = JSON.parse(userData) as User;
        const isValid = await AuthService.validateToken(token);

        if (!isValid) {
          throw new Error('Token inválido');
        }

        setState({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
        });
        setTokenIsValid(true);
      } catch (error) {
        console.error('Erro ao inicializar a autenticação:', error);
        logout();
      }
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const login = async (credentials: LoginCredentials): Promise<UserRole> => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      const { token, user } = await AuthService.login(credentials);
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      setState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      });
      setTokenIsValid(true);

      return user.role;
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setState({
      ...initialState,
      isLoading: false,
    });
    setTokenIsValid(false);
  };

  const isTokenValid = (): boolean => {
    return tokenIsValid;
  };

  const isAdmin = (): boolean => {
    return state.user?.role === 'admin';
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, isTokenValid, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
