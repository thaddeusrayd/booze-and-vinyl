// db.js
import { readFile, writeFile, cp, access } from "node:fs/promises";
import path from "node:path";

const DB_PATH = process.env.DB_PATH ?? "/app/data/db.json"; // volume path
const SEED_PATH = path.resolve("./db.json"); // repo copy

async function ensureSeed() {
  try {
    await access(DB_PATH); // already exists?  do nothing
  } catch {
    await cp(SEED_PATH, DB_PATH); // copy once
    console.log("Seeded db.json into volume");
  }
}

export async function readIngredients() {
  await ensureSeed();
  const text = await readFile(DB_PATH, "utf-8");
  return JSON.parse(text).ingredients ?? [];
}

export async function saveIngredients(list) {
  await writeFile(DB_PATH, JSON.stringify({ ingredients: list }, null, 2));
}
