const { MailtrapClient } = require("mailtrap");

require('dotenv').config();

const TOKEN = "717e399dbeb2b65b53b2be4a2b0ac6c5"

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