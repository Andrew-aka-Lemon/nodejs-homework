const nodemailer = require('nodemailer');
require('dotenv').config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: 'smtp.meta.ua',
  port: 465, // 25, 465, 2525
  secure: true,
  auth: {
    user: 'flaviust_rev@meta.ua',
    pass: META_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const email = {
  to: 'lemonoptimist@gmail.com',
  from: 'flaviust_rev@meta.ua',
  subject: 'Test email',
  html: '<p>You have registered on our website. Please verify your email following the link belove </br> <a>Click here</a></p>',
};

transport
  .sendMail(email)
  .then(() => {
    console.log('Sent success');
  })
  .catch(err => {
    console.log(err.message);
  });
