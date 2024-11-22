import { DynamicJSON, IHandler } from "../interfaces/IUser";

class TextHandler implements IHandler {
  constructor() {
    console.log("TextHandler");
  }

  handle(data: DynamicJSON) {
    return JSON.stringify(data);
  }
}

export default TextHandler;
