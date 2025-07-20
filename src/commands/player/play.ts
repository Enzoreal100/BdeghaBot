import { ChatInputCommandInteraction, Client, SlashCommandBuilder, VoiceChannel } from "discord.js";
import { format } from "path";
import { formatMessage } from "../../auxiliaries/message";
import { Etypes } from "../../constraints/Emessages";
import { createAudioPlayer, createAudioResource, joinVoiceChannel } from "@discordjs/voice";
import ytdl from "ytdl-core";

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


  if (!voiceChannel) {
    console.log(voiceChannel);
    return await interaction.reply(formatMessage({
      type: Etypes.ERROR,
      content: "Você precisa estar em um canal de voz para tocar músicas!"
    }));
  }

  const message: boolean = handlePlayer(music!);
  if (!message) {
    await interaction.reply(formatMessage({
      type: Etypes.ERROR,
      content: "URL inválida!"
    }));
    return;
  }

  const player = createAudioPlayer();
  const stream = ytdl(
    music, 
    { 
      filter: "audioonly",
      quality: "highestaudio",
      dlChunkSize: 0,
    }
  );
  const connection = joinVoiceChannel({
    channelId: voiceChannel.id,
    guildId: voiceChannel.guild.id,
    adapterCreator: voiceChannel.guild.voiceAdapterCreator,
  })
  const resource = createAudioResource(stream);
  player.play(resource);
  connection.subscribe(player);

  await interaction.reply(formatMessage({
    type: Etypes.SUCCESS,
    content: "Música tocando!"
  }));
}