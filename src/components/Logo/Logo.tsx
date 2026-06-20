import React from 'react'

export const Logo = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/api/media/file/cropped-The-Great-Seal-of-Crete-Township-scaled-1.jpg"
        alt="Crete Township Seal"
        width={72}
        height={72}
        style={{ borderRadius: '50%', border: '2px solid #C8960C', objectFit: 'cover' }}
      />
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '18px', fontWeight: 700, color: '#1B3A5C', lineHeight: 1.1 }}>
          Crete Township
        </div>
        <div style={{ fontSize: '11px', color: '#5A6478', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Will County, Illinois
        </div>
      </div>
    </div>
  )
}

export const Icon = () => {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/api/media/file/cropped-The-Great-Seal-of-Crete-Township-scaled-1.jpg"
      alt="Crete Township"
      width={32}
      height={32}
      style={{ borderRadius: '50%', objectFit: 'cover', display: 'block' }}
    />
  )
}
