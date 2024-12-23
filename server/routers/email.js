const express = require("express");
const { sendEmail } = require("../services/emailService");

const router = express.Router();

router.post("/send", async (req, res) => {
  const { name, text, contact, subject, email } = req.body;
  const message = `Name: ${name} ,\Contact: ${contact} ,\nMessage: ${text}`;
  
  try {
    await sendEmail(subject || "New message", message, email);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email: ", error);
    res.status(500).json({ message: "Error sending email" });
  }
});

module.exports = router;
