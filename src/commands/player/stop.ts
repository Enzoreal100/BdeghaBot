import { getVoiceConnection } from "@discordjs/voice";
import { ChatInputCommandInteraction, Client, ConnectionService, SlashCommandBuilder } from "discord.js";
import { formatMessage } from "../../auxiliaries/message";
import { Etypes } from "../../constraints/Emessages";
import { distube } from "../..";

export const data = new SlashCommandBuilder()
  .setName("parar")
  .setDescription("Use para parar de tocar músicas")

export async function execute(
  client: Client,
  interaction: ChatInputCommandInteraction
) {
  const member = interaction.guild?.members.cache.get(interaction.user.id);
  const voiceChannel = member?.voice.channel;
  const connection = getVoiceConnection(interaction.guildId!);


  await interaction.deferReply();

  if(!voiceChannel) {
    return interaction.editReply(
      formatMessage(
        {
          type: Etypes.ERROR,
          content: "Você precisa estar em um canal de voz para parar o bot!"
        }
      )
    );
  }

  const queue = distube.getQueue(voiceChannel);
  if(!queue || !queue.playing) {
    return interaction.editReply(
      formatMessage(
        {
          type: Etypes.ERROR,
          content: "Não há músicas tocando!"
        }
      )
    );
  }

  queue.stop();
  distube.voices.leave(voiceChannel);  
  return interaction.editReply(
    formatMessage(
      {
        type: Etypes.SUCCESS,
        content: "Música parada!"
      }
    )
  );
 
}