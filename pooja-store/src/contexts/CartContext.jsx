import React, { createContext, useContext, useEffect, useState } from 'react'
import products from '../data/products'

const CartContext = createContext()

export function CartProvider({ children }){
  const [cart, setCart] = useState(() => {
    try{ return JSON.parse(localStorage.getItem('friend_cart')) || [] }catch(e){return []}
  })

  useEffect(()=>{ localStorage.setItem('friend_cart', JSON.stringify(cart)) }, [cart])

  function addToCart(productId, qty = 1){
    setCart(prev => {
      const exists = prev.find(i => i.id === productId)
      if (exists) return prev.map(i => i.id === productId ? { ...i, qty: i.qty + qty } : i)
      const product = products.find(p => p.id === productId)
      if(!product) return prev
      return [...prev, { id: productId, qty }]
    })
  }

  function removeFromCart(productId){ setCart(prev => prev.filter(i=>i.id!==productId)) }
  function clearCart(){ setCart([]) }

  function cartDetails(){
    return cart.map(ci => {
      const p = products.find(x => x.id === ci.id)
      return { ...p, qty: ci.qty, total: (p?.price||0) * ci.qty }
    })
  }

  const totalItems = cart.reduce((s, i) => s + i.qty, 0)
  const totalPrice = cartDetails().reduce((s, i) => s + (i.total||0), 0)

  return <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartDetails, totalItems, totalPrice }}>
    {children}
  </CartContext.Provider>
}

export function useCart(){ return useContext(CartContext) }
