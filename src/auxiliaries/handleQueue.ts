import { ChatInputCommandInteraction } from "discord.js";
import { Queue } from "distube";
import { formatMessage } from "../../auxiliaries/message";
import { Etypes } from "../../constraints/Emessages";

export const handleQueue = (
  interaction: ChatInputCommandInteraction,
  queue: Queue
) => {
  const songs = queue.songs.map((song, i) => `${i + 1}. ${song.name} - \`${song.formattedDuration}\``).join("\n");

  return interaction.followUp(
    formatMessage(
      {
        type: Etypes.SUCCESS,
        content: `**Fila de músicas:**\n${songs}`
      }
    )
  );
}