import express from "express";
import { readIngredients, saveIngredients } from "./db.js";
import cors from "cors";

const app = express();
const PORT = process.env.port ?? 3000;

app.use(express.static("public"));
app.use(cors());
app.use(express.json());

app.get("/ingredients", async (req, res) => {
  const ingredients = await readIngredients();
  res.json(ingredients);
});

app.post("/contributions", async (req, res) => {
  const { ingredient, ozAmount } = req.body;

  if (!ingredient || !ozAmount) {
    return res
      .status(400)
      .json({ error: "Ingredient and amount are required" });
  }

  const bar = await readIngredients();
  const item = bar.find((i) => i.ingredient === ingredient);

  if (item) {
    item.amountAcquired += Number(ozAmount);
  } else {
    bar.push({
      ingredient,
      amountAcquired: Number(ozAmount),
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
