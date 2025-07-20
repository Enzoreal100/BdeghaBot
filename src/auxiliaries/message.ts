import { Imessage } from "../constraints/Imessages";

export const formatMessage = (content: Imessage) => {
  if (content.type === "err") {
    return `❌ ${content.content}`;
  }
  return `✅ ${content.content}`;
}