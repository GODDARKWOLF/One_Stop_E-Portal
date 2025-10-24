import React from 'react'

const events = [
  {id:1,date:'2025-10-23',title:'Passport Application',desc:'Submitted passport renewal application'},
  {id:2,date:'2025-10-20',title:'Address Change',desc:'Updated residential address'},
  {id:3,date:'2025-10-15',title:'Marriage Registration',desc:'Started marriage registration process'},
  {id:4,date:'2025-10-10',title:'Tax Return',desc:'Filed annual tax return'},
]

export default function LifeEventTimeline(){
  return (
    <div className="card fadeIn">
      <h3>Recent Life Events</h3>
      <div className="timeline">
        {events.map(e=> (
          <div key={e.id} className="timeline-entry">
            <div>
              <div className="timeline-dot"></div>
              <div className="timeline-line"></div>
            </div>
            <div>
              <strong>{e.title}</strong>
              <div style={{fontSize:12,color:'#666'}}>{e.desc}</div>
              <div style={{fontSize:11,color:'#999',marginTop:2}}>{e.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
