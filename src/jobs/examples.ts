import { OpenAI } from "@trigger.dev/openai";
import { eventTrigger } from "@trigger.dev/sdk";
import { client } from "~/trigger";

const openai = new OpenAI({
  id: "openai",
  apiKey: process.env.OPENAI_API_KEY!,
});

// Your first job
// This Job will be triggered by an event, log a joke to the console, and then wait 5 seconds before logging the punchline
client.defineJob({
  // This is the unique identifier for your Job, it must be unique across all Jobs in your project
  id: "example-job",
  name: "Example Job: a joke with a delay",
  version: "0.0.1",
  // This is triggered by an event using eventTrigger. You can also trigger Jobs with webhooks, on schedules, and more: https://trigger.dev/docs/documentation/concepts/triggers/introduction
  trigger: eventTrigger({
    name: "example.event",
  }),
  integrations: {
    openai,
  },
  run: async (payload, io, ctx) => {
    //this background function can take longer than a serverless timeout
    const response = await io.openai.backgroundCreateChatCompletion(
      "background-chat-completion",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: "Create a good programming joke about background jobs",
          },
        ],
      }
    );
  },
});
