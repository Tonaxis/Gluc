import React from 'react';
import './List.scss';
import Item from '../Item/Item';

function List({ data, setId }) {
    return (
      <div className="list-container">
        <div className="list">
          {data.map((food) => (
            <Item food={food} setId={setId} key={food.id} />
          ))}
        </div>
      </div>
    );
  }

export default List;
