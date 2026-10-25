import { useState } from "react";
import {
  BrowserRouter, Routes, Route, NavLink, Link, useNavigate
} from "react-router-dom";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector } from "react-redux";

const products = [
  { id: 1, name: "Headphones", price: 1500 },
  { id: 2, name: "Keyboard", price: 800 },
  { id: 3, name: "Mouse", price: 500 },
  { id: 4, name: "Monitor", price: 9000 },
  { id: 5, name: "Speaker", price: 1200 },
  { id: 6, name: "Webcam", price: 2000 },
  { id: 7, name: "USB Drive", price: 400 },
  { id: 8, name: "Laptop Stand", price: 700 },
].map(p => ({
  ...p,
  image: `https://placehold.co/160x100?text=${encodeURIComponent(p.name)}`
}));

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart(state, { payload }) {
      const item = state.find(p => p.id === payload.id);
      if (item) item.quantity++;
      else state.push({ ...payload, quantity: 1 });
    },
    removeFromCart(state, { payload }) {
      return state.filter(p => p.id !== payload);
    },
    increaseQuantity(state, { payload }) {
      const item = state.find(p => p.id === payload);
      if (item) item.quantity++;
    },
    decreaseQuantity(state, { payload }) {
      const item = state.find(p => p.id === payload);
      if (item && item.quantity > 1) item.quantity--;
      else return state.filter(p => p.id !== payload);
    },
    clearCart() {
      return [];
    }
  }
});

const {
  addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart
} = cartSlice.actions;

const store = configureStore({
  reducer: { cart: cartSlice.reducer }
});

function Navbar() {
  const cart = useSelector(state => state.cart);
  const count = cart.reduce((sum, p) => sum + p.quantity, 0);

  return (
    <nav style={{ display: "flex", gap: 20 }}>
      {[
        ["/", "Home"], ["/products", "Products"],
        ["/cart", `Cart (${count})`], ["/about", "About"]
      ].map(([path, label]) => (
        <NavLink
          key={path}
          to={path}
          end
          style={({ isActive }) => ({
            color: isActive ? "tomato" : "black",
            fontWeight: isActive ? "bold" : "normal"
          })}
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
}

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Welcome to Mini Store!</h1>
      <p>Your everyday electronics, all in one place.</p>
      <button onClick={() => navigate("/products")}>Shop Products</button>
      <button onClick={() => navigate("/cart")}>View Cart</button>
    </>
  );
}

function Products() {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");

  return (
    <>
      <h2>Products</h2>
      <p role="status">{message}</p>
      <div style={{
        display: "flex", flexWrap: "wrap", gap: 20
      }}>
        {products.map(p => (
          <div key={p.id} style={{ border: "1px solid #ccc", padding: 15 }}>
            <img src={p.image} alt={p.name} width="160" height="100" />
            <h3>{p.name}</h3>
            <p>₹{p.price}</p>
            <button onClick={() => {
              dispatch(addToCart(p));
              setMessage(`${p.name} added to cart!`);
            }}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

function Cart() {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const total = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);

  return (
    <>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty. <Link to="/products">Start shopping</Link></p>
      ) : (
        <>
          {cart.map(p => (
            <div key={p.id} style={{ marginBottom: 15 }}>
              <b>{p.name}</b> — ₹{p.price} × {p.quantity} = ₹
              {p.price * p.quantity}{" "}
              <button onClick={() => dispatch(decreaseQuantity(p.id))}>−</button>
              <span> {p.quantity} </span>
              <button onClick={() => dispatch(increaseQuantity(p.id))}>+</button>
              <button onClick={() => dispatch(removeFromCart(p.id))}>
                Remove
              </button>
            </div>
          ))}
          <h3>Total: ₹{total}</h3>
          <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
        </>
      )}
    </>
  );
}

function About() {
  return (
    <>
      <h2>About Us</h2>
      <p>Mini Store offers affordable electronics for everyday needs.</p>
      <Link to="/">Back to Home</Link>
    </>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div style={{ padding: 20, fontFamily: "Arial" }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={
              <><h2>404 — Page not found</h2><Link to="/">Go Home</Link></>
            } />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}