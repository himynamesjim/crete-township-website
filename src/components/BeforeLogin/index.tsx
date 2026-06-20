import React from 'react'

const BeforeLogin: React.FC = () => {
  return (
    <div
      style={{
        marginBottom: '24px',
        borderRadius: '8px',
        overflow: 'hidden',
        border: '1px solid #E8EDF3',
      }}
    >
      {/* Town Hall Banner */}
      <div
        style={{
          position: 'relative',
          height: '140px',
          backgroundImage: "url('/crete-town-hall.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(15,37,64,0.55) 0%, rgba(15,37,64,0.8) 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            padding: '16px',
          }}
        >
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', textAlign: 'center' }}>
            Crete Township
          </div>
          <div style={{ fontSize: '11px', color: '#C8960C', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>
            Content Management System
          </div>
        </div>
      </div>

      {/* Info strip */}
      <div
        style={{
          background: '#F8F5F0',
          padding: '10px 16px',
          borderTop: '3px solid #C8960C',
          textAlign: 'center',
        }}
      >
        <p style={{ margin: 0, fontSize: '12px', color: '#5A6478' }}>
          Authorized staff only &nbsp;·&nbsp; For access issues contact{' '}
          <a href="mailto:administrator@cretetownship.com" style={{ color: '#1B3A5C', textDecoration: 'none', fontWeight: 600 }}>
            administrator@cretetownship.com
          </a>
        </p>
      </div>
    </div>
  )
}

export default BeforeLogin
