import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'

export default function Header(){
  const { user, logout } = useAuth()
  const { totalItems } = useCart()
  const nav = useNavigate()

  return (
    <header className="header">
      <div className="logo">Pooja Store</div>

      <div className="search">
        <input placeholder="Search products..." />
        <button aria-label="search">🔍</button>
      </div>

      <div className="row">
        <button className="icon-btn" title="Profile" onClick={() => nav('/login')}>
          {user ? `👤 ${user.name}` : '👤'}
        </button>

        <Link to="/cart" className="icon-btn" title="Cart">
          🛒
          {totalItems > 0 && <span style={{marginLeft:8,fontWeight:700}}>{totalItems}</span>}
        </Link>

        {user && <button className="icon-btn" title="Logout" onClick={() => { logout(); nav('/') }}>⎋</button>}
      </div>
    </header>
  )
}