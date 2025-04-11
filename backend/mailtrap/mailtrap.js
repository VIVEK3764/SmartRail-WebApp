const { MailtrapClient } = require("mailtrap");

require('dotenv').config();

const TOKEN = "85a31dc2dfa6353d60da9e308f64d63f"

// const ENDPOINT= "https://send.api.mailtrap.io"

const client = new MailtrapClient({
  token: TOKEN,
//   endpoint:ENDPOINT
});

const sender = {
  email: "hello@demomailtrap.co",
  name: "krishna_G",
};

module.exports={
    client,
    sender
}