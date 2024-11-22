import handlerRegistry from "./handlerRegistry";
import { IOutput } from "./interfaces/IUser";

class Handler {
  // handle method will look up and load handler dynamically from the registry
  async handle(data: any, outputType: IOutput) {
    const handlerLoader = handlerRegistry[outputType];

    if (!handlerLoader) {
      throw new Error(`No handler found for output type: ${outputType}`);
    }

    // Lazy load the handler and instantiate it
    const handlerModule = await handlerLoader();
    const HandlerClass = handlerModule.default; // Get the default export (class)
    const handlerInstance = new HandlerClass(); // Instantiate the handler
    return handlerInstance.handle(data);
  }
}

export default Handler;
