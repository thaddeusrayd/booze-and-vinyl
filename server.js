import express from "express";
import { readIngredients, saveIngredients } from "./db.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use((req, _res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(cors());
app.use(express.json());

app.get("/ingredients", async (_req, res) => {
  console.log("ingredients handler reached");
  res.json(await readIngredients());
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

app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Booze & Vinyl server is running on http://localhost:${PORT}`);
});
