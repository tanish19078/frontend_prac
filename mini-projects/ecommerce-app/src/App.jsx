import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider, useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import "./App.css";

// --- Mock Products ---
const PRODUCTS = [
  { id: 1, name: "Wireless Headphones", price: 99, category: "Audio", emoji: "🎧", description: "Noise-cancelling over-ear wireless headphones with 30-hour battery life." },
  { id: 2, name: "Mechanical Keyboard", price: 129, category: "Accessories", emoji: "⌨️", description: "RGB backlit mechanical keyboard with hot-swappable tactile switches." },
  { id: 3, name: "Gaming Mouse", price: 59, category: "Accessories", emoji: "🖱️", description: "Ergonomic high-precision optical sensor gaming mouse." },
  { id: 4, name: "Smart Fitness Watch", price: 199, category: "Wearables", emoji: "⌚", description: "Water-resistant smartwatch with heart-rate and sleep tracking." },
  { id: 5, name: "4K Action Camera", price: 249, category: "Photography", emoji: "📷", description: "Ultra-compact 4K 60fps action camera with stabilization." },
  { id: 6, name: "Fast USB-C Charger", price: 29, category: "Power", emoji: "🔌", description: "65W GaN dual-port fast power adapter for phone and laptop." }
];

// --- Redux Cart Slice ---
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: []
  },
  reducers: {
    addToCart: (state, action) => {
      const existing = state.items.find((item) => item.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((it) => it.id === id);
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter((it) => it.id !== id);
        } else {
          item.quantity = quantity;
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    }
  }
});

const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer
  }
});

// --- Components ---
function Navbar() {
  const cartItems = useSelector((state) => state.cart.items);
  const totalCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <header style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "16px 24px",
      borderBottom: "1px solid var(--border)",
      background: "var(--bg)"
    }}>
      <Link to="/" style={{ fontSize: "20px", fontWeight: "bold", textDecoration: "none", color: "var(--text-h)" }}>
        🛒 TechStore
      </Link>
      <nav style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <Link to="/" style={{ textDecoration: "none", color: "var(--text)", fontWeight: 500 }}>
          Products
        </Link>
        <Link to="/cart" style={{
          textDecoration: "none",
          padding: "6px 14px",
          background: "var(--accent-bg)",
          color: "var(--accent)",
          borderRadius: "6px",
          border: "1px solid var(--accent-border)",
          fontWeight: 600,
          fontSize: "14px"
        }}>
          Cart ({totalCount})
        </Link>
      </nav>
    </header>
  );
}

