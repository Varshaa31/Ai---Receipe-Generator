require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors()); // Allow frontend to access backend
app.use(express.json()); // Parse JSON requests

// Import routes
const recipeRoutes = require("./routes/recipes");
app.use("/api", recipeRoutes); // 👈 This makes sure /api/recipes works

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
