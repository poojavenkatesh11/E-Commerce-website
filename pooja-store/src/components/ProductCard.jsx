import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'

export default function ProductCard({ product }){
  const { addToCart } = useCart()
  return (
    <div className="card">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.title} />
      </Link>
      <h3>{product.title}</h3>
      <p className="price">₹{product.price}</p>
      <div className="row center" style={{marginTop:10}}>
        <button className="btn" onClick={() => addToCart(product.id)}>Add to cart</button>
      </div>
    </div>
  )
}