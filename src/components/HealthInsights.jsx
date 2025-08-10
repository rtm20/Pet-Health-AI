import React, { useState } from 'react'

const HealthInsights = ({ selectedPet }) => {
  const [timeRange, setTimeRange] = useState('30days')

  const healthTrends = {
    activity: {
      current: 8.5,
      previous: 7.8,
      trend: 'up',
      data: [7.2, 7.5, 8.1, 7.9, 8.3, 8.5, 8.2]
    },
    weight: {
      current: 65,
      previous: 66.2,
      trend: 'down',
      data: [67.1, 66.8, 66.5, 66.2, 65.8, 65.4, 65.0]
    },
    appetite: {
      current: 9.2,
      previous: 8.9,
      trend: 'up',
      data: [8.5, 8.7, 8.9, 9.1, 9.0, 9.2, 9.1]
    },
    sleep: {
      current: 7.2,
      previous: 7.0,
      trend: 'stable',
      data: [6.8, 7.0, 7.1, 7.0, 7.2, 7.1, 7.2]
    }
  }

  const healthAlerts = [
    {
      id: 1,
      type: 'recommendation',
      priority: 'medium',
      title: 'Dental Cleaning Due',
      description: 'Based on age and breed, annual dental cleaning is recommended',
      daysAgo: 5,
      action: 'Schedule with vet'
    },
    {
      id: 2,
      type: 'observation',
      priority: 'low',
      title: 'Increased Water Intake',
      description: 'Slight increase in water consumption over past week',
      daysAgo: 2,
      action: 'Monitor for 7 more days'
    },
    {
      id: 3,
      type: 'positive',
      priority: 'low',
      title: 'Weight Stabilization',
      description: 'Weight has reached healthy range and stabilized',
      daysAgo: 1,
      action: 'Continue current routine'
    }
  ]

  const upcomingCare = [
    {
      id: 1,
      task: 'Annual Vaccination',
      due: 'Aug 15, 2025',
      type: 'vaccination',
      priority: 'high'
    },
    {
      id: 2,
      task: 'Heartworm Test',
      due: 'Sep 10, 2025',
      type: 'test',
      priority: 'medium'
    },
    {
      id: 3,
      task: 'Dental Cleaning',
      due: 'Oct 1, 2025',
      type: 'procedure',
      priority: 'medium'
    }
  ]

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return '📈'
      case 'down': return '📉'
      case 'stable': return '➡️'
      default: return '📊'
    }
  }

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return '#48bb78'
      case 'down': return '#f56565'
      case 'stable': return '#667eea'
      default: return '#a0aec0'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#f56565'
      case 'medium': return '#ed8936'
      case 'low': return '#48bb78'
      default: return '#a0aec0'
    }
  }

  return (
    <div className="health-insights fade-in">
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2>Health Insights for {selectedPet.name}</h2>
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            style={{ padding: '0.5rem', borderRadius: '8px', border: '2px solid #e2e8f0' }}
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 3 Months</option>
            <option value="1year">Last Year</option>
          </select>
        </div>

        <div className="dashboard-grid">
          {Object.entries(healthTrends).map(([metric, data]) => (
            <div key={metric} className="card" style={{ margin: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ textTransform: 'capitalize', margin: 0 }}>{metric}</h3>
                <span style={{ fontSize: '1.5rem' }}>{getTrendIcon(data.trend)}</span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '2rem', fontWeight: 'bold', color: getTrendColor(data.trend) }}>
                  {data.current}
                </span>
                <div>
                  <div style={{ fontSize: '0.9rem', color: '#718096' }}>
                    {data.trend === 'up' ? '+' : data.trend === 'down' ? '-' : ''}
                    {Math.abs(data.current - data.previous).toFixed(1)}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#a0aec0' }}>vs last period</div>
                </div>
              </div>

              <div className="metric-chart">
                <div style={{ 
                  height: '60px', 
                  background: `linear-gradient(45deg, ${getTrendColor(data.trend)}33, ${getTrendColor(data.trend)}66)`,
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: getTrendColor(data.trend),
                  fontWeight: 'bold'
                }}>
                  {metric.charAt(0).toUpperCase() + metric.slice(1)} Trend Chart
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3>AI Health Recommendations</h3>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {healthAlerts.map(alert => (
            <div 
              key={alert.id} 
              style={{ 
                display: 'flex', 
                padding: '1.5rem',
                background: '#f7fafc',
                borderRadius: '12px',
                borderLeft: `4px solid ${getPriorityColor(alert.priority)}`
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <h4 style={{ margin: 0, color: '#2d3748' }}>{alert.title}</h4>
                  <span style={{ 
                    fontSize: '0.8rem', 
                    padding: '0.25rem 0.5rem', 
                    borderRadius: '12px', 
                    background: getPriorityColor(alert.priority),
                    color: 'white'
                  }}>
                    {alert.priority}
                  </span>
                </div>
                <p style={{ color: '#4a5568', margin: '0.5rem 0' }}>{alert.description}</p>
                <small style={{ color: '#718096' }}>{alert.daysAgo} days ago</small>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <button className="btn btn-primary" style={{ fontSize: '0.9rem' }}>
                  {alert.action}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div className="card">
          <h3>Upcoming Care Schedule</h3>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {upcomingCare.map(item => (
              <div 
                key={item.id}
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '1rem',
                  background: '#f7fafc',
                  borderRadius: '8px',
                  borderLeft: `4px solid ${getPriorityColor(item.priority)}`
                }}
              >
                <div>
                  <div style={{ fontWeight: 'bold', color: '#2d3748' }}>{item.task}</div>
                  <div style={{ fontSize: '0.9rem', color: '#718096' }}>Due: {item.due}</div>
                </div>
                <button className="btn btn-secondary" style={{ fontSize: '0.8rem' }}>
                  Schedule
                </button>
              </div>
            ))}
          </div>
          
          <button className="btn btn-primary" style={{ marginTop: '1rem' }}>
            📅 View Full Calendar
          </button>
        </div>

        <div className="card">
          <h3>Health Score Breakdown</h3>
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#48bb78' }}>92</div>
              <div style={{ color: '#718096' }}>Overall Health Score</div>
            </div>
            
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {[
                { category: 'Physical Health', score: 94, color: '#48bb78' },
                { category: 'Behavioral Health', score: 88, color: '#667eea' },
                { category: 'Preventive Care', score: 95, color: '#38b2ac' },
                { category: 'Nutrition', score: 91, color: '#ed8936' }
              ].map(item => (
                <div key={item.category}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: '0.9rem', color: '#4a5568' }}>{item.category}</span>
                    <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: item.color }}>{item.score}</span>
                  </div>
                  <div className="confidence-bar">
                    <div 
                      className="confidence-fill" 
                      style={{ width: `${item.score}%`, background: item.color }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="alert alert-info">
            <span>💡</span>
            <div>
              <strong>Tip:</strong> Regular photo uploads and behavior logging help improve health score accuracy.
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Breed-Specific Health Monitoring</h3>
        <p style={{ color: '#718096', marginBottom: '1.5rem' }}>
          Customized monitoring for {selectedPet.breed} based on common breed health patterns
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1rem', border: '2px solid #e2e8f0', borderRadius: '8px' }}>
            <h4>🦴 Joint Health</h4>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Risk Level: Medium</span>
              <span style={{ color: '#ed8936', fontWeight: 'bold' }}>⚠️ Monitor</span>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#718096', margin: '0.5rem 0' }}>
              Golden Retrievers are prone to hip dysplasia. Regular activity monitoring recommended.
            </p>
          </div>
          
          <div style={{ padding: '1rem', border: '2px solid #e2e8f0', borderRadius: '8px' }}>
            <h4>❤️ Heart Health</h4>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Risk Level: Low</span>
              <span style={{ color: '#48bb78', fontWeight: 'bold' }}>✅ Good</span>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#718096', margin: '0.5rem 0' }}>
              Current activity levels and behavior suggest good cardiovascular health.
            </p>
          </div>
          
          <div style={{ padding: '1rem', border: '2px solid #e2e8f0', borderRadius: '8px' }}>
            <h4>👁️ Eye Health</h4>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Risk Level: Medium</span>
              <span style={{ color: '#ed8936', fontWeight: 'bold' }}>⚠️ Monitor</span>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#718096', margin: '0.5rem 0' }}>
              Schedule regular eye exams as breed is susceptible to cataracts and PRA.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HealthInsights
