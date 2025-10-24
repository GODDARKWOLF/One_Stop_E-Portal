import React from 'react'

const assets = [
  {id:1,type:'Apartment',model:'Unit 4B',mark:'Estate',date:'2018-09-01'},
  {id:2,type:'Car',model:'BMW X5',mark:'BMW',date:'2020-03-15'},
  {id:3,type:'Motorbike',model:'Harley 750',mark:'Harley',date:'2019-07-09'},
]

export default function AssetsList(){
  return (
    <div className="card fadeIn">
      <h3>My Assets</h3>
      <div style={{display:'grid',gap:10}}>
        {assets.map(a=> (
          <div key={a.id} className="asset-card">
            <strong>{a.type} — {a.model}</strong>
            <div style={{fontSize:12,color:'#666'}}>{a.mark} • Registered: {a.date}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
