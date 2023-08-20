import React from 'react';
import './Item.scss';

function Item({ food, setId }) {
  const handleClick = (id) => {
    setId(id);
  }

  return (
    <div className="product" key={food.id} onClick={() => handleClick(food.id)}>
        <img className="product_image" src={food.image} alt={food.product_name} />
        <div className="product_info">
        <div className="product_title">
            <p className="product_name">{food.product_name}</p>
            <p className="product_brands">{food.brands}</p>
        </div>
        <p className="product_generic">{food.generic_name}</p>
        </div>
        <p className="product_glucides">{food.carbohydrates}g</p>
    </div>
  );
}

export default Item;