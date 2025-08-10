import React, { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import PhotoAnalysis from './components/PhotoAnalysis'
import PetProfile from './components/PetProfile'
import HealthInsights from './components/HealthInsights'
import VetConsultation from './components/VetConsultation'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [selectedPet, setSelectedPet] = useState({
    id: 1,
    name: 'Buddy',
    breed: 'Golden Retriever',
    age: 5,
    weight: 65,
    photo: '/api/placeholder/150/150'
  })

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard selectedPet={selectedPet} />
      case 'photo-analysis':
        return <PhotoAnalysis selectedPet={selectedPet} />
      case 'pet-profile':
        return <PetProfile selectedPet={selectedPet} setSelectedPet={setSelectedPet} />
      case 'health-insights':
        return <HealthInsights selectedPet={selectedPet} />
      case 'vet-consultation':
        return <VetConsultation selectedPet={selectedPet} />
      default:
        return <Dashboard selectedPet={selectedPet} />
    }
  }

  return (
    <div className="app">
      <Header selectedPet={selectedPet} />
      
      <nav className="navigation">
        <button 
          className={`nav-button ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          🏠 Dashboard
        </button>
        <button 
          className={`nav-button ${activeTab === 'photo-analysis' ? 'active' : ''}`}
          onClick={() => setActiveTab('photo-analysis')}
        >
          📸 Photo Analysis
        </button>
        <button 
          className={`nav-button ${activeTab === 'pet-profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('pet-profile')}
        >
          🐕 Pet Profile
        </button>
        <button 
          className={`nav-button ${activeTab === 'health-insights' ? 'active' : ''}`}
          onClick={() => setActiveTab('health-insights')}
        >
          📊 Health Insights
        </button>
        <button 
          className={`nav-button ${activeTab === 'vet-consultation' ? 'active' : ''}`}
          onClick={() => setActiveTab('vet-consultation')}
        >
          👩‍⚕️ Vet Consultation
        </button>
      </nav>

      <main className="main-content">
        {renderActiveComponent()}
      </main>
    </div>
  )
}

export default App
