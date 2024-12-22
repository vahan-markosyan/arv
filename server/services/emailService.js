require("dotenv").config();
const nodemailer = require("nodemailer")
const sendEmail = async (subject , text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to : process.env.EMAIL_USER,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
