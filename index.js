import express from "express";
import { engine } from "express-handlebars";
import mongoose from "mongoose";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import {
  Client,
  Events,
  GatewayIntentBits,
  PresenceUpdateStatus,
} from "discord.js";
dotenv.config();

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
})();

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = process.env.PORT || 3000;

// Middleware to serve static files
app.use(express.static(join(__dirname, "public")));

// Setting up Handlebars as the view engine
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", join(__dirname, "views"));

// Middleware to remove trailing slashes from URLs
app.use((req, res, next) => {
  if (req.path.substr(-1) === "/" && req.path.length > 1) {
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

// Discord bot
export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on("ready", () => {
  client.user.setPresence({
    activities: [{ name: "you all comment", type: "WATCHING" }],
    status: PresenceUpdateStatus.DoNotDisturb,
  });
});

client.login(process.env.DISCORD_BOT_TOKEN);
