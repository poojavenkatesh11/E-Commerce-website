import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Login(){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const { login, user } = useAuth()
  const nav = useNavigate()

  function handle(e){
    e.preventDefault()
    const res = login({ username: username.trim(), password })
    if (res.ok) { nav('/') }
    else setError(res.message)
  }

  if (user) return (
    <div style={{padding:20}}>
      <h3>Welcome back, {user.name}</h3>
      <p>You're already logged in.</p>
    </div>
  )

  return (
    <div style={{maxWidth:420,margin:'40px auto',padding:20,background:'#fff',borderRadius:8}}>
      <h3 style={{marginBottom:10}}>Login</h3>
      <form onSubmit={handle}>
        <div style={{marginBottom:8}}>
          <input placeholder="username" value={username} onChange={e=>setUsername(e.target.value)} style={{width:'100%',padding:8}} />
        </div>
        <div style={{marginBottom:8}}>
          <input placeholder="password" value={password} onChange={e=>setPassword(e.target.value)} style={{width:'100%',padding:8}} type="password" />
        </div>
        {error && <div style={{color:'crimson',marginBottom:8}}>{error}</div>}
        <div style={{display:'flex',gap:8}}>
          <button className="btn" type="submit">Login</button>
        </div>
      </form>
      <p className="small" style={{marginTop:12}}>Tip: ask the site owner to add your account to <code>src/data/users.js</code> if you can’t login.</p>
    </div>
  )
}