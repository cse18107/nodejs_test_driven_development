const nodemailer = require('nodemailer');
const transporter = require('../config/emailTransporter');

const sendAccountActivation = async (email, token) => {
  const info = await transporter.sendMail({
    from: 'My app <info@my-app.com>',
    to: email,
    subject: 'Account Activation',
    html: `
      <div>
        <b>Please click below link to activate your account</b>
        <div>
          <a href="http://localhos:8080/#/login?token=${token}">ACTIVATE</a>
        </div>
      </div>
    `,
  });
  if (process.env.NODE_ENV === 'development') {
    console.log('url: ' + nodemailer.getTestMessageUrl(info));
  }
};

module.exports = { sendAccountActivation };
