import React from 'react'

const Header = ({ selectedPet }) => {
  return (
    <header className="header">
      <div className="logo">
        🐾 PetHealth AI
      </div>
      
      <div className="pet-selector">
        <img 
          src="/api/placeholder/40/40" 
          alt={selectedPet.name}
          className="pet-avatar"
        />
        <div className="pet-info">
          <h3>{selectedPet.name}</h3>
          <p>{selectedPet.breed} • {selectedPet.age.years} year{selectedPet.age.years !== 1 ? 's' : ''} {selectedPet.age.months > 0 ? `${selectedPet.age.months} month${selectedPet.age.months !== 1 ? 's' : ''}` : ''}</p>
        </div>
      </div>
    </header>
  )
}

export default Header
