import express from "express";
import { readIngredients } from "./db.js";

const app = express();
const PORT = 3000;

app.get("/ingredients", async (req, res) => {
  const ingredients = await readIngredients();
  res.json(ingredients);
});

app.listen(PORT, () => {
  console.log(`Booze & Vinyl API is listening on http://localhost:${PORT}`);
});
