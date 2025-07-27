import { ChatInputCommandInteraction, Client, SlashCommandBuilder } from "discord.js";
import { distube } from "../..";
import { formatMessage } from "../../auxiliaries/message";
import { Etypes } from "../../constraints/Emessages";
import { handleQueue } from "../../auxiliaries/handleQueue";

export const data = new SlashCommandBuilder()
  .setName("pular")
  .setDescription("Use para pular músicas");

export async function execute(
  client: Client,
  interaction: ChatInputCommandInteraction
){
  const member = interaction.guild?.members.cache.get(interaction.user.id);
  let queue = distube.getQueue(member?.voice.channel!);

  await interaction.deferReply();

  if(!queue || !queue.songs.length) {
    return interaction.editReply(
      formatMessage(
        {
          type: Etypes.ERROR,
          content: "Não há músicas na fila"
        }
      )
    )
  }

  if(queue.songs.length === 1) {
    interaction.editReply(
      formatMessage(
        {
          type: Etypes.SUCCESS,
          content: "Não há próximas músicas"
        }
      )
    )
    queue.stop();
    return;
  }

  await distube.skip(member?.voice.channel!);
  queue.songs.splice(0, 1);
  interaction.editReply(
    formatMessage(
      {
        type: Etypes.SUCCESS,
        content: "Música pulada com sucesso"
      }
    )
  )
  
  handleQueue(interaction, queue);

};