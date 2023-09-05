
import { TriggerClient } from "@trigger.dev/sdk";

export const client = new TriggerClient({
  id: "t3-app-OM8x",
  apiKey: process.env.TRIGGER_API_KEY,
  apiUrl: process.env.TRIGGER_API_URL,
});
  