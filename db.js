import { readFile } from "node:fs/promises";

const DB_PATH = "./db.json";

export async function readIngredients() {
  const text = await readFile(DB_PATH, "utf-8").catch(() => "{}");
  const data = text ? JSON.parse(text) : {};
  return data.ingredients ?? [];
}
