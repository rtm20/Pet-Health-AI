import axios from 'axios';
import { apiService } from './apiService';

const API_BASE_URL = 'http://localhost:8000/api/v1';

class HealthService {
  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Accept': 'application/json',
      },
    });
  }
  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Accept': 'application/json',
      },
    });
  }

  async analyzeHealth(image, petId, analysisType = 'general') {
    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('pet_id', petId);
      formData.append('analysis_type', analysisType);

      const response = await this.api.post('/health/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error analyzing pet health:', error);
      throw error;
    }
  }

  async getAnalysisTypes() {
    try {
      const response = await this.api.get('/health/analysis-types');
      return response.data.analysis_types;
    } catch (error) {
      console.error('Error fetching analysis types:', error);
      throw error;
    }
  }

  async getAnalysisHistory(petId) {
    try {
      const response = await this.api.get(`/health/history/${petId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching analysis history:', error);
      throw error;
    }
  }
}

export const healthService = new HealthService();
