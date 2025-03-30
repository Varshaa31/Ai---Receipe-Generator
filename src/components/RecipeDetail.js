import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipeDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/recipe/${id}`);
        console.log("Recipe Detail Response:", response.data);
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
        setError("Failed to fetch recipe details.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetail();
  }, [id]);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!recipe) return <p className="text-center text-gray-500">No recipe details available.</p>;

  // 🎥 Generate a YouTube search URL based on the recipe title
  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(recipe.title)}+recipe`;

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 my-8 text-center">
      <h2 className="text-3xl font-bold mb-4">{recipe.title || "Unnamed Recipe"}</h2>

      {recipe.image && (
        <div className="flex justify-center">
          <img 
            src={recipe.image} 
            alt={recipe.title} 
            className="w-3/4 md:w-1/2 lg:w-1/3 object-cover rounded-lg shadow-md"
          />
        </div>
      )}

      <h3 className="text-2xl font-semibold mt-6">Ingredients:</h3>
      <ul className="list-disc list-inside text-lg text-gray-700 mt-2 text-left mx-auto w-3/4">
        {recipe.extendedIngredients && recipe.extendedIngredients.length > 0 ? (
          recipe.extendedIngredients.map((ingredient) => (
            <li key={ingredient.id}>{ingredient.original}</li>
          ))
        ) : (
          <p className="text-gray-500">No ingredients available.</p>
        )}
      </ul>

      <h3 className="text-2xl font-semibold mt-6">Instructions:</h3>
      {recipe.instructions ? (
        <div 
          className="text-lg text-gray-700 mt-2 text-left mx-auto w-3/4"
          dangerouslySetInnerHTML={{ __html: recipe.instructions }} 
        />
      ) : (
        <p className="text-gray-500">No instructions available.</p>
      )}

      {/* 🎥 YouTube Search Link */}
      <div className="mt-6">
        <a 
          href={youtubeSearchUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-600 font-bold hover:underline text-lg"
        >
          📺 Watch "{recipe.title}" Recipe on YouTube
        </a>
      </div>
    </div>
  );
}

export default RecipeDetail;
