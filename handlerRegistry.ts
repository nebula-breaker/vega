import path from "path";
import fs from "fs";

// Create a handler registry that will hold the dynamic imports
const handlerRegistry: any = {};

// Dynamically discover handler files from the 'handlers' directory
const handlersDirectory = path.join(__dirname, "handlers");

// Read all files in the 'handlers' directory
fs.readdirSync(handlersDirectory).forEach((file) => {
  // Only include files that end with 'Handler.js' (assuming handlers are named like `htmlHandler.js`)
  if (file.endsWith("Handler.ts")) {
    const handlerName = file.replace("Handler.ts", "").toLowerCase(); // Extract handler type
    const handlerPath = path.join(handlersDirectory, file);

    // Register the handler in the registry, pointing to the dynamic import function
    handlerRegistry[handlerName] = () => import(handlerPath);
  }
});

export default handlerRegistry;
