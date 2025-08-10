import React from 'react'
import { useCart } from '../contexts/CartContext'

export default function Cart(){
  const { cartDetails, removeFromCart, totalPrice, clearCart } = useCart()
  const items = cartDetails()

  if (items.length === 0) return <div style={{padding:20}}>Your cart is empty.</div>

  return (
    <div style={{padding:20}}>
      <h3>Your cart</h3>
      <div style={{marginTop:10}}>
        {items.map(it => (
          <div key={it.id} style={{display:'flex',gap:12,alignItems:'center',marginBottom:12,background:'#fff',padding:10,borderRadius:8}}>
            <img src={it.image} alt={it.title} style={{width:80,height:80,objectFit:'cover',borderRadius:6}} />
            <div style={{flex:1}}>
              <div style={{fontWeight:700}}>{it.title}</div>
              <div className="small">Qty: {it.qty}</div>
            </div>
            <div style={{textAlign:'right'}}>
              <div style={{fontWeight:700}}>₹{it.total}</div>
              <button className="btn" onClick={() => removeFromCart(it.id)} style={{marginTop:8}}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      <div style={{marginTop:20,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div style={{fontWeight:800}}>Total: ₹{totalPrice}</div>
        <div style={{display:'flex',gap:8}}>
          <button className="btn" onClick={() => { alert('This is a demo. Implement real checkout later.') }}>Checkout</button>
          <button onClick={clearCart} style={{padding:'8px 12px'}}>Clear</button>
        </div>
      </div>
    </div>
  )
}