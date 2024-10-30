// src/services/authService.ts
import { LoginCredentials, LoginResponse } from '../Types/auth';

export class AuthService {
  private static API_URL = 'sua-api-url/auth';

  static async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      // Em produção, isso seria uma chamada real à API
      const isAdmin = credentials.email.includes('admin');
      
      if (!credentials.email || !credentials.password) {
        throw new Error('Email e senha são obrigatórios');
      }

      // Simulação de delay de rede
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockResponse: LoginResponse = {
        token: 'mock-jwt-token-' + Date.now(),
        user: {
          id: isAdmin ? 'admin-1' : 'user-1',
          email: credentials.email,
          name: isAdmin ? 'Admin User' : 'Regular User',
          role: isAdmin ? 'admin' : 'user',
        },
      };

      return mockResponse;
    } catch (error) {
      console.error('Auth service login error:', error);
      throw error;
    }
  }

  static validateToken(token: string): boolean {
    // Em produção, isso verificaria a validade do JWT
    return token.startsWith('mock-jwt-token-');
  }
}
