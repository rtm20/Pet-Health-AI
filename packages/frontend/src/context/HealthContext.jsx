import React, { createContext, useContext, useState } from 'react';
import { healthService } from '../services/healthService';
import { usePets } from './PetContext';

const HealthContext = createContext();

export const useHealth = () => {
  const context = useContext(HealthContext);
  if (!context) {
    throw new Error('useHealth must be used within a HealthProvider');
  }
  return context;
};

export const HealthProvider = ({ children }) => {
  const { selectedPet } = usePets();
  const [analyses, setAnalyses] = useState([]);
  const [vetRecords, setVetRecords] = useState([]);
  const [vaccinations, setVaccinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyzePhoto = async (petId, photoFile, symptoms = []) => {
    try {
      setLoading(true);
      setError(null);
      
      const analysis = await healthService.analyzePhoto(petId, photoFile, symptoms);
      setAnalyses(prev => [analysis, ...prev]);
      
      return analysis;
    } catch (err) {
      setError(err.message || 'Failed to analyze photo');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getHealthAnalyses = async (petId) => {
    try {
      setLoading(true);
      setError(null);
      
      const petAnalyses = await healthService.getHealthAnalyses(petId);
      setAnalyses(petAnalyses);
      
      return petAnalyses;
    } catch (err) {
      setError(err.message || 'Failed to fetch health analyses');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const addVetRecord = async (petId, recordData) => {
    try {
      setError(null);
      
      const newRecord = await healthService.createVetRecord(petId, recordData);
      setVetRecords(prev => [newRecord, ...prev]);
      
      return newRecord;
    } catch (err) {
      setError(err.message || 'Failed to add vet record');
      throw err;
    }
  };

  const getVetRecords = async (petId) => {
    try {
      setLoading(true);
      setError(null);
      
      const records = await healthService.getVetRecords(petId);
      setVetRecords(records);
      
      return records;
    } catch (err) {
      setError(err.message || 'Failed to fetch vet records');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateVetRecord = async (recordId, recordData) => {
    try {
      setError(null);
      
      const updatedRecord = await healthService.updateVetRecord(recordId, recordData);
      setVetRecords(prev => 
        prev.map(record => record.id === recordId ? updatedRecord : record)
      );
      
      return updatedRecord;
    } catch (err) {
      setError(err.message || 'Failed to update vet record');
      throw err;
    }
  };

  const deleteVetRecord = async (recordId) => {
    try {
      setError(null);
      
      await healthService.deleteVetRecord(recordId);
      setVetRecords(prev => prev.filter(record => record.id !== recordId));
    } catch (err) {
      setError(err.message || 'Failed to delete vet record');
      throw err;
    }
  };

  const addVaccination = async (petId, vaccinationData) => {
    try {
      setError(null);
      
      const newVaccination = await healthService.createVaccination(petId, vaccinationData);
      setVaccinations(prev => [newVaccination, ...prev]);
      
      return newVaccination;
    } catch (err) {
      setError(err.message || 'Failed to add vaccination record');
      throw err;
    }
  };

  const getVaccinations = async (petId) => {
    try {
      setLoading(true);
      setError(null);
      
      const petVaccinations = await healthService.getVaccinations(petId);
      setVaccinations(petVaccinations);
      
      return petVaccinations;
    } catch (err) {
      setError(err.message || 'Failed to fetch vaccination records');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getHealthInsights = async (petId) => {
    try {
      setLoading(true);
      setError(null);
      
      const insights = await healthService.getHealthInsights(petId);
      return insights;
    } catch (err) {
      setError(err.message || 'Failed to fetch health insights');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const generateHealthReport = async (petId, dateRange) => {
    try {
      setLoading(true);
      setError(null);
      
      const report = await healthService.generateHealthReport(petId, dateRange);
      return report;
    } catch (err) {
      setError(err.message || 'Failed to generate health report');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    analyses,
    vetRecords,
    vaccinations,
    loading,
    error,
    analyzePhoto,
    getHealthAnalyses,
    addVetRecord,
    getVetRecords,
    updateVetRecord,
    deleteVetRecord,
    addVaccination,
    getVaccinations,
    getHealthInsights,
    generateHealthReport
  };

  return (
    <HealthContext.Provider value={value}>
      {children}
    </HealthContext.Provider>
  );
};
