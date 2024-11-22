import express from "express";
import TopicHandler from "./topicHandler";
import { DynamicJSON, IOutput } from "./interfaces/IUser";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  const topicHandler = new TopicHandler();
  const data: DynamicJSON = {
    id: 1,
    name: "Ram Kushwaha",
    roles: ["developer", "lead"],
    active: true,
    profile: {
      age: 35,
      country: "India",
      nickname: "Ram", // Dynamic field
    },
    skills: ["PHP", "JavaScript", "Python"], // Additional field in user
  };

  // Example: Choose the output type dynamically
  const outputType: IOutput = "html"; // Could be 'json', 'html', 'csv', 'text', etc.

  topicHandler
    .process(data, outputType)
    .then((result: any) => {
      res.send(result); // Output based on the selected handler
    })
    .catch((err: any) => {
      res.send({ response: "Error handling data:", error: err });
    });
});

app.listen(port, () => {
  console.log(`Sandbox listening on port ${port}`);
});
