import { getVoiceConnection } from "@discordjs/voice";
import { ChatInputCommandInteraction, Client, ConnectionService, SlashCommandBuilder } from "discord.js";
import { formatMessage } from "../../auxiliaries/message";
import { Etypes } from "../../constraints/Emessages";

export const data = new SlashCommandBuilder()
  .setName("parar")
  .setDescription("Use para parar de tocar músicas")

export async function execute(
  client: Client,
  interaction: ChatInputCommandInteraction
) {
  const connection = getVoiceConnection(interaction.guildId!);
  if (connection) {
    connection.destroy();
    await interaction.reply(formatMessage({
      type: Etypes.SUCCESS,
      content: "Música parada!"
    }));
  }
  
}