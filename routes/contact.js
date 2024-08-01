import express from "express";
import * as svg from "../controllers/svg.js";
import Message from "../models/sendmessage.js";
import { client } from "../index.js";
import { EmbedBuilder } from "discord.js";

const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get("/", (req, res) => {
  res.render("contact", {
    title: "Contact | akshat.tech",
    moonSvg: svg.moon,
    menuSvg: svg.settings,
  });
});

router.post("/sendmessage", async (req, res) => {
  const { name, subject, message, email } = req.body;
  const channel = client.channels.cache.get("1268472813128253520");

  if (!name || !subject || !message) {
    return res.status(400).json("All fields are required");
  }

  if (!channel) {
    console.error("Channel not found or bot does not have access.");
    return res.status(500).json("Could not send message.");
  }

  try {
    const messageEmbed = new EmbedBuilder()
      .setColor("#0099ff")
      .setDescription(`Author: ${name}\nEmail: \`${email}\`\nSubject: ${subject}\nMessage: ${message}`)
      .setTitle("New Message")
      .setTimestamp();
    const newMessage = new Message({ name, subject, message, email });
    await newMessage.save();
    await channel.send({ embeds: [messageEmbed] });
    res.status(201).json("Form submitted successfully");
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json("There was an error processing your request.");
  }
});

export default router;
