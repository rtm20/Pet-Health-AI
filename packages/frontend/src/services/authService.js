import { apiService } from './apiService';

class AuthService {
  async login(email, password) {
    const response = await apiService.post('/auth/login', {
      email,
      password
    });
    return response;
  }

  async register(userData) {
    const response = await apiService.post('/auth/register', userData);
    return response;
  }

  async logout() {
    try {
      await apiService.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  async verifyToken(token) {
    const response = await apiService.get('/auth/verify');
    return response.user;
  }

  async updateProfile(profileData) {
    const response = await apiService.put('/users/profile', profileData);
    return response.user;
  }

  async changePassword(currentPassword, newPassword) {
    const response = await apiService.post('/auth/change-password', {
      currentPassword,
      newPassword
    });
    return response;
  }

  async forgotPassword(email) {
    const response = await apiService.post('/auth/forgot-password', {
      email
    });
    return response;
  }

  async resetPassword(token, newPassword) {
    const response = await apiService.post('/auth/reset-password', {
      token,
      newPassword
    });
    return response;
  }

  async refreshToken() {
    const response = await apiService.post('/auth/refresh');
    return response;
  }
}

export const authService = new AuthService();
