import React, { useState } from "react";
import "./App.css";

const menuItems = [
  {
    id: 1,
    name: "Cappuccino",
    price: 120,
    img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93"
  },
  {
    id: 2,
    name: "Latte",
    price: 140,
    img: "https://images.unsplash.com/photo-1523942839745-7848d6c5b4a4"
  },
  {
    id: 3,
    name: "Espresso",
    price: 100,
    img: "https://images.unsplash.com/photo-1511920170033-f8396924c348"
  },
  {
    id: 4,
    name: "Mocha",
    price: 160,
    img: "https://images.unsplash.com/photo-1507133750040-4a8f57021571"
  },
  {
    id: 5,
    name: "Cold Coffee",
    price: 150,
    img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735"
  },
  {
    id: 6,
    name: "Brownie",
    price: 90,
    img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c"
  }
];

export default function App() {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const filteredItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (item) => {
    const exist = cart.find(c => c.id === item.id);
    if (exist) {
      setCart(cart.map(c =>
        c.id === item.id ? { ...c, qty: c.qty + 1 } : c
      ));
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  const updateQty = (id, type) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        if (type === "inc") return { ...item, qty: item.qty + 1 };
        if (type === "dec" && item.qty > 1)
          return { ...item, qty: item.qty - 1 };
      }
      return item;
    }));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className={darkMode ? "container dark" : "container"}>
      
      {/* HEADER */}
      <div className="header">
        <h1>🌸 Café Petals</h1>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>

      {/* ABOUT */}
      <section className="about">
        <h2>About Us</h2>
        <p>
          Welcome to Café Petals ☕ — a cozy place where coffee meets comfort.
          We serve freshly brewed coffee, delicious snacks, and a relaxing
          atmosphere for friends and families.
        </p>
      </section>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search coffee..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search"
      />

      {/* MENU */}
      <div className="menu">
        {filteredItems.map(item => (
          <div key={item.id} className="card">
            <img src={item.img} alt={item.name} />
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>
            <button onClick={() => addToCart(item)}>Add</button>
          </div>
        ))}
      </div>

      {/* CART */}
      <div className="cart">
        <h2>🛒 Cart</h2>

        {cart.length === 0 && <p>No items added</p>}

        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <span>{item.name}</span>

            <div>
              <button onClick={() => updateQty(item.id, "dec")}>-</button>
              <span>{item.qty}</span>
              <button onClick={() => updateQty(item.id, "inc")}>+</button>
            </div>

            <span>₹{item.price * item.qty}</span>
          </div>
        ))}

        <h3>Total: ₹{total}</h3>
        <button className="order-btn">Place Order</button>
      </div>

      {/* LOCATION */}
      <section className="location">
        <h2>📍 Our Location</h2>
        <iframe
          title="map"
          src="https://www.google.com/maps?q=coffee%20shop&output=embed"
          width="100%"
          height="250"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </section>

    </div>
  );
}