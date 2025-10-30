import React from 'react'
export default function OfficerCard({o}) {
  return (
    <div className="officer-card">
      <div className="officer-name">{o.name}</div>
      <div className="officer-rank">{o.rank}</div>
    </div>
  )
}
