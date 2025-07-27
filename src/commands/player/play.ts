import { ChatInputCommandInteraction, Client, SlashCommandBuilder, VoiceChannel } from "discord.js";
import { formatMessage } from "../../auxiliaries/message";
import { Etypes } from "../../constraints/Emessages";
import ytdl from "ytdl-core";
import { distube } from "../..";
import { Queue } from "distube";
import { handleQueue } from "../../auxiliaries/handleQueue";


export const data = new SlashCommandBuilder()
  .setName("tocar")
  .setDescription("Use para tocar músicas")
  .addStringOption(
    (option) => 
    option.setName("musica")
      .setDescription("Nome da música")
      .setRequired(true)
    );

const handlePlayer = (music: string) => {
  if (!music || !ytdl.validateURL(music)) {
    return false;
  }
  return true;
}

export async function execute(
  client: Client,
  interaction: ChatInputCommandInteraction
) {
  const member = interaction.guild?.members.cache.get(interaction.user.id);
  const music = interaction.options.getString("musica");
  const voiceChannel = member?.voice.channel as VoiceChannel;

  await interaction.deferReply();
  if (!voiceChannel) {
    return interaction.editReply(
      formatMessage(
        {
          type: Etypes.ERROR,
          content: "Você precisa estar em um canal de voz para tocar músicas!"
        }
      )
    );
  }

  
  const isMusicValid: boolean = handlePlayer(music!);
  if (!isMusicValid) {
    interaction.editReply(
      formatMessage(
        {
          type: Etypes.ERROR,
          content: "URL inválida!"
        }
      )
    );
    return;
  }

  console.log(`Música adicionada: ${music}`);

  await distube.play(voiceChannel, music!);
  const queue = distube.getQueue(voiceChannel);
  interaction.editReply(
    formatMessage(
      {
        type: Etypes.SUCCESS,
        content: "Música tocando!" + music
      }
    )
  );
  handleQueue(interaction, queue!);
  return;
}