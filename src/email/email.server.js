const { config } = require('dotenv');
config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_SERVER,
    pass: process.env.EMAIL_PASSWORD 
  }
});

const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text
  };
  return transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
