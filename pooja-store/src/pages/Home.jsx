import React from 'react'
import products from '../data/products'
import ProductCard from '../components/ProductCard'

export default function Home(){
  return (
    <div>
      <h2 style={{margin:'18px 0'}}>Products</h2>
      <div className="grid">
        {products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
      <div style={{marginTop:30}} className="footer">&copy; Pooja Store ❤️</div>
    </div>
  )
}