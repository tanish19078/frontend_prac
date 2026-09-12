import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import {link} from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Products from "./Products";
import Checkout from "./Checkout";
import { useParams } from "react-router-dom";


function App() {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('/api/cart')
            .then((response) => response.json())
            .then((data) => setCart(data))
            .catch((error) => console.error('Error fetching cart:', error));
    }, []);

    useEffect(() => {
        if (cart.length > 0) {
            navigate('/checkout');
        }
    }, [cart, navigate]);

    const deleteFromCart = (index) => {
        const updatedCart = cart.filter((_, i) => i !== index);
        setCart(updatedCart);
    };

    return (
        <div>
            <h1>Welcome to the Shop</h1>
            <button onClick={() => navigate('/products')}>Go to Products</button>
            
            <ul>
                {cart.map((product, index) => (
                    <li key={`${product.id}-${index}`}>
                        {product.name} - ${product.price.toFixed(2)}
                        <button onClick={() => deleteFromCart(index)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
<Routes>
    <Route path="/" element={<App />} />
    <Route path="/products" element={<Products />} />
    <Route path="/checkout" element={<Checkout />} />
    {products.map((product) => (
        <Route
            key={product.id}
            path={`/products/${product.id}`}
            element={<ProductDetails product={product} />}
        />
    ))}
    
</Routes>



export default App;