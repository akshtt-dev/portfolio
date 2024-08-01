import express from "express";
import * as svg from "../controllers/svg.js";
import Message from "../models/sendmessage.js";
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
  console.log("Received data:", req.body);
  const { name, subject, message, email } = req.body;

  if (!name || !subject || !message) {
    return res.status(400).json("All fields are required");
  }

  try {
    const newMessage = new Message({ name, subject, message, email });
    await newMessage.save();
    res.status(201).json("Form submitted successfully");
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json("There was an error processing your request.");
  }
});

export default router;
