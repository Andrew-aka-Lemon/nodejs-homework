const nodemailer = require('nodemailer');
require('dotenv').config();

const { META_PASSWORD, BASE_URL } = process.env;

const nodemailerConfig = {
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: 'flaviust_rev@meta.ua',
    pass: META_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (address, verificationToken) => {
  const email = {
    to: address,
    from: 'flaviust_rev@meta.ua',
    subject: 'Verify your e-mail',
    html: `<p>You have registered on our website. Please verify your email following the 
  link belove </br> <a href="${BASE_URL}/api/users/verify/${verificationToken}" target="_blank">
  Click here</a></p>`,
  };

  await transport.sendMail(email);
};

module.exports = sendEmail;
