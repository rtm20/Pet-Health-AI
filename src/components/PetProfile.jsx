import React, { useState } from 'react'

const PetProfile = ({ selectedPet, setSelectedPet }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(selectedPet)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = () => {
    setSelectedPet(formData)
    setIsEditing(false)
  }

  const healthHistory = [
    {
      id: 1,
      date: '2024-07-15',
      type: 'Vaccination',
      description: 'Annual DHPP and Rabies vaccination',
      vet: 'Dr. Sarah Johnson'
    },
    {
      id: 2,
      date: '2024-06-10',
      type: 'Check-up',
      description: 'Routine health examination - All normal',
      vet: 'Dr. Sarah Johnson'
    },
    {
      id: 3,
      date: '2024-05-03',
      type: 'Treatment',
      description: 'Minor skin irritation treatment',
      vet: 'Dr. Michael Chen'
    },
    {
      id: 4,
      date: '2024-03-20',
      type: 'Surgery',
      description: 'Dental cleaning and tooth extraction',
      vet: 'Dr. Sarah Johnson'
    }
  ]

  const breedInfo = {
    'Golden Retriever': {
      commonIssues: ['Hip Dysplasia', 'Cancer', 'Heart Disease', 'Eye Problems'],
      lifeExpectancy: '10-12 years',
      averageWeight: '55-75 lbs',
      exerciseNeeds: 'High - 60+ minutes daily',
      groomingNeeds: 'Regular brushing 2-3 times per week'
    }
  }

  const currentBreedInfo = breedInfo[selectedPet.breed] || {}

  return (
    <div className="pet-profile fade-in">
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2>Pet Profile</h2>
          <button 
            className={`btn ${isEditing ? 'btn-success' : 'btn-primary'}`}
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
          >
            {isEditing ? '💾 Save Changes' : '✏️ Edit Profile'}
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '2rem', alignItems: 'start' }}>
          <div style={{ textAlign: 'center' }}>
            <img 
              src="/api/placeholder/200/200" 
              alt={selectedPet.name}
              style={{ 
                width: '200px', 
                height: '200px', 
                borderRadius: '50%', 
                objectFit: 'cover',
                border: '4px solid #667eea'
              }}
            />
            {isEditing && (
              <button className="btn btn-secondary" style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
                📸 Change Photo
              </button>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="form-group">
              <label>Pet Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              ) : (
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2d3748' }}>
                  {selectedPet.name}
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Breed</label>
              {isEditing ? (
                <select
                  name="breed"
                  value={formData.breed}
                  onChange={handleInputChange}
                >
                  <option value="Golden Retriever">Golden Retriever</option>
                  <option value="Labrador Retriever">Labrador Retriever</option>
                  <option value="German Shepherd">German Shepherd</option>
                  <option value="Border Collie">Border Collie</option>
                  <option value="Mixed Breed">Mixed Breed</option>
                </select>
              ) : (
                <div style={{ fontSize: '1.2rem', color: '#4a5568' }}>{selectedPet.breed}</div>
              )}
            </div>

            <div className="form-group">
              <label>Age</label>
              {isEditing ? (
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                />
              ) : (
                <div style={{ fontSize: '1.2rem', color: '#4a5568' }}>{selectedPet.age} years</div>
              )}
            </div>

            <div className="form-group">
              <label>Weight</label>
              {isEditing ? (
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                />
              ) : (
                <div style={{ fontSize: '1.2rem', color: '#4a5568' }}>{selectedPet.weight} lbs</div>
              )}
            </div>

            <div className="form-group">
              <label>Gender</label>
              {isEditing ? (
                <select
                  name="gender"
                  value={formData.gender || 'Male'}
                  onChange={handleInputChange}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                <div style={{ fontSize: '1.2rem', color: '#4a5568' }}>{formData.gender || 'Male'}</div>
              )}
            </div>

            <div className="form-group">
              <label>Microchip ID</label>
              {isEditing ? (
                <input
                  type="text"
                  name="microchipId"
                  value={formData.microchipId || ''}
                  onChange={handleInputChange}
                  placeholder="Enter microchip ID"
                />
              ) : (
                <div style={{ fontSize: '1.2rem', color: '#4a5568' }}>
                  {formData.microchipId || 'Not registered'}
                </div>
              )}
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="form-group" style={{ marginTop: '1.5rem' }}>
            <label>Special Notes</label>
            <textarea
              name="notes"
              value={formData.notes || ''}
              onChange={handleInputChange}
              placeholder="Any special health notes, allergies, or behavioral information..."
              rows="3"
            />
          </div>
        )}
      </div>

      {currentBreedInfo && Object.keys(currentBreedInfo).length > 0 && (
        <div className="card">
          <h3>Breed Information: {selectedPet.breed}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            <div>
              <h4>Common Health Issues</h4>
              <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.6' }}>
                {currentBreedInfo.commonIssues?.map((issue, index) => (
                  <li key={index}>{issue}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4>Breed Characteristics</h4>
              <div style={{ background: '#f7fafc', padding: '1rem', borderRadius: '8px' }}>
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong>Life Expectancy:</strong> {currentBreedInfo.lifeExpectancy}
                </div>
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong>Average Weight:</strong> {currentBreedInfo.averageWeight}
                </div>
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong>Exercise Needs:</strong> {currentBreedInfo.exerciseNeeds}
                </div>
                <div>
                  <strong>Grooming:</strong> {currentBreedInfo.groomingNeeds}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="card">
        <h3>Health History</h3>
        <div className="timeline">
          {healthHistory.map(record => (
            <div key={record.id} className="timeline-item">
              <div className="timeline-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <strong style={{ color: '#667eea' }}>{record.type}</strong>
                    <p style={{ margin: '0.25rem 0', color: '#4a5568' }}>{record.description}</p>
                    <small style={{ color: '#a0aec0' }}>
                      {record.date} • Dr. {record.vet}
                    </small>
                  </div>
                  <button className="btn btn-secondary" style={{ fontSize: '0.8rem', padding: '0.25rem 0.5rem' }}>
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button className="btn btn-primary" style={{ marginTop: '1rem' }}>
          ➕ Add Health Record
        </button>
      </div>

      <div className="card">
        <h3>Health Monitoring Setup</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <div style={{ padding: '1.5rem', border: '2px solid #e2e8f0', borderRadius: '12px' }}>
            <h4>📱 Smart Notifications</h4>
            <p style={{ color: '#718096', marginBottom: '1rem' }}>
              Get alerts for health changes and reminders for care tasks
            </p>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <input type="checkbox" defaultChecked />
              Daily health photo reminders
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <input type="checkbox" defaultChecked />
              Unusual behavior alerts
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="checkbox" />
              Emergency health alerts
            </label>
          </div>

          <div style={{ padding: '1.5rem', border: '2px solid #e2e8f0', borderRadius: '12px' }}>
            <h4>🏥 Veterinary Integration</h4>
            <p style={{ color: '#718096', marginBottom: '1rem' }}>
              Connect with your veterinarian for seamless health management
            </p>
            <div className="form-group">
              <label>Primary Veterinarian</label>
              <select>
                <option>Dr. Sarah Johnson - Healthy Paws Clinic</option>
                <option>Dr. Michael Chen - Pet Care Center</option>
                <option>Add new veterinarian...</option>
              </select>
            </div>
            <button className="btn btn-secondary">
              🔗 Share Health Data
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PetProfile
