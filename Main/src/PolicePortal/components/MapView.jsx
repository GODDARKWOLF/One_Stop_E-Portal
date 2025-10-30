import React from 'react'
import './map.css'
// Simple SVG-based map placeholder that plots markers passed as props
export default function MapView({markers=[]}) {
  const w = 800, h = 320
  const normX = x => 20 + (x % 760)
  const normY = y => 20 + (y % 280)
  return (
    <div className="map-wrap">
      <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid meet" className="map-svg">
        <rect x="0" y="0" width={w} height={h} rx="8" ry="8" fill="#081226" />
        {markers.map((m,i)=> (
          <g key={i}>
            <circle cx={normX(m.lon+i*3)} cy={normY(m.lat+i*5)} r="6" fill={m.severity==='Critical' ? '#e53935' : '#1e90ff'} />
            <text x={normX(m.lon+i*3)+10} y={normY(m.lat+i*5)+4} fontSize="12" fill="#cfe3ff">{m.title}</text>
          </g>
        ))}
      </svg>
    </div>
  )
}
