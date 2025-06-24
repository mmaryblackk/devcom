import { wait } from "./fetchData";

export async function loadFromLocalStorage<T>(): Promise<T> {
  try {
    await wait(1800);
    const item = localStorage.getItem("cards");
    return item ? (JSON.parse(item) as T) : ([] as T);
  } catch (error) {
    console.error("Error reading cards from localStorage:", error);
    return [] as T;
  }
}

export function saveToLocalStorage<T>(value: T) {
  try {
    localStorage.setItem("cards", JSON.stringify(value));
  } catch (error) {
    console.error("Error saving cards to localStorage:", error);
  }
}
