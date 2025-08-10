import { apiService } from './apiService';

class PetService {
  async getUserPets() {
    const response = await apiService.get('/pets');
    return response.pets;
  }

  async getPetById(petId) {
    const response = await apiService.get(`/pets/${petId}`);
    return response.pet;
  }

  async createPet(petData) {
    const response = await apiService.post('/pets', petData);
    return response.pet;
  }

  async updatePet(petId, petData) {
    const response = await apiService.put(`/pets/${petId}`, petData);
    return response.pet;
  }

  async deletePet(petId) {
    const response = await apiService.delete(`/pets/${petId}`);
    return response;
  }

  async uploadPetPhoto(petId, photoFile) {
    const response = await apiService.uploadFile(
      `/pets/${petId}/photo`,
      photoFile
    );
    return response.photoUrl;
  }

  async getPetHealthSummary(petId) {
    const response = await apiService.get(`/pets/${petId}/health-summary`);
    return response.summary;
  }

  async getPetStats(petId) {
    const response = await apiService.get(`/pets/${petId}/stats`);
    return response.stats;
  }

  // Pet breed and species data
  async getBreedsBySpecies(species) {
    const response = await apiService.get(`/pets/breeds/${species}`);
    return response.breeds;
  }

  async getSpeciesList() {
    const response = await apiService.get('/pets/species');
    return response.species;
  }

  // Pet weight tracking
  async addWeightEntry(petId, weight, date = new Date()) {
    const response = await apiService.post(`/pets/${petId}/weight`, {
      weight,
      date: date.toISOString()
    });
    return response.entry;
  }

  async getWeightHistory(petId) {
    const response = await apiService.get(`/pets/${petId}/weight-history`);
    return response.weightHistory;
  }

  // Pet notes and observations
  async addNote(petId, note) {
    const response = await apiService.post(`/pets/${petId}/notes`, {
      note,
      date: new Date().toISOString()
    });
    return response.note;
  }

  async getNotes(petId) {
    const response = await apiService.get(`/pets/${petId}/notes`);
    return response.notes;
  }

  async deleteNote(petId, noteId) {
    const response = await apiService.delete(`/pets/${petId}/notes/${noteId}`);
    return response;
  }
}

export const petService = new PetService();
