import React, { createContext, useContext, useState, useEffect } from 'react';
import { petService } from '../services/petService';
import { useAuth } from './AuthContext';

const PetContext = createContext();

export const usePets = () => {
  const context = useContext(PetContext);
  if (!context) {
    throw new Error('usePets must be used within a PetProvider');
  }
  return context;
};

export const PetProvider = ({ children }) => {
  const { user } = useAuth();
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      fetchPets();
    } else {
      setPets([]);
      setSelectedPet(null);
    }
  }, [user]);

  const fetchPets = async () => {
    try {
      setLoading(true);
      setError(null);
      const userPets = await petService.getUserPets();
      setPets(userPets);
      
      // Auto-select first pet if none selected
      if (userPets.length > 0 && !selectedPet) {
        setSelectedPet(userPets[0]);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch pets');
      console.error('Error fetching pets:', err);
    } finally {
      setLoading(false);
    }
  };

  const addPet = async (petData) => {
    try {
      setError(null);
      const newPet = await petService.createPet(petData);
      setPets(prev => [...prev, newPet]);
      
      // Auto-select the new pet if it's the first one
      if (pets.length === 0) {
        setSelectedPet(newPet);
      }
      
      return newPet;
    } catch (err) {
      setError(err.message || 'Failed to add pet');
      throw err;
    }
  };

  const updatePet = async (petId, petData) => {
    try {
      setError(null);
      const updatedPet = await petService.updatePet(petId, petData);
      
      setPets(prev => 
        prev.map(pet => pet.id === petId ? updatedPet : pet)
      );
      
      // Update selected pet if it's the one being updated
      if (selectedPet && selectedPet.id === petId) {
        setSelectedPet(updatedPet);
      }
      
      return updatedPet;
    } catch (err) {
      setError(err.message || 'Failed to update pet');
      throw err;
    }
  };

  const deletePet = async (petId) => {
    try {
      setError(null);
      await petService.deletePet(petId);
      
      setPets(prev => prev.filter(pet => pet.id !== petId));
      
      // Clear selected pet if it's the one being deleted
      if (selectedPet && selectedPet.id === petId) {
        const remainingPets = pets.filter(pet => pet.id !== petId);
        setSelectedPet(remainingPets.length > 0 ? remainingPets[0] : null);
      }
    } catch (err) {
      setError(err.message || 'Failed to delete pet');
      throw err;
    }
  };

  const getPetById = async (petId) => {
    try {
      setError(null);
      const pet = await petService.getPetById(petId);
      return pet;
    } catch (err) {
      setError(err.message || 'Failed to fetch pet details');
      throw err;
    }
  };

  const uploadPetPhoto = async (petId, photoFile) => {
    try {
      setError(null);
      const photoUrl = await petService.uploadPetPhoto(petId, photoFile);
      
      // Update the pet's photo in the state
      setPets(prev => 
        prev.map(pet => 
          pet.id === petId ? { ...pet, photo: photoUrl } : pet
        )
      );
      
      // Update selected pet if it's the one being updated
      if (selectedPet && selectedPet.id === petId) {
        setSelectedPet(prev => ({ ...prev, photo: photoUrl }));
      }
      
      return photoUrl;
    } catch (err) {
      setError(err.message || 'Failed to upload photo');
      throw err;
    }
  };

  const value = {
    pets,
    selectedPet,
    setSelectedPet,
    loading,
    error,
    fetchPets,
    addPet,
    updatePet,
    deletePet,
    getPetById,
    uploadPetPhoto
  };

  return (
    <PetContext.Provider value={value}>
      {children}
    </PetContext.Provider>
  );
};
