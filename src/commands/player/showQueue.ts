import { ChatInputCommandInteraction, Client, SlashCommandBuilder } from "discord.js";
import { distube } from "../..";
import { formatMessage } from "../../auxiliaries/message";
import { Etypes } from "../../constraints/Emessages";
import { handleQueue } from "../utility/handleQueue";

export const data = new SlashCommandBuilder()
  .setName("fila")
  .setDescription("Use para ver a fila de músicas");

export async function execute(
  client: Client,
  interaction: ChatInputCommandInteraction
) {
  const member = interaction.guild?.members.cache.get(interaction.user.id);
  const queue = distube.getQueue(member?.voice.channel!);
  
  await interaction.deferReply();
  if(!queue || !queue.songs.length) {
    return interaction.editReply(
      formatMessage(
        {
          type: Etypes.ERROR,
          content: "Não há músicas na fila!"
        }
      )
    );
  };
  return handleQueue(interaction, queue);


  
};