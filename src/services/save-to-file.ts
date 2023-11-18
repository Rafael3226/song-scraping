import { promises as fs } from "fs";

export async function saveToFile(filePath: string, content: string) {
  try {
    await fs.writeFile(filePath, content);
    console.log(`File "${filePath}" has been saved.`);
  } catch (err) {
    console.error("Error writing file:", err);
  }
}
