const { Events } = require("discord.js");

module.exports = {
  name: Events.MessageReactionAdd,
  async execute(reaction, user, client) {
    logger.log(`New reaction by ${user.username}!`);
    if (user.bot) return;

    if (reaction.message.channel.id === process.env.MOD_CHANNEL_ID) {
      const messageContent = reaction.message.content;

      if (messageContent.startsWith("**New Mod Submission**")) {
        if (reaction.emoji.name === "✅") {
          await reaction.message.reply(
            `${user.username} approved the mod submission!`
          );
        } else if (reaction.emoji.name === "❌") {
          await reaction.message.reply(
            `${user.username} denied the mod submission!`
          );
        }

        await reaction.users.remove(user.id);
      }
    }
  },
};
