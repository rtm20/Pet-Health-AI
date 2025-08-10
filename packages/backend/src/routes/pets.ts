import express from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthenticatedRequest, authenticateToken } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Get user's pets
router.get('/', async (req: AuthenticatedRequest, res) => {
  try {
    const pets = await prisma.pet.findMany({
      where: {
        userId: req.user!.id,
        isActive: true
      },
      include: {
        healthAnalyses: {
          take: 5,
          orderBy: { createdAt: 'desc' }
        },
        vetRecords: {
          take: 3,
          orderBy: { visitDate: 'desc' }
        },
        vaccinations: {
          orderBy: { nextDueDate: 'asc' }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ 
      success: true,
      pets: pets.map(pet => ({
        ...pet,
        age: pet.birthDate ? calculateAge(pet.birthDate) : null
      }))
    });
  } catch (error) {
    console.error('Error fetching pets:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch pets' 
    });
  }
});

// Create new pet
router.post('/', async (req: AuthenticatedRequest, res) => {
  try {
    const { 
      name, 
      species, 
      breed, 
      age, 
      ageUnit, 
      gender, 
      weight, 
      weightUnit,
      color,
      microchipId,
      markings,
      medicalHistory,
      allergies,
      medications,
      vetInfo,
      emergencyContact,
      vaccinations,
      photos
    } = req.body;

    // Validate required fields
    if (!name || !species || !breed || !gender) {
      return res.status(400).json({ 
        success: false,
        error: 'Name, species, breed, and gender are required' 
      });
    }

    // Calculate birth date from age
    let birthDate = null;
    if (age && ageUnit) {
      const now = new Date();
      if (ageUnit === 'years') {
        birthDate = new Date(now.getFullYear() - parseFloat(age), now.getMonth(), now.getDate());
      } else if (ageUnit === 'months') {
        birthDate = new Date(now.getFullYear(), now.getMonth() - parseFloat(age), now.getDate());
      }
    }

    // Convert weight to kg if needed
    let weightInKg = weight ? parseFloat(weight) : null;
    if (weightInKg && weightUnit === 'lbs') {
      weightInKg = weightInKg * 0.453592; // Convert lbs to kg
    }

    // Create pet record
    const pet = await prisma.pet.create({
      data: {
        userId: req.user!.id,
        name: name.trim(),
        species: species.toLowerCase(),
        breed: breed.trim(),
        birthDate,
        weight: weightInKg,
        gender,
        color: color?.trim(),
        microchipNumber: microchipId?.trim(),
        profileImageUrl: photos?.[0] || null, // Use first photo as profile
        notes: JSON.stringify({
          markings: markings?.trim(),
          medicalHistory: medicalHistory?.trim(),
          allergies: allergies?.trim(),
          medications: medications?.trim(),
          vetInfo: vetInfo || {},
          emergencyContact: emergencyContact || {},
          photos: photos || []
        })
      },
      include: {
        healthAnalyses: true,
        vetRecords: true,
        vaccinations: true
      }
    });

    // Create vaccination records if provided
    if (vaccinations && vaccinations.length > 0) {
      const validVaccinations = vaccinations.filter(
        (vac: any) => vac.date && vac.name
      );

      if (validVaccinations.length > 0) {
        await prisma.vaccination.createMany({
          data: validVaccinations.map((vac: any) => ({
            petId: pet.id,
            vaccineName: vac.name,
            dateAdministered: new Date(vac.date),
            nextDueDate: vac.nextDue ? new Date(vac.nextDue) : null,
            veterinarianName: vetInfo?.vetName || 'Unknown',
            clinicName: vetInfo?.clinicName || null,
            isCore: ['Rabies', 'DHPP', 'DHLPP'].includes(vac.name)
          }))
        });
      }
    }

    // Fetch complete pet data with relations
    const completePet = await prisma.pet.findUnique({
      where: { id: pet.id },
      include: {
        healthAnalyses: true,
        vetRecords: true,
        vaccinations: true
      }
    });

    res.status(201).json({ 
      success: true,
      pet: {
        ...completePet,
        age: completePet!.birthDate ? calculateAge(completePet!.birthDate) : null
      }
    });
  } catch (error) {
    console.error('Error creating pet:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to create pet' 
    });
  }
});

// Get specific pet
router.get('/:id', async (req: AuthenticatedRequest, res) => {
  try {
    const { id } = req.params;

    const pet = await prisma.pet.findFirst({
      where: {
        id,
        userId: req.user!.id,
        isActive: true
      },
      include: {
        healthAnalyses: {
          orderBy: { createdAt: 'desc' }
        },
        vetRecords: {
          orderBy: { visitDate: 'desc' }
        },
        vaccinations: {
          orderBy: { nextDueDate: 'asc' }
        }
      }
    });

    if (!pet) {
      return res.status(404).json({ 
        success: false,
        error: 'Pet not found' 
      });
    }

    res.json({ 
      success: true,
      pet: {
        ...pet,
        age: pet.birthDate ? calculateAge(pet.birthDate) : null
      }
    });
  } catch (error) {
    console.error('Error fetching pet:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch pet' 
    });
  }
});

