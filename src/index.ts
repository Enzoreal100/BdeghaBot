import dotenv from 'dotenv';
import { Client, IntentsBitField, Partials } from 'discord.js';
import eventHandler from './handlers/eventHandler';
import ffmpeg from 'ffmpeg-static';
// import { setFfmpegPath } from 'ytdl-core/lib/utils';
import ytdl from 'ytdl-core';


dotenv.config();

const client: Client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMessageReactions
  ],
  partials: [
    Partials.Channel,
    Partials.Message,
    Partials.Reaction,
    Partials.User
  ],
});

(async () => {
  try {
    eventHandler(client);
    await client.login(process.env.TOKEN!);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
})();

console.log(process.env.FFMPEG_PATH);


