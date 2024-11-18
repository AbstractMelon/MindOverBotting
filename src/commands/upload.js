const { SlashCommandBuilder } = require("discord.js");
const logger = require("../utils/logger");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("upload")
    .setDescription("Upload a mod for approval.")
    .addStringOption((option) =>
      option.setName("name").setDescription("Mod name").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("description")
        .setDescription("Mod description")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("version").setDescription("Mod version").setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("author").setDescription("Mod author").setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("link").setDescription("Download link").setRequired(true)
    ),

  async execute(interaction) {
    const modName = interaction.options.getString("name");
    const modDescription = interaction.options.getString("description");
    const modVersion = interaction.options.getString("version");
    const modAuthor = interaction.options.getString("author");
    const modLink = interaction.options.getString("link");

    const modChannel = await interaction.guild.channels.fetch(
      process.env.MOD_CHANNEL_ID
    );
    if (!modChannel) {
      logger.error("Mod channel not found.");
      return interaction.reply({
        content: "Mod approval channel not found!",
        ephemeral: true,
      });
    }

    await modChannel.send(
      `**New Mod Submission**\nName: ${modName}\nAuthor: ${modAuthor}\nVersion: ${modVersion}\nDescription: ${modDescription}\nLink: ${modLink}\nReact ✅ to approve or ❌ to deny.`
    );

    return interaction.reply({
      content: "Your mod has been submitted for approval.",
      ephemeral: true,
    });
  },
};
