import { app } from "./app";

export async function main() {
  try {
    app();
  } catch (error) {
    console.error(error);
  }
}

main();
