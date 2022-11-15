require("dotenv").config();
const Sib = require("sib-api-v3-sdk");

var defaultClient = Sib.ApiClient.instance;

var apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.SENDINBLUE_API_KEY;

module.exports = (toMail) => {
  const transMailApi = new Sib.TransactionalEmailsApi();
  const sender = {
    name: "YOUR ECOMMERCE",
    email: "vantureprakash1903@gmail.com",
  };
  const recievers = [
    {
      email: toMail,
    },
  ];
  transMailApi
    .sendTransacEmail({
      sender,
      to: recievers,
      subject: "Welcome Message",
      textContent: "Welcome to YOUR ECOMMERCE, thanks for signing up.",
      html: "<h1>Welcome to YOUR ECOMMERCE, thanks for signing up.</h1>",
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};
