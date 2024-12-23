require("dotenv").config();
const nodemailer = require("nodemailer");

const sendEmail = async (subject, text, recipient) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipient || 'raztiracvyan1@gmail.com', // Use the dynamic recipient here
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
