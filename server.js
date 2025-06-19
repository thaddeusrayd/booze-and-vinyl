import express from "express";
import { readIngredients, saveIngredients } from "./db.js";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/ingredients", async (req, res) => {
  const ingredients = await readIngredients();
  res.json(ingredients);
});

app.post("/contributions", async (req, res) => {
  const { ingredient, amountOz } = req.body;

  if (!ingredient || !amountOz) {
    return res
      .status(400)
      .json({ error: "Ingredient and amount are required" });
  }

  const bar = await readIngredients();
  const item = bar.find((i) => i.ingredient === ingredient);

  if (item) {
    item.amountAcquired += Number(amountOz);
  } else {
    bar.push({
      ingredient,
      amountAcquired: Number(amountOz),
      amountNeeded: 1,
      unit: "oz",
    });
  }

  await saveIngredients(bar);
  res.json(bar);
});

app.listen(PORT, () => {
  console.log(`Booze & Vinyl server is running on http://localhost:${PORT}`);
});
