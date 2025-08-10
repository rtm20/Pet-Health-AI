import React, { useState } from 'react'

const VetConsultation = ({ selectedPet }) => {
  const [selectedConsultation, setSelectedConsultation] = useState(null)
  const [consultationType, setConsultationType] = useState('general')

  const availableVets = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'General Practice',
      rating: 4.9,
      experience: '12 years',
      photo: '/api/placeholder/80/80',
      available: 'Today 2:00 PM',
      price: '$45'
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Dermatology',
      rating: 4.8,
      experience: '8 years',
      photo: '/api/placeholder/80/80',
      available: 'Tomorrow 10:00 AM',
      price: '$65'
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      specialty: 'Emergency Medicine',
      rating: 4.9,
      experience: '15 years',
      photo: '/api/placeholder/80/80',
      available: 'Available Now',
      price: '$85'
    }
  ]

  const pastConsultations = [
    {
      id: 1,
      date: '2024-07-20',
      vet: 'Dr. Sarah Johnson',
      type: 'General Check-up',
      duration: '25 min',
      notes: 'Routine examination. All vital signs normal. Recommended dental cleaning in next 6 months.',
      prescriptions: ['Daily dental chews', 'Omega-3 supplement'],
      followUp: 'Schedule dental cleaning'
    },
    {
      id: 2,
      date: '2024-06-15',
      vet: 'Dr. Michael Chen',
      type: 'Skin Consultation',
      duration: '18 min',
      notes: 'Minor hot spot on rear leg. Provided topical treatment recommendations.',
      prescriptions: ['Antiseptic spray', '7-day antibiotic course'],
      followUp: 'Monitor healing for 2 weeks'
    },
    {
      id: 3,
      date: '2024-05-10',
      vet: 'Dr. Sarah Johnson',
      type: 'Vaccination',
      duration: '15 min',
      notes: 'Annual DHPP and Rabies vaccination administered. No adverse reactions observed.',
      prescriptions: [],
      followUp: 'Next vaccination due July 2025'
    }
  ]

  const consultationTypes = [
    { id: 'general', name: 'General Health', icon: '🏥', description: 'Routine health questions and check-ups' },
    { id: 'emergency', name: 'Emergency', icon: '🚨', description: 'Urgent health concerns requiring immediate attention' },
    { id: 'behavioral', name: 'Behavioral', icon: '🧠', description: 'Behavior changes, training, and mental health' },
    { id: 'nutrition', name: 'Nutrition', icon: '🍽️', description: 'Diet recommendations and feeding concerns' },
    { id: 'preventive', name: 'Preventive Care', icon: '🛡️', description: 'Vaccinations, checkups, and health maintenance' }
  ]

  const handleBookConsultation = (vet) => {
    setSelectedConsultation(vet)
  }

  return (
    <div className="vet-consultation fade-in">
      <div className="card">
        <h2>Veterinary Consultation for {selectedPet.name}</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem' }}>
          <div>
            <h3>Select Consultation Type</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              {consultationTypes.map(type => (
                <div
                  key={type.id}
                  onClick={() => setConsultationType(type.id)}
                  style={{
                    padding: '1rem',
                    border: `2px solid ${consultationType === type.id ? '#667eea' : '#e2e8f0'}`,
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    background: consultationType === type.id ? '#f7fafc' : 'white'
                  }}
                >
                  <div style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '0.5rem' }}>
                    {type.icon}
                  </div>
                  <h4 style={{ textAlign: 'center', margin: '0.5rem 0', color: '#2d3748' }}>
                    {type.name}
                  </h4>
                  <p style={{ fontSize: '0.9rem', textAlign: 'center', color: '#718096', margin: 0 }}>
                    {type.description}
                  </p>
                </div>
              ))}
            </div>

            <h3>Available Veterinarians</h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {availableVets.map(vet => (
                <div
                  key={vet.id}
                  style={{
                    display: 'flex',
                    padding: '1.5rem',
                    border: '2px solid #e2e8f0',
                    borderRadius: '12px',
                    background: 'white',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <img
                    src={vet.photo}
                    alt={vet.name}
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      marginRight: '1.5rem'
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <h4 style={{ margin: 0, color: '#2d3748' }}>{vet.name}</h4>
                        <p style={{ margin: '0.25rem 0', color: '#667eea', fontWeight: '500' }}>
                          {vet.specialty}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '0.5rem 0' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            ⭐ {vet.rating}
                          </span>
                          <span style={{ color: '#718096' }}>{vet.experience}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <span style={{ color: '#48bb78', fontWeight: '500' }}>
                            📅 {vet.available}
                          </span>
                          <span style={{ color: '#2d3748', fontWeight: 'bold' }}>
                            {vet.price}
                          </span>
                        </div>
                      </div>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleBookConsultation(vet)}
                      >
                        Book Consultation
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="card" style={{ margin: 0 }}>
              <h4>Prepare for Consultation</h4>
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type="checkbox" defaultChecked />
                  Share recent photo analyses
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type="checkbox" defaultChecked />
                  Include behavior tracking data
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type="checkbox" defaultChecked />
                  Send health timeline
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type="checkbox" />
                  Include previous consultation notes
                </label>
              </div>
              
              <div className="form-group" style={{ marginTop: '1rem' }}>
                <label>Describe your concern:</label>
                <textarea
                  placeholder="Please describe what you've noticed about your pet's health or behavior..."
                  rows="4"
                />
              </div>
            </div>

            <div className="card" style={{ margin: '1rem 0 0 0' }}>
              <h4>Emergency Contact</h4>
              <div className="alert alert-warning">
                <span>🚨</span>
                <div>
                  <strong>For immediate emergencies:</strong> Call your local emergency vet clinic or contact our 24/7 emergency line at (555) 123-4567
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedConsultation && (
        <div className="card">
          <h3>Book Consultation with {selectedConsultation.name}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div>
              <div className="form-group">
                <label>Preferred Date & Time</label>
                <input type="datetime-local" />
              </div>
              
              <div className="form-group">
                <label>Consultation Duration</label>
                <select>
                  <option value="15">15 minutes - $45</option>
                  <option value="30">30 minutes - $75</option>
                  <option value="45">45 minutes - $105</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Additional Notes</label>
                <textarea
                  placeholder="Any specific questions or concerns you'd like to discuss..."
                  rows="3"
                />
              </div>
            </div>
            
            <div>
              <div style={{ padding: '1.5rem', background: '#f7fafc', borderRadius: '12px' }}>
                <h4>Consultation Summary</h4>
                <div style={{ display: 'grid', gap: '0.75rem', marginTop: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Veterinarian:</span>
                    <strong>{selectedConsultation.name}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Specialty:</span>
                    <strong>{selectedConsultation.specialty}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Consultation Type:</span>
                    <strong>{consultationTypes.find(t => t.id === consultationType)?.name}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Estimated Cost:</span>
                    <strong style={{ color: '#48bb78' }}>{selectedConsultation.price}</strong>
                  </div>
                </div>
                
                <button className="btn btn-success" style={{ width: '100%', marginTop: '1.5rem' }}>
                  💳 Confirm & Pay
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="card">
        <h3>Previous Consultations</h3>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {pastConsultations.map(consultation => (
            <div
              key={consultation.id}
              style={{
                padding: '1.5rem',
                border: '2px solid #e2e8f0',
                borderRadius: '12px',
                background: 'white'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <h4 style={{ margin: 0, color: '#2d3748' }}>{consultation.type}</h4>
                  <p style={{ margin: '0.25rem 0', color: '#667eea' }}>
                    {consultation.vet} • {consultation.date} • {consultation.duration}
                  </p>
                </div>
                <button className="btn btn-secondary" style={{ fontSize: '0.9rem' }}>
                  📄 View Full Report
                </button>
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <strong style={{ color: '#4a5568' }}>Notes:</strong>
                <p style={{ margin: '0.5rem 0', color: '#718096' }}>{consultation.notes}</p>
              </div>
              
              {consultation.prescriptions.length > 0 && (
                <div style={{ marginBottom: '1rem' }}>
                  <strong style={{ color: '#4a5568' }}>Prescriptions:</strong>
                  <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem', color: '#718096' }}>
                    {consultation.prescriptions.map((prescription, index) => (
                      <li key={index}>{prescription}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div>
                <strong style={{ color: '#4a5568' }}>Follow-up:</strong>
                <p style={{ margin: '0.5rem 0', color: '#ed8936', fontWeight: '500' }}>
                  {consultation.followUp}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3>How Video Consultations Work</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📱</div>
            <h4>1. Book & Prepare</h4>
            <p style={{ color: '#718096' }}>
              Select your vet, share your pet's health data, and prepare your questions
            </p>
          </div>
          
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>💬</div>
            <h4>2. Video Call</h4>
            <p style={{ color: '#718096' }}>
              Connect with your veterinarian via secure video call at your scheduled time
            </p>
          </div>
          
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📋</div>
            <h4>3. Follow-up</h4>
            <p style={{ color: '#718096' }}>
              Receive consultation notes, prescriptions, and care recommendations
            </p>
          </div>
        </div>
        
        <div className="alert alert-info" style={{ marginTop: '1.5rem' }}>
          <span>💡</span>
          <div>
            <strong>Pro Tip:</strong> Have good lighting and your pet nearby during the consultation for the best experience.
          </div>
        </div>
      </div>
    </div>
  )
}

export default VetConsultation
