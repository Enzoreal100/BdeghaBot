import { Etypes } from "./Emessages";

export interface Imessage {
  type: Etypes;
  content: string;
}