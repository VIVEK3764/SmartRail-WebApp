const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Route = require('./models/routes');
const cookieParser = require('cookie-parser');


const userRoute=require('./routes/user')
const findtrain=require('./routes/findtrain')

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(cookieParser);
app.use(bodyParser.json());

app.use("/user",userRoute)

app.use("/findtrain",findtrain)


// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/trainbooking')
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => {
    console.error("MongoDB connection error:", err.message);
    console.error("Please make sure MongoDB is installed and running on your system.");
    console.error("You can install MongoDB from: https://www.mongodb.com/try/download/community");
    console.error("Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas/register");
  });

// Basic Route

//server stores the data on client website using cookies
app.get('/', (req, res) => {
  // res.send("Server is up");
  res.cookie("name","harsh")
  res.send("done")
});

app.get("/read",function(req,res){
  console.log(req.cookies);
  res.send("read page");
})

  
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });