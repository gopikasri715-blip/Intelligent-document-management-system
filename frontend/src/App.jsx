function App() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'system-ui, sans-serif',
      background: '#f8fafc'
    }}>
      <div style={{
        background: 'white',
        padding: '2rem 3rem',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        textAlign: 'center',
        maxWidth: '480px'
      }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#0f172a', marginBottom: '0.5rem' }}>
          Intelligent Document Management System
        </h1>
        <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
          Internship Project — Trunova Technologies Pvt Ltd
        </p>
        <div style={{
          background: '#f0fdf4',
          border: '1px solid #bbf7d0',
          borderRadius: '8px',
          padding: '0.75rem 1rem',
          color: '#15803d',
          fontSize: '0.875rem'
        }}>
          Frontend is running successfully on Day 1
        </div>
      </div>
    </div>
  )
}

export default App