import { DynamicJSON, IHandler } from "../interfaces/IUser";

class JsonHandler implements IHandler {
  constructor() {
    console.log("JsonHandler");
  }

  handle(data: DynamicJSON) {
    return data;
  }
}

export default JsonHandler;
