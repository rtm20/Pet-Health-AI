import React, { useState } from 'react'

const PhotoAnalysis = ({ selectedPet }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [analysisResults, setAnalysisResults] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisStep, setAnalysisStep] = useState('')

  const recentAnalyses = [
    {
      id: 1,
      photo: '/api/placeholder/200/200',
      date: '2024-08-07',
      condition: 'Normal Skin',
      confidence: 94,
      severity: 'low',
      description: 'No signs of irritation or infection detected'
    },
    {
      id: 2,
      photo: '/api/placeholder/200/200',
      date: '2024-08-05',
      condition: 'Minor Hot Spot',
      confidence: 87,
      severity: 'medium',
      description: 'Small area of irritation detected on left rear leg'
    },
    {
      id: 3,
      photo: '/api/placeholder/200/200',
      date: '2024-08-03',
      condition: 'Healthy Eyes',
      confidence: 96,
      severity: 'low',
      description: 'Clear, bright eyes with no discharge'
    }
  ]

  const analysisSteps = [
    'Uploading image...',
    'Preprocessing image data...',
    'Running AI detection models...',
    'Analyzing skin patterns...',
    'Checking for abnormalities...',
    'Generating health insights...',
    'Finalizing results...'
  ]

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      // Validate file type and size
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file')
        return
      }
      
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('Image size should be less than 5MB')
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedPhoto(e.target.result)
        setAnalysisResults(null)
        setTimeout(() => simulateAnalysis(), 500) // Small delay for better UX
      }
      reader.readAsDataURL(file)
    }
  }

  const simulateAnalysis = () => {
    setIsAnalyzing(true)
    setAnalysisResults(null)
    
    // Simulate realistic AI analysis with steps
    let stepIndex = 0
    const stepInterval = setInterval(() => {
      if (stepIndex < analysisSteps.length) {
        setAnalysisStep(analysisSteps[stepIndex])
        stepIndex++
      } else {
        clearInterval(stepInterval)
      }
    }, 400)
    
    // Generate more realistic results based on random scenarios
    setTimeout(() => {
      const scenarios = [
        {
          condition: 'Healthy Skin Condition',
          confidence: 92 + Math.floor(Math.random() * 6),
          severity: 'low',
          recommendations: [
            'Skin appears healthy and normal',
            'Continue regular grooming routine',
            'Monitor for any changes',
            'Schedule routine vet check-up in 3-6 months'
          ],
          details: {
            skinTexture: 'Normal',
            coloration: 'Healthy',
            irritation: 'None detected',
            parasites: 'None visible',
            moistureLevel: 'Good'
          },
          nextSteps: 'Continue monitoring. No immediate action needed.'
        },
        {
          condition: 'Possible Minor Irritation',
          confidence: 78 + Math.floor(Math.random() * 12),
          severity: 'medium',
          recommendations: [
            'Monitor the area closely for 24-48 hours',
            'Keep the area clean and dry',
            'Avoid harsh shampoos or chemicals',
            'Contact vet if irritation worsens or persists'
          ],
          details: {
            skinTexture: 'Slightly rough',
            coloration: 'Mild redness detected',
            irritation: 'Minor inflammation',
            parasites: 'None visible',
            moistureLevel: 'Normal'
          },
          nextSteps: 'Monitor closely. Consider vet consultation if no improvement in 2-3 days.'
        },
        {
          condition: 'Dry Skin Detected',
          confidence: 85 + Math.floor(Math.random() * 10),
          severity: 'low',
          recommendations: [
            'Consider using pet-safe moisturizing products',
            'Increase humidity in living environment',
            'Review diet - omega-3 supplements may help',
            'Reduce bathing frequency if excessive'
          ],
          details: {
            skinTexture: 'Dry/flaky',
            coloration: 'Normal',
            irritation: 'None detected',
            parasites: 'None visible',
            moistureLevel: 'Below optimal'
          },
          nextSteps: 'Implement moisturizing routine. Consult vet if condition persists.'
        }
      ]
      
      const randomScenario = scenarios[Math.floor(Math.random() * scenarios.length)]
      setAnalysisResults(randomScenario)
      setIsAnalyzing(false)
      setAnalysisStep('')
    }, 3200)
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'low': return '#48bb78'
      case 'medium': return '#ed8936'
      case 'high': return '#f56565'
      default: return '#a0aec0'
    }
  }

  const retakePhoto = () => {
    setSelectedPhoto(null)
    setAnalysisResults(null)
    setIsAnalyzing(false)
    setAnalysisStep('')
  }

  return (
    <div className="photo-analysis fade-in">
      {/* Quick Tips Banner */}
      <div className="alert alert-info" style={{ marginBottom: '2rem' }}>
        <span>💡</span>
        <div>
          <strong>Photo Tips:</strong> Take clear, well-lit photos. Focus on specific areas of concern. 
          Multiple angles can provide better analysis results.
        </div>
      </div>

      <div className="card">
        <h2>AI Photo Analysis for {selectedPet.name}</h2>
        
        <div className="photo-upload-area" onClick={() => !isAnalyzing && document.getElementById('photo-input').click()}>
          <input
            type="file"
            id="photo-input"
            accept="image/*"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
            disabled={isAnalyzing}
          />
          
          {selectedPhoto ? (
            <div>
              <img 
                src={selectedPhoto} 
                alt="Selected for analysis"
                style={{ 
                  maxWidth: '400px', 
                  maxHeight: '400px', 
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              />
              {!isAnalyzing && !analysisResults && (
                <p style={{ marginTop: '1rem', color: '#4a5568' }}>Click to select a different photo</p>
              )}
              {!isAnalyzing && analysisResults && (
                <div style={{ marginTop: '1rem' }}>
                  <button 
                    className="btn btn-secondary" 
                    onClick={retakePhoto}
                    style={{ marginRight: '0.5rem' }}
                  >
                    📸 Take New Photo
                  </button>
                  <button 
                    className="btn btn-primary" 
                    onClick={simulateAnalysis}
                  >
                    🔄 Re-analyze
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <div className="upload-icon">📸</div>
              <h3>Upload a Photo for AI Analysis</h3>
              <p>Take or select a photo of your pet's skin, eyes, or any area of concern</p>
              <div style={{ marginTop: '1rem' }}>
                <button className="btn btn-primary" style={{ marginRight: '0.5rem' }}>
                  📱 Take Photo
                </button>
                <button className="btn btn-secondary">
                  📁 Choose from Gallery
                </button>
              </div>
              <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
                Supported formats: JPG, PNG, HEIC • Max size: 5MB
              </div>
            </>
          )}
        </div>

        {isAnalyzing && (
          <div className="analysis-result">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div className="loading-spinner"></div>
              <div>
                <h3>Analyzing Photo...</h3>
                <p style={{ marginBottom: '0.5rem' }}>
                  Our AI is examining the image for potential health indicators.
                </p>
                <div style={{ 
                  fontSize: '0.9rem', 
                  color: '#666',
                  fontStyle: 'italic'
                }}>
                  {analysisStep}
                </div>
                <div style={{ 
                  width: '100%', 
                  height: '4px', 
                  backgroundColor: '#e2e8f0', 
                  borderRadius: '2px',
                  marginTop: '1rem',
                  overflow: 'hidden'
                }}>
                  <div 
                    className="progress-bar"
                    style={{
                      height: '100%',
                      backgroundColor: '#4299e1',
                      animation: 'progress 3.2s ease-in-out forwards'
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {analysisResults && (
          <div className="analysis-result">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '2rem' }}>
                {analysisResults.severity === 'low' ? '✅' : 
                 analysisResults.severity === 'medium' ? '⚠️' : '🚨'}
              </div>
              <div>
                <h3 style={{ margin: 0, color: getSeverityColor(analysisResults.severity) }}>
                  {analysisResults.condition}
                </h3>
                <p style={{ margin: '0.25rem 0 0 0', color: '#666' }}>
                  Analysis completed with {analysisResults.confidence}% confidence
                </p>
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '1rem' }}>
              <div>
                <h4>Confidence Level</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div className="confidence-bar" style={{ flex: 1 }}>
                    <div 
                      className="confidence-fill" 
                      style={{ 
                        width: `${analysisResults.confidence}%`,
                        backgroundColor: getSeverityColor(analysisResults.severity)
                      }}
                    ></div>
                  </div>
                  <span style={{ fontWeight: 'bold' }}>{analysisResults.confidence}%</span>
                </div>
                
                <h4>Detailed Analysis</h4>
                <div style={{ background: '#f7fafc', padding: '1rem', borderRadius: '8px' }}>
                  {Object.entries(analysisResults.details).map(([key, value]) => (
                    <div key={key} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ textTransform: 'capitalize', fontSize: '0.9rem' }}>
                        {key.replace(/([A-Z])/g, ' $1').toLowerCase()}:
                      </span>
                      <strong style={{ fontSize: '0.9rem' }}>{value}</strong>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: '1.5rem' }}>
                  <h4>Next Steps</h4>
                  <div className="alert alert-info">
                    <span>💡</span>
                    <div style={{ fontSize: '0.9rem' }}>
                      {analysisResults.nextSteps}
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4>AI Recommendations</h4>
                <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.6' }}>
                  {analysisResults.recommendations.map((rec, index) => (
                    <li key={index} style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>{rec}</li>
                  ))}
                </ul>
                
                <div className="alert alert-warning" style={{ marginTop: '1.5rem' }}>
                  <span>⚠️</span>
                  <div>
                    <strong>Important:</strong> This AI analysis is for informational purposes only. 
                    Always consult with a licensed veterinarian for proper diagnosis and treatment.
                  </div>
                </div>
                
                <div style={{ marginTop: '1.5rem' }}>
                  <button className="btn btn-primary" style={{ marginBottom: '0.5rem', width: '100%' }}>
                    📋 Save to Health Record
                  </button>
                  <button className="btn btn-secondary" style={{ width: '100%' }}>
                    👩‍⚕️ Schedule Vet Consultation
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="card">
        <h3>Recent Photo Analyses</h3>
        <div className="photo-grid">
          {recentAnalyses.map(analysis => (
            <div key={analysis.id} className="photo-item">
              <img src={analysis.photo} alt={`Analysis from ${analysis.date}`} />
              <div className="photo-overlay">
                <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
                  {analysis.condition}
                </div>
                <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>
                  {analysis.confidence}% confidence • {analysis.date}
                </div>
                <div style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>
                  {analysis.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3>🤖 AI Analysis Capabilities</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1.5rem', background: '#f7fafc', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔍</div>
            <h4>Skin Condition Detection</h4>
            <p>Detect rashes, hot spots, infections, and parasites</p>
          </div>
          <div style={{ padding: '1.5rem', background: '#f7fafc', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👁️</div>
            <h4>Eye Health Analysis</h4>
            <p>Check for discharge, cloudiness, and irritation</p>
          </div>
          <div style={{ padding: '1.5rem', background: '#f7fafc', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🦷</div>
            <h4>Dental Health Check</h4>
            <p>Assess gum health and dental hygiene</p>
          </div>
          <div style={{ padding: '1.5rem', background: '#f7fafc', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏃</div>
            <h4>Posture Analysis</h4>
            <p>Identify potential mobility or pain issues</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PhotoAnalysis
