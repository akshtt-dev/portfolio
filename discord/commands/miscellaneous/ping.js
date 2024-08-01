import { EmbedBuilder } from "discord.js";

export const data = {
  name: "ping",
  description: "Replies with Pong!",
};

export async function execute(message, args) {
  try {
    const embed = new EmbedBuilder()
      .setColor("#0099ff")
      .setDescription(`Pong! ${message.client.ws.ping}ms`);

    await message.channel.send({ embeds: [embed] });
  } catch (error) {
    console.error("Error executing ping command:", error);
    if (message.channel) {
      await message.channel.send(
        "There was an error trying to execute that command!"
      );
    }
  }
}
