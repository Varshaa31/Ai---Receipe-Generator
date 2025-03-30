const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();
const API_KEY = process.env.API_KEY;

// ✅ Route to get recipes based on ingredients
router.get("/recipes", async (req, res) => {
  try {
    const { ingredients } = req.query;

    const response = await axios.get("https://api.spoonacular.com/recipes/findByIngredients", {
      params: {
        ingredients,
        apiKey: API_KEY,
      },
    });

    res.json({ recipes: response.data });
  } catch (error) {
    console.error("Error fetching recipes:", error.message);
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
});

// ✅ Route to get detailed recipe information
router.get("/recipe/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
      params: {
        apiKey: API_KEY,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching recipe details:", error.message);
    res.status(500).json({ error: "Failed to fetch recipe details" });
  }
});

module.exports = router;



