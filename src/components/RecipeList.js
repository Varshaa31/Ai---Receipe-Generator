import React from "react";
import { Link } from "react-router-dom";

const RecipeList = ({ recipes }) => {
  return (
    <div>
      <h2>Recipes</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {recipes.map((recipe) => (
          <div 
            key={recipe.id} 
            style={{ 
              width: "220px", 
              padding: "10px", 
              border: "1px solid #ddd", 
              borderRadius: "10px",
              textAlign: "center"
            }}
          >
            <h3 style={{ fontSize: "16px" }}>{recipe.title}</h3>
            <Link to={`/recipe/${recipe.id}`}>
              <img 
                src={recipe.image} 
                alt={recipe.title} 
                style={{ width: "100%", borderRadius: "10px", cursor: "pointer" }} 
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;




