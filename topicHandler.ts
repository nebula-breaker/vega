import Handler from "./handler";
import { DynamicJSON, IOutput } from "./interfaces/IUser";

class TopicHandler {
  private handler: Handler;

  constructor() {
    this.handler = new Handler();
  }

  async process(data: DynamicJSON, outputType: IOutput) {
    return await this.handler.handle(data, outputType);
  }
}

export default TopicHandler;
