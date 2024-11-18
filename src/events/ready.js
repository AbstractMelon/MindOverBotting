const logger = require("../utils/logger");

module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    logger.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity("Moderation and Mod Management", {
      type: "WATCHING",
    });
  },
};
