import React, { createContext, useContext, useEffect, useState } from 'react'
import USERS from '../data/users'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('friend_user')) || null
    } catch (e) {
      return null
    }
  })

  useEffect(() => {
    if (user) localStorage.setItem('friend_user', JSON.stringify(user))
    else localStorage.removeItem('friend_user')
  }, [user])

  function login({ username, password }) {
    const found = USERS.find(u => u.username === username && u.password === password)
    if (found) {
      const token = (crypto && crypto.randomUUID && crypto.randomUUID()) || Date.now().toString(36)
      const payload = { username: found.username, name: found.name, token }
      setUser(payload)
      return { ok: true }
    }
    return { ok: false, message: 'Invalid credentials' }
  }

  function logout() {
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth(){
  return useContext(AuthContext)
}