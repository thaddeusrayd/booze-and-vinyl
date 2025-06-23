import { readFile } from "node:fs/promises";
import { writeFile } from "node:fs/promises";

const DB_PATH = process.env.DB_PATH ?? "./db.json";

export async function readIngredients() {
  const text = await readFile(DB_PATH, "utf-8").catch(() => "{}");
  const data = text ? JSON.parse(text) : {};
  return data.ingredients ?? [];
}

export async function saveIngredients(list) {
  await writeFile(DB_PATH, JSON.stringify({ ingredients: list }, null, 2));
}
