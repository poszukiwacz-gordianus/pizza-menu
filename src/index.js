import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

export default function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>Fast React Pizza Co.</h1>
    </header>
  );
}

function Menu() {
  const pizzas = pizzaData;
  const numPizzas = pizzas.length;

  return (
    <main className="menu">
      <h2>Our Menu</h2>

      {numPizzas > 0 ? (
        <>
          <p>
            Authentic Italian couisine. 6 creative dishes to choose from. All
            from our stone oven, all organic, all delicious.
          </p>
          <ul className="pizzas">
            {pizzas.map((pizza) => (
              <Pizza pizzaObjct={pizza} key={pizza.name} />
            ))}
          </ul>
        </>
      ) : (
        <h4>Pizza out of stock!</h4>
      )}
    </main>
  );
}

function Pizza({ pizzaObjct }) {
  // if (pizzaObjct.soldOut) return null;

  return (
    <li className={`pizza${pizzaObjct.soldOut ? " sold-out" : ""}`}>
      <img src={pizzaObjct.photoName} alt="Pizza" />
      <div>
        <h3>{pizzaObjct.name}</h3>
        <p>{pizzaObjct.ingredients}</p>
        <span>
          {pizzaObjct.soldOut ? "SOLD OUT" : `Price: ${pizzaObjct.price}$`}
        </span>
      </div>
    </li>
  );
}

function Footer() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const openHour = 12;
  const closeHour = 22;
  const isOpen =
    time.split(":")[0] >= openHour && time.split(":")[0] < closeHour;

  useEffect(() => {
    setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
  }, []);

  return (
    <footer className="footer">
      <Order
        openHour={openHour}
        closeHour={closeHour}
        isOpen={isOpen}
        time={time}
      />
    </footer>
  );
}

function Order({ openHour, closeHour, isOpen, time }) {
  return (
    <div className="order">
      <p>
        It's <strong>{time}</strong> at that time we are
        {isOpen ? (
          <span>
            <strong> open.</strong> We're closing at{" "}
            <strong>{closeHour}:00</strong>.
          </span>
        ) : (
          <span>
            <strong> closed.</strong> We're open again at
            <strong> {openHour}:00</strong>.
          </span>
        )}
      </p>
      <button className="btn">Order</button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
