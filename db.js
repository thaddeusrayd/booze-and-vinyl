import { access } from "node:fs";
import { readFile } from "node:fs/promises";
import { writeFile } from "node:fs/promises";

const DB_PATH = process.env.DB_PATH ?? "./db.json";
const SEED_PATH = path.resolve("./db.json");

async function ensureFeed() {
  try {
    await access(DB_PATH);
  } catch {
    await cp(SEED_PATH, DB_PATH);
    console.log("Database seeded from default file.");
  }
}

export async function readIngredients() {
  await ensureFeed();
  const text = await readFile(DB_PATH, "utf-8");
  return JSON.parse(text).ingredients ?? [];
}

export async function saveIngredients(list) {
  await writeFile(DB_PATH, JSON.stringify({ ingredients: list }, null, 2));
}
