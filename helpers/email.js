const mailgun = require("mailgun-js");
const DOMAIN = process.env.MAILGUN_DOMAIN;
const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN });

const sendTestEmail = (user) => {
  const data = {
    from:
      "Mailgun Sandbox <postmaster@sandboxf892f174a178454399ad3b7e895c0a13.mailgun.org>",
    to: "katychi.tran@gmail.com",
    subject: "EMBECA ORDER CONFIRMATION",
    text: "Your Order is on your wayy~~~. Thank you for your order",
  };
  mg.messages().send(data, function (error, body) {
    console.log(body);
  });
};

module.exports = {
  sendTestEmail,
};
