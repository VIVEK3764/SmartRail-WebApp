const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Route = require('./models/routes');
// const cookieParser = require('cookie-parser');

const cookieParser = require("cookie-parser");


require('dotenv').config()

const userRoute = require('./routes/auth')

const findtrain = require('./routes/findtrain')

// const authRoutes= require('./routes/auth')

const app = express();
const PORT = 5000;


// // Connect to MongoDB///
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => {
    console.error("MongoDB connection error:", err.message);
    console.error("Please make sure MongoDB is installed and running on your system.");
    console.error("You can install MongoDB from: https://www.mongodb.com/try/download/community");
    console.error("Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas/register");
  });


// Middleware
try {
  app.use(cookieParser());
} catch (err) {
  console.error("Error using cookie-parser:", err);
}

//

// ddeded
//

//eeeede

///
app.use(cors());

app.use(express.json());

// app.use(cookieParser);


app.use(bodyParser.json());

// app.use("/signup", userRoute)
//

app.use("/findtrain", findtrain)

app.use("/auth", userRoute)

// // Basic Route

// //server stores the data on client website using cookies
app.get('/', (req, res) => {
  // res.send("Server is up");
  res.cookie("name", "harsh")
  res.send("done")
});

app.get("/read", function (req, res) {
  console.log(req.cookies);
  res.send("read page");
})


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});