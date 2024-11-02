const { config } = require('dotenv');
config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD 
  }
});

const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: 'gmaldonadofelix@gmail.com',
    to,
    subject,
    text
  };
  return transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
