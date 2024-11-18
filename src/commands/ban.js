const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban a user from the server.")
    .addUserOption((option) =>
      option.setName("user").setDescription("The user to ban").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Reason for the ban")
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  async execute(interaction) {
    const targetUser = interaction.options.getUser("user");
    const reason =
      interaction.options.getString("reason") || "No reason provided";
    const member = interaction.guild.members.cache.get(targetUser.id);

    if (!member) {
      return interaction.reply({
        content: "User not found in this server.",
        ephemeral: true,
      });
    }

    try {
      await member.ban({ reason });
      interaction.reply({
        content: `Successfully banned ${targetUser.tag}. Reason: ${reason}`,
      });
    } catch (error) {
      console.error(error);
      interaction.reply({
        content: `Failed to ban ${targetUser.tag}.`,
        ephemeral: true,
      });
    }
  },
};
