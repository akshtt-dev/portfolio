import express from "express";
import { engine } from "express-handlebars";
import mongoose from "mongoose";
import { join, dirname } from "path";
import { fileURLToPath, pathToFileURL } from "url";
import dotenv from "dotenv";
import {
  Client,
  Events,
  GatewayIntentBits,
  PresenceUpdateStatus,
  Collection,
  ActivityType,
} from "discord.js";
import fs from "fs";
dotenv.config();

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
})();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(join(__dirname, "public")));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", join(__dirname, "views"));

app.use((req, res, next) => {
  if (req.path.endsWith("/") && req.path.length > 1) {
    const query = req.url.slice(req.path.length);
    res.redirect(301, req.path.slice(0, -1) + query);
  } else {
    next();
  }
});

import indexRouter from "./routes/index.js";
import contactRouter from "./routes/contact.js";
app.use("/", indexRouter);
app.use("/contact", contactRouter);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Discord bot setup
export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.commands = new Collection();

const commandsPath = join(__dirname, "discord/commands");
const commandFolders = fs.readdirSync(commandsPath);

for (const folder of commandFolders) {
  const folderPath = join(commandsPath, folder);
  const commandFiles = fs
    .readdirSync(folderPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const filePath = pathToFileURL(join(folderPath, file)).href;
    import(filePath)
      .then((command) => {
        if ("data" in command && "execute" in command) {
          client.commands.set(command.data.name, command);
        } else {
          console.log(
            `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
          );
        }
      })
      .catch((err) =>
        console.log(`Failed to load command ${filePath}: ${err}`)
      );
  }
}

const prefix = "!";

client.on("messageCreate", async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName);
  if (!command) return;

  try {
    await command.execute(message, args);
  } catch (error) {
    console.error("Error executing command:", error);
    await message.reply("There was an error executing that command!");
  }
});

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
  
  try {
    client.user.setPresence({
      activities: [
        {
          name: "your comments",
          type: ActivityType.Watching,
        },
      ],
      status: PresenceUpdateStatus.DoNotDisturb,
    });
    console.log("Presence set successfully.");
  } catch (error) {
    console.error("Error setting presence:", error);
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
