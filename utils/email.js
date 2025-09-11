const nodemailer = require('nodemailer');
const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    servic: 'Gmail',
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const mailOption = {
    form: 'Natheer Ayyan <Natheer@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  await transporter.sendMail(mailOption);
};
module.exports = sendEmail;
