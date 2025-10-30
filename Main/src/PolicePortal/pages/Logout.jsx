import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Logout() {
  const nav = useNavigate()
  React.useEffect(()=>{ setTimeout(()=>nav('/'), 700) }, [nav])
  return <div style={{padding:24}}>Logging out... Redirecting to home.</div>
}
