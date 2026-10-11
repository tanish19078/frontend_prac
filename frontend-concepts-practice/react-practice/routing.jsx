import { useState } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from "react-router-dom";

const mockProducts = [
  { id: 1, name: "Laptop", price: 999 },
  { id: 2, name: "Headphones", price: 149 },
  { id: 3, name: "Keyboard", price: 79 }
];

function Home({ cart, onRemove }) {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Welcome to the Shop</h1>
      <button onClick={() => navigate("/products")}>Browse Products</button>
      <h3>Cart Items ({cart.length})</h3>
      {cart.length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        <ul>
          {cart.map((p, i) => (
            <li key={`${p.id}-${i}`}>
              {p.name} - ${p.price} <button onClick={() => onRemove(i)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ProductsList({ onAddToCart }) {
  return (
    <div>
      <h2>Products Catalog</h2>
      <ul>
        {mockProducts.map((p) => (
          <li key={p.id} style={{ margin: "8px 0" }}>
            <Link to={`/products/${p.id}`}>{p.name}</Link> - ${p.price}{" "}
            <button onClick={() => onAddToCart(p)}>Add to Cart</button>
          </li>
        ))}
      </ul>
      <Link to="/">Back Home</Link> | <Link to="/checkout">Checkout</Link>
    </div>
  );
}

function ProductDetails({ onAddToCart }) {
  const { id } = useParams();
  const product = mockProducts.find((p) => p.id === Number(id));

  if (!product) return <p>Product not found. <Link to="/products">Back</Link></p>;

  return (
    <div>
      <h2>{product.name}</h2>
      <p>Price: ${product.price}</p>
      <button onClick={() => onAddToCart(product)}>Add to Cart</button>
      <p><Link to="/products">← Back to Products</Link></p>
    </div>
  );
}

function Checkout({ cart, onClear }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  return (
    <div>
      <h2>Checkout Page</h2>
      <p>Items in Order: {cart.length}</p>
      <h3>Total Amount: ${total}</h3>
      <button onClick={onClear}>Confirm & Clear Cart</button>
      <p><Link to="/products">← Continue Shopping</Link></p>
    </div>
  );
}

export default function ShopRouterApp() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => setCart((prev) => [...prev, product]);
  const deleteFromCart = (index) => setCart((prev) => prev.filter((_, i) => i !== index));
  const clearCart = () => setCart([]);

  return (
    <BrowserRouter>
      <div style={{ maxWidth: "500px", margin: "20px auto", fontFamily: "sans-serif", padding: "16px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <nav style={{ display: "flex", gap: "12px", borderBottom: "1px solid #eee", paddingBottom: "8px", marginBottom: "12px" }}>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/checkout">Checkout ({cart.length})</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home cart={cart} onRemove={deleteFromCart} />} />
          <Route path="/products" element={<ProductsList onAddToCart={addToCart} />} />
          <Route path="/products/:id" element={<ProductDetails onAddToCart={addToCart} />} />
          <Route path="/checkout" element={<Checkout cart={cart} onClear={clearCart} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
