import { ChatInputCommandInteraction } from "discord.js";
import { Queue } from "distube";
import { formatMessage } from "./message";
import { Etypes } from "../constraints/Emessages";
import { distube } from "..";


export const handleQueue = (
  interaction: ChatInputCommandInteraction,
  queue: Queue
) => {

  if (queue.songs.length === 0){
    return interaction.followUp(
      formatMessage(
        {
          type: Etypes.SUCCESS,
          content: "Não há próximas músicas na fila"
        }
      )
    );
  }
  const nowPlaying = `Tocando agora: ${queue.songs[0].name} - \`${queue.songs[0].formattedDuration}\``;
  const songs = queue.songs
    .slice(1)
    .map((song, i) => `${i + 1}. ${song.name} - \`${song.formattedDuration}\``)
      .join("\n");

  const finalQueue = [nowPlaying, songs].join("\n");

  return interaction.followUp(
    formatMessage(
      {
        type: Etypes.SUCCESS,
        content: `**Fila de músicas:**\n${finalQueue}`
      }
    )
  );
}