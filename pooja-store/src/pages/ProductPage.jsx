import React from 'react'
import { useParams } from 'react-router-dom'
import products from '../data/products'
import { useCart } from '../contexts/CartContext'

export default function ProductPage(){
  const { id } = useParams()
  const p = products.find(x => x.id === id)
  const { addToCart } = useCart()

  if(!p) return <div style={{padding:20}}>Product not found</div>

  return (
    <div style={{padding:20,display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>
      <div>
        <img src={p.image} alt={p.title} style={{width:'100%',borderRadius:10}}/>
      </div>
      <div>
        <h2>{p.title}</h2>
        <p className="price">₹{p.price}</p>
        <p className="small">{p.description || 'No description provided.'}</p>
        <div style={{marginTop:20}}>
          <button className="btn" onClick={() => { addToCart(p.id); alert('Added to cart') }}>Add to cart</button>
        </div>
      </div>
    </div>
  )
}
