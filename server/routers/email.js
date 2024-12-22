const express = require("express");
const { sendEmail } = require("../services/emailService");

const router = express.Router();

router.post("/send", async (req, res) => {
      
  const { name, text , contact , subject } = req.body;
  const message = `ФИО: ${name} ,\nКонтакты: ${contact} ,\nТекст: ${text}`
  try {
    await sendEmail( "Новая сообщения", message);
    res.status(200).json({ message: "Email отправлен успешно!" });
  } catch (error) {
    console.error("Ошибка при отправке email: ", error);
    res.status(500).json({ message: "Ошибка при отправке email" });
  }
});

module.exports = router;
