import { ChatInputCommandInteraction, Client, SlashCommandBuilder } from "discord.js";
import { distube } from "../..";
import { formatMessage } from "../../auxiliaries/message";
import { Etypes } from "../../constraints/Emessages";
import { handleQueue } from "../../auxiliaries/handleQueue";

export const data = new SlashCommandBuilder()
  .setName("pause")
  .setDescription("Pausa/retoma a música parada");

export async function execute(
  client: Client,
  interaction: ChatInputCommandInteraction
) {
  const member = interaction.guild?.members.cache.get(interaction.user.id);
  const voiceChannel = member?.voice.channel;
  const queue = distube.getQueue(voiceChannel);

  await interaction.deferReply();

  if (!queue){
    return interaction.editReply(
      formatMessage(
        {
          type: Etypes.ERROR,
          content: "Não há músicas na fila!"
        }
      )
    );
  };

  if (queue.paused) {
    distube.resume(voiceChannel);
    interaction.editReply(
      formatMessage(
        {
          type: Etypes.SUCCESS,
          content: "Música retomada"
        }
      )
    );
    handleQueue(interaction, queue);
    return;
  } else {
    distube.pause(voiceChannel);
    return interaction.editReply(
      formatMessage(
        {
          type: Etypes.SUCCESS,
          content: "Música pausada"
        }
      )
    );
  }

}