import type { Client, Interaction } from "discord.js";

// Execute slash commands
export default async function handleInteraction(
  client: Client,
  interaction: Interaction
) {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) {
    console.warn(`No command matching "${interaction.commandName}"`);
    return;
  }

  try {
    console.log(`Executing ${interaction.commandName}`);
    await command.execute(client, interaction);
  } catch (err) {
    console.error(`[${interaction.commandName}] execution error:`, err);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp("❌ There was an error running this command!",);
    } else {
      await interaction.reply( "❌ There was an error running this command!");
    }
  }
}
