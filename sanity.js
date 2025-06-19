import { readIngredients } from "./db.js";

const bar = await readIngredients();
console.log("Current bar:", bar);
