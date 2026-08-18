import { useState } from 'react'
import './App.css'

const products = [
  { id: 1, name: 'T-Shirt', price: 499, emoji: '👕' },
  { id: 2, name: 'Shoes', price: 1299, emoji: '👟' },
  { id: 3, name: 'Cap', price: 299, emoji: '🧢' },
  { id: 4, name: 'Watch', price: 1999, emoji: '⌚' },
  { id: 5, name: 'Bag', price: 899, emoji: '🎒' },
  { id: 6, name: 'Sunglasses', price: 599, emoji: '🕶️' },
  { id: 7, name: 'Jacket', price: 1499, emoji: '🧥' },
  { id: 8, name: 'Headphones', price: 999, emoji: '🎧' },
  { id: 9, name: 'Perfume', price: 799, emoji: '🧴' },
  { id: 10, name: 'Belt', price: 399, emoji: '👔' },
]

function App() {
  const [cart, setCart] = useState([])

  const addToCart = (product) => setCart([...cart, product])
  const total = cart.reduce((sum, product) => sum + product.price, 0)

  return (
    <main className="shop">
      <h1>Simple Shop</h1>

      <section className="products">
        {products.map((product) => (
          <div className="product" key={product.id}>
            <span className="emoji">{product.emoji}</span>
            <h3>{product.name}</h3>
            <p>₹{product.price}</p>
            <button onClick={() => addToCart(product)}>Add</button>
          </div>
        ))}
      </section>

      <section className="cart">
        <h2>Cart ({cart.length})</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul>
              {cart.map((product, index) => (
                <li key={`${product.id}-${index}`}>
                  {product.name} <span>₹{product.price}</span>
                </li>
              ))}
            </ul>
            <h3>Total: ₹{total}</h3>
          </>
        )}
      </section>
    </main>
  )
}

export default App
