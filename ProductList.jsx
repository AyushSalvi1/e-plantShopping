import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://images.unsplash.com/photo-1593482892290-f54927ae1bf6?q=80&w=300", cost: "$15" },
        { name: "Spider Plant", image: "https://images.unsplash.com/photo-1572688484438-313a6e50c333?q=80&w=300", cost: "$12" }
      ]
    },
    {
      category: "Aromatic Plants",
      plants: [
        { name: "Lavender", image: "https://images.unsplash.com/photo-1596130456108-e4eb2e3a0b38?q=80&w=300", cost: "$18" },
        { name: "Jasmine", image: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?q=80&w=300", cost: "$20" }
      ]
    },
    {
      category: "Low Maintenance Plants",
      plants: [
        { name: "Aloe Vera", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?q=80&w=300", cost: "$10" },
        { name: "ZZ Plant", image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?q=80&w=300", cost: "$22" }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prevState) => ({ ...prevState, [plant.name]: true }));
  };

  return (
    <div>
      <nav className="navbar">
        <h1 onClick={() => setShowCart(false)}>Paradise Nursery</h1>
        <div onClick={() => setShowCart(true)} className="cart-icon">
          🛒 <span>{totalQuantity}</span>
        </div>
      </nav>

      {showCart ? (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      ) : (
        <div className="product-grid">
          {plantsArray.map((categoryObj, index) => (
            <div key={index}>
              <h2>{categoryObj.category}</h2>
              <div className="plants-list">
                {categoryObj.plants.map((plant, pIndex) => (
                  <div key={pIndex} className="plant-card">
                    <img src={plant.image} alt={plant.name} width="150" />
                    <h3>{plant.name}</h3>
                    <p>{plant.cost}</p>
                    <button
                      disabled={addedToCart[plant.name]}
                      onClick={() => handleAddToCart(plant)}
                    >
                      {addedToCart[plant.name] ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList; 