function ProductList() {
  const dispatch = useDispatch();

  return (
    <div style={{ maxWidth: "960px", margin: "24px auto", padding: "0 16px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "8px" }}>Featured Products</h2>
      <p style={{ textAlign: "center", color: "var(--text)", marginBottom: "24px" }}>
        Built with React, Redux Toolkit & React Router
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "20px"
      }}>
        {PRODUCTS.map((product) => (
          <div key={product.id} style={{
            border: "1px solid var(--border)",
            borderRadius: "10px",
            padding: "20px",
            background: "var(--bg)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: "var(--shadow)"
          }}>
            <div style={{ textAlign: "center", marginBottom: "12px" }}>
              <div style={{ fontSize: "52px" }}>{product.emoji}</div>
              <h3 style={{ margin: "10px 0 6px", fontSize: "17px" }}>{product.name}</h3>
              <span style={{
                fontSize: "12px",
                background: "var(--social-bg)",
                padding: "2px 8px",
                borderRadius: "4px",
                color: "var(--text)"
              }}>
                {product.category}
              </span>
            </div>

            <p style={{ fontSize: "13px", color: "var(--text)", marginBottom: "16px", minHeight: "36px" }}>
              {product.description}
            </p>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "18px", fontWeight: "bold", color: "var(--text-h)" }}>
                ${product.price}
              </span>
              <div style={{ display: "flex", gap: "8px" }}>
                <Link to={`/product/${product.id}`} style={{
                  padding: "6px 10px",
                  fontSize: "12px",
                  textDecoration: "none",
                  border: "1px solid var(--border)",
                  borderRadius: "4px",
                  color: "var(--text)"
                }}>
                  Details
                </Link>
                <button
                  type="button"
                  onClick={() => dispatch(addToCart(product))}
                  style={{
                    padding: "6px 12px",
                    background: "var(--accent)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: 600
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const product = PRODUCTS.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <h2>Product Not Found</h2>
        <button onClick={() => navigate("/")} style={{ padding: "8px 16px", marginTop: "16px" }}>
          Back to Store
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "560px", margin: "40px auto", padding: "28px", border: "1px solid var(--border)", borderRadius: "12px", background: "var(--bg)", boxShadow: "var(--shadow)", textAlign: "center" }}>
      <div style={{ fontSize: "80px", marginBottom: "12px" }}>{product.emoji}</div>
      <h2>{product.name}</h2>
      <p style={{ color: "var(--accent)", fontWeight: 600, fontSize: "14px", margin: "4px 0" }}>{product.category}</p>
      <p style={{ color: "var(--text)", margin: "16px 0", lineHeight: 1.6 }}>{product.description}</p>
      <div style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "20px", color: "var(--text-h)" }}>${product.price}</div>
      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        <button onClick={() => navigate("/")} style={{ padding: "10px 18px", border: "1px solid var(--border)", borderRadius: "6px", background: "transparent", cursor: "pointer", color: "var(--text)" }}>
          ← Back
        </button>
        <button onClick={() => dispatch(addToCart(product))} style={{ padding: "10px 22px", background: "var(--accent)", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: 600 }}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((acc, it) => acc + it.price * it.quantity, 0);

  return (
    <div style={{ maxWidth: "600px", margin: "24px auto", padding: "20px" }}>
      <h2>Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", border: "1px solid var(--border)", borderRadius: "8px", marginTop: "16px" }}>
          <p style={{ color: "var(--text)", marginBottom: "16px" }}>Your cart is empty.</p>
          <button onClick={() => navigate("/")} style={{ padding: "8px 16px", background: "var(--accent)", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
            Shop Products
          </button>
        </div>
      ) : (
        <div style={{ marginTop: "16px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {cartItems.map((item) => (
              <div key={item.id} style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 16px",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                background: "var(--bg)"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontSize: "28px" }}>{item.emoji}</span>
                  <div>
                    <h4 style={{ margin: "0 0 4px" }}>{item.name}</h4>
                    <span style={{ fontSize: "14px", color: "var(--text)" }}>${item.price} each</span>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))} style={{ padding: "4px 8px", cursor: "pointer" }}>-</button>
                  <span style={{ fontWeight: 600, minWidth: "20px", textAlign: "center" }}>{item.quantity}</span>
                  <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))} style={{ padding: "4px 8px", cursor: "pointer" }}>+</button>
                  <button onClick={() => dispatch(removeFromCart(item.id))} style={{ marginLeft: "8px", color: "#ef4444", border: "none", background: "none", cursor: "pointer", fontSize: "16px" }}>✕</button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "24px", padding: "16px", borderTop: "2px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <span style={{ fontSize: "16px", color: "var(--text)" }}>Total: </span>
              <strong style={{ fontSize: "22px", color: "var(--text-h)" }}>${totalPrice.toFixed(2)}</strong>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => dispatch(clearCart())} style={{ padding: "8px 14px", border: "1px solid var(--border)", borderRadius: "6px", background: "transparent", cursor: "pointer", color: "var(--text)" }}>
                Clear
              </button>
              <button onClick={() => { alert(`Order placed for $${totalPrice.toFixed(2)}!`); dispatch(clearCart()); navigate("/"); }} style={{ padding: "8px 20px", background: "var(--accent)", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: 600 }}>
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </Provider>
  );
}
