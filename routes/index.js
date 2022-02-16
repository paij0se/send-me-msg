require("dotenv").config();
const { Router } = require("express");
const rateLimit = require("express-rate-limit");
const router = Router();
const accountSid = process.env.SID;
const authToken = process.env.TOKEN;
const twilioNumber = process.env.TNUMBER;
const myNumber = process.env.NUMBER;
const client = require("twilio")(accountSid, authToken);

/* One request per minute */
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 1,
  message: "Too many requests 💀💀💀",
});

router.post("/message-sent", limiter, (req, res) => {
  const { name, message, email } = req.body;
  client.messages
    .create({
      body: `name: ${name}\nmessage: ${message}\nemail: ${email}`,
      from: twilioNumber,
      to: myNumber,
    })
    .then((message) => console.log(message.sid));
  res.redirect("/success.html");
});

module.exports = router;
