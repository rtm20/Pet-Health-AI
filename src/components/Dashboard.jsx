import React from 'react'

const Dashboard = ({ selectedPet }) => {
  const healthAlerts = [
    {
      id: 1,
      type: 'warning',
      icon: '⚠️',
      title: 'Slight decrease in activity',
      message: 'Buddy has been 15% less active over the past 3 days',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'good',
      icon: '✅',
      title: 'Weight maintaining well',
      message: 'Stable weight within healthy range for breed',
      time: '1 day ago'
    }
  ]

  const recentActivities = [
    { id: 1, activity: 'Photo Analysis', description: 'Checked skin condition - All normal', time: '3 hours ago' },
    { id: 2, activity: 'Behavior Log', description: 'Recorded eating patterns', time: '6 hours ago' },
    { id: 3, activity: 'Weight Check', description: '65 lbs - Within normal range', time: '1 day ago' },
    { id: 4, activity: 'Vet Consultation', description: 'Routine check-up scheduled', time: '2 days ago' }
  ]

  return (
    <div className="dashboard fade-in">
      <div className="card">
        <h2>Health Overview for {selectedPet.name}</h2>
        
        <div className="dashboard-grid">
          <div className="stat-card">
            <div className="stat-value">92</div>
            <div className="stat-label">Health Score</div>
            <div className="health-status good">
              <span className="status-icon">💚</span>
              <div>
                <strong>Excellent Health</strong>
                <p>All systems monitoring normal</p>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-value">47</div>
            <div className="stat-label">Photos Analyzed</div>
            <div className="stat-value" style={{fontSize: '1.2rem', marginTop: '1rem'}}>15</div>
            <div className="stat-label">This Month</div>
          </div>

          <div className="stat-card">
            <div className="stat-value">8.5/10</div>
            <div className="stat-label">Activity Level</div>
            <div className="confidence-bar">
              <div className="confidence-fill" style={{width: '85%'}}></div>
            </div>
            <small style={{color: '#718096'}}>Above average for breed</small>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <h3>Recent Health Alerts</h3>
          {healthAlerts.map(alert => (
            <div key={alert.id} className={`health-status ${alert.type}`}>
              <span className="status-icon">{alert.icon}</span>
              <div style={{flex: 1}}>
                <strong>{alert.title}</strong>
                <p style={{margin: '0.25rem 0', fontSize: '0.9rem'}}>{alert.message}</p>
                <small style={{opacity: 0.7}}>{alert.time}</small>
              </div>
            </div>
          ))}
        </div>

        <div className="card">
          <h3>Recent Activity</h3>
          <div className="timeline">
            {recentActivities.map(activity => (
              <div key={activity.id} className="timeline-item">
                <div className="timeline-content">
                  <strong>{activity.activity}</strong>
                  <p style={{margin: '0.25rem 0', color: '#718096'}}>{activity.description}</p>
                  <small style={{color: '#a0aec0'}}>{activity.time}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Health Trends</h3>
        <div className="metric-chart">
          <div className="chart-placeholder">
            📈 Activity Level Over Time - Interactive Chart Would Go Here
          </div>
        </div>
        
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem'}}>
          <div style={{textAlign: 'center', padding: '1rem', background: '#f7fafc', borderRadius: '8px'}}>
            <div style={{fontSize: '1.5rem', color: '#667eea', fontWeight: 'bold'}}>7.2 hrs</div>
            <div style={{color: '#718096', fontSize: '0.9rem'}}>Avg Daily Sleep</div>
          </div>
          <div style={{textAlign: 'center', padding: '1rem', background: '#f7fafc', borderRadius: '8px'}}>
            <div style={{fontSize: '1.5rem', color: '#48bb78', fontWeight: 'bold'}}>2.1 cups</div>
            <div style={{color: '#718096', fontSize: '0.9rem'}}>Daily Food Intake</div>
          </div>
          <div style={{textAlign: 'center', padding: '1rem', background: '#f7fafc', borderRadius: '8px'}}>
            <div style={{fontSize: '1.5rem', color: '#ed8936', fontWeight: 'bold'}}>3.2 miles</div>
            <div style={{color: '#718096', fontSize: '0.9rem'}}>Daily Walking</div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Quick Actions</h3>
        <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem'}}>
          <button className="btn btn-primary">📸 Take Health Photo</button>
          <button className="btn btn-secondary">📝 Log Behavior</button>
          <button className="btn btn-secondary">⚖️ Record Weight</button>
          <button className="btn btn-warning">🚨 Report Emergency</button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
