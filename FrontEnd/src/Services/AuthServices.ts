// src/services/authService.ts
import { LoginCredentials, LoginResponse } from '../Types/auth';


export class AuthService {
  private static API_URL = 'http://localhost:8000';

  static async login(credentials: LoginCredentials): Promise<LoginResponse> {
    if (!credentials.email || !credentials.password) {
      throw new Error('Email e senha são obrigatórios');
    }

    try {
      // Chamada ao endpoint de login do backend
      const response = await fetch(`${this.API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          username: credentials.email, // substituímos "email" por "username"
          password: credentials.password
        })
      });

      if (!response.ok) {
        throw new Error('Credenciais inválidas');
      }

      const data = await response.json();
      return {
        token: data.token_de_acesso,
        user: {
          id: data.user_id,  // Supondo que o backend retorna "user_id" no futuro, caso necessário
          email: credentials.email,
          name: data.name || 'Usuário',
          role: data.role || 'user'
        }
      };
    } catch (error) {
      console.error('Erro de login no AuthService:', error);
      throw error;
    }
  }

  static async validateToken(token: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.API_URL}/users/1`, { // Pode ser outra rota protegida de teste
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.ok; // Retorna true se o token é válido
    } catch (error) {
      console.error('Erro ao validar token:', error);
      return false;
    }
  }
}
