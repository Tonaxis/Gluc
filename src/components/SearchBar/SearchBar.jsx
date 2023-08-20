import React, { useState } from 'react';
import './SearchBar.scss';

function SearchBar({ setFilter }) {
    const [filterText, setFilterText] = useState('');

    return (
        <form className="search-bar" onSubmit={(e) => {
            e.preventDefault()
            setFilter(filterText);
        }}>
            <input
                className="search-bar_field"
                type="text"
                placeholder="Rechercher un aliment..."
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                />
            <button className="search-bar_button" type="submit">🔍</button>
        </form>
    );
}

export default SearchBar;