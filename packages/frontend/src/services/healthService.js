import { apiService } from './apiService';

class HealthService {
  async analyzePhoto(petId, photoFile, symptoms = []) {
    const response = await apiService.uploadFile(
      `/health/analyze`,
      photoFile,
      {
        petId,
        symptoms: JSON.stringify(symptoms)
      }
    );
    return response.analysis;
  }

  async getHealthAnalyses(petId) {
    const response = await apiService.get(`/health/analyses?petId=${petId}`);
    return response.analyses;
  }

  async getAnalysisById(analysisId) {
    const response = await apiService.get(`/health/analyses/${analysisId}`);
    return response.analysis;
  }

  async updateAnalysis(analysisId, updateData) {
    const response = await apiService.put(`/health/analyses/${analysisId}`, updateData);
    return response.analysis;
  }

  async deleteAnalysis(analysisId) {
    const response = await apiService.delete(`/health/analyses/${analysisId}`);
    return response;
  }

  // Vet Records
  async createVetRecord(petId, recordData) {
    const response = await apiService.post(`/health/vet-records`, {
      petId,
      ...recordData
    });
    return response.record;
  }

  async getVetRecords(petId) {
    const response = await apiService.get(`/health/vet-records?petId=${petId}`);
    return response.records;
  }

  async getVetRecordById(recordId) {
    const response = await apiService.get(`/health/vet-records/${recordId}`);
    return response.record;
  }

  async updateVetRecord(recordId, recordData) {
    const response = await apiService.put(`/health/vet-records/${recordId}`, recordData);
    return response.record;
  }

  async deleteVetRecord(recordId) {
    const response = await apiService.delete(`/health/vet-records/${recordId}`);
    return response;
  }

  // Vaccinations
  async createVaccination(petId, vaccinationData) {
    const response = await apiService.post(`/health/vaccinations`, {
      petId,
      ...vaccinationData
    });
    return response.vaccination;
  }

  async getVaccinations(petId) {
    const response = await apiService.get(`/health/vaccinations?petId=${petId}`);
    return response.vaccinations;
  }

  async updateVaccination(vaccinationId, vaccinationData) {
    const response = await apiService.put(`/health/vaccinations/${vaccinationId}`, vaccinationData);
    return response.vaccination;
  }

  async deleteVaccination(vaccinationId) {
    const response = await apiService.delete(`/health/vaccinations/${vaccinationId}`);
    return response;
  }

  // Health Insights and Analytics
  async getHealthInsights(petId) {
    const response = await apiService.get(`/health/insights/${petId}`);
    return response.insights;
  }

  async getHealthTrends(petId, timeRange = '6months') {
    const response = await apiService.get(`/health/trends/${petId}?range=${timeRange}`);
    return response.trends;
  }

  async generateHealthReport(petId, dateRange) {
    const response = await apiService.post(`/health/reports/generate`, {
      petId,
      dateRange
    });
    return response.report;
  }

  async getHealthReports(petId) {
    const response = await apiService.get(`/health/reports?petId=${petId}`);
    return response.reports;
  }

  // Symptoms and Conditions
  async getCommonSymptoms() {
    const response = await apiService.get('/health/symptoms');
    return response.symptoms;
  }

  async getConditionInfo(conditionName) {
    const response = await apiService.get(`/health/conditions/${conditionName}`);
    return response.condition;
  }

  async searchConditions(query) {
    const response = await apiService.get(`/health/conditions/search?q=${encodeURIComponent(query)}`);
    return response.conditions;
  }

  // Emergency and Alerts
  async checkEmergencySymptoms(petId, symptoms) {
    const response = await apiService.post('/health/emergency-check', {
      petId,
      symptoms
    });
    return response.assessment;
  }

  async getHealthAlerts(petId) {
    const response = await apiService.get(`/health/alerts/${petId}`);
    return response.alerts;
  }

  async markAlertAsRead(alertId) {
    const response = await apiService.put(`/health/alerts/${alertId}/read`);
    return response;
  }

  // AI Model Feedback
  async submitFeedback(analysisId, feedback) {
    const response = await apiService.post(`/health/feedback`, {
      analysisId,
      feedback
    });
    return response;
  }
}

export const healthService = new HealthService();
