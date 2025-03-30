import React, { useState } from 'react';

function IngredientInput({ onSearch }) {
    const [ingredients, setIngredients] = useState("");

    const handleSearch = () => {
        console.log("Search clicked, ingredients:", ingredients); // Debugging
        onSearch(ingredients);
    };

    return (
        <div>
            <input
                type="text"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="Enter ingredients"
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
}

export default IngredientInput;