// Update pet
router.put('/:id', async (req: AuthenticatedRequest, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Check if pet exists and belongs to user
    const existingPet = await prisma.pet.findFirst({
      where: {
        id,
        userId: req.user!.id,
        isActive: true
      }
    });

    if (!existingPet) {
      return res.status(404).json({ 
        success: false,
        error: 'Pet not found' 
      });
    }

    // Process age to birth date if provided
    let birthDate = existingPet.birthDate;
    if (updateData.age && updateData.ageUnit) {
      const now = new Date();
      if (updateData.ageUnit === 'years') {
        birthDate = new Date(now.getFullYear() - parseFloat(updateData.age), now.getMonth(), now.getDate());
      } else if (updateData.ageUnit === 'months') {
        birthDate = new Date(now.getFullYear(), now.getMonth() - parseFloat(updateData.age), now.getDate());
      }
    }

    // Process weight conversion
    let weight = updateData.weight ? parseFloat(updateData.weight) : existingPet.weight;
    if (weight && updateData.weightUnit === 'lbs') {
      weight = weight * 0.453592;
    }

    const updatedPet = await prisma.pet.update({
      where: { id },
      data: {
        name: updateData.name?.trim() || existingPet.name,
        species: updateData.species?.toLowerCase() || existingPet.species,
        breed: updateData.breed?.trim() || existingPet.breed,
        birthDate,
        weight,
        gender: updateData.gender || existingPet.gender,
        color: updateData.color?.trim() || existingPet.color,
        microchipNumber: updateData.microchipId?.trim() || existingPet.microchipNumber,
        profileImageUrl: updateData.profileImage || existingPet.profileImageUrl,
        notes: updateData.notes || existingPet.notes,
        updatedAt: new Date()
      },
      include: {
        healthAnalyses: true,
        vetRecords: true,
        vaccinations: true
      }
    });

    res.json({ 
      success: true,
      pet: {
        ...updatedPet,
        age: updatedPet.birthDate ? calculateAge(updatedPet.birthDate) : null
      }
    });
  } catch (error) {
    console.error('Error updating pet:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to update pet' 
    });
  }
});

// Delete pet (soft delete)
router.delete('/:id', async (req: AuthenticatedRequest, res) => {
  try {
    const { id } = req.params;

    // Check if pet exists and belongs to user
    const existingPet = await prisma.pet.findFirst({
      where: {
        id,
        userId: req.user!.id,
        isActive: true
      }
    });

    if (!existingPet) {
      return res.status(404).json({ 
        success: false,
        error: 'Pet not found' 
      });
    }

    // Soft delete the pet
    await prisma.pet.update({
      where: { id },
      data: {
        isActive: false,
        updatedAt: new Date()
      }
    });

    res.json({ 
      success: true,
      message: 'Pet deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting pet:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to delete pet' 
    });
  }
});

// Get pet health summary
router.get('/:id/health-summary', async (req: AuthenticatedRequest, res) => {
  try {
    const { id } = req.params;

    const pet = await prisma.pet.findFirst({
      where: {
        id,
        userId: req.user!.id,
        isActive: true
      },
      include: {
        healthAnalyses: {
          orderBy: { createdAt: 'desc' },
          take: 10
        },
        vaccinations: {
          orderBy: { nextDueDate: 'asc' }
        }
      }
    });

    if (!pet) {
      return res.status(404).json({ 
        success: false,
        error: 'Pet not found' 
      });
    }

    // Calculate health summary
    const recentAnalyses = pet.healthAnalyses.slice(0, 5);
    const overallHealthScore = recentAnalyses.length > 0 
      ? recentAnalyses.reduce((sum, analysis) => sum + analysis.confidenceScore, 0) / recentAnalyses.length
      : 0;

    const upcomingVaccinations = pet.vaccinations.filter(vac => 
      vac.nextDueDate && vac.nextDueDate > new Date()
    ).slice(0, 3);

    const overdueVaccinations = pet.vaccinations.filter(vac => 
      vac.nextDueDate && vac.nextDueDate < new Date()
    );

    res.json({
      success: true,
      summary: {
        overallHealthScore,
        recentAnalysesCount: recentAnalyses.length,
        lastAnalysisDate: recentAnalyses[0]?.createdAt || null,
        upcomingVaccinations,
        overdueVaccinations,
        healthTrend: calculateHealthTrend(recentAnalyses)
      }
    });
  } catch (error) {
    console.error('Error fetching health summary:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch health summary' 
    });
  }
});

// Helper functions
function calculateAge(birthDate: Date): { years: number; months: number } {
  const now = new Date();
  const birth = new Date(birthDate);
  
  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  
  if (months < 0) {
    years--;
    months += 12;
  }
  
  return { years, months };
}

function calculateHealthTrend(analyses: any[]): 'improving' | 'stable' | 'declining' | 'unknown' {
  if (analyses.length < 2) return 'unknown';
  
  const recent = analyses.slice(0, 3);
  const older = analyses.slice(3, 6);
  
  if (recent.length === 0 || older.length === 0) return 'unknown';
  
  const recentAvg = recent.reduce((sum, a) => sum + a.confidenceScore, 0) / recent.length;
  const olderAvg = older.reduce((sum, a) => sum + a.confidenceScore, 0) / older.length;
  
  const diff = recentAvg - olderAvg;
  
  if (diff > 0.1) return 'improving';
  if (diff < -0.1) return 'declining';
  return 'stable';
}

export default router;
