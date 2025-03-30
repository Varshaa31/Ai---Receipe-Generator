import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IngredientInput from "./components/IngredientInput";
import RecipeList from "./components/RecipeList";
import RecipeDetail from "./components/RecipeDetail";
import axios from "axios";

function App() {
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async (ingredients) => {
    try {
      const response = await axios.get("http://localhost:5000/api/recipes", {
        params: { ingredients },
      });

      const fetchedRecipes = Array.isArray(response.data.recipes) ? response.data.recipes : [];
      setRecipes(fetchedRecipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  return (
    <Router>
      <div>
        <h1>AI-Powered Meal Planner</h1>
        <Routes>
          <Route path="/" element={
            <>
              <IngredientInput onSearch={fetchRecipes} />
              <RecipeList recipes={recipes} />
            </>
          } />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;



