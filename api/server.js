const express = require('express');
const cors = require("cors")
const app = express();

const User = require("./models/User")
require("./db-connect") // connect to Database
require("dotenv").config() // load .env into process.env
const cloudinary = require("cloudinary").v2 // default: v1


// ENVIRONMENT CHECK
// console.log(process.env.MONGO_URI)

app.use( cors() )
app.use( express.json({ limit: '1MB' }) ) // parse all incoming JSON into req.body !


app.get('/', (req, res) => {
  res.send('Hello World - upload files!');
});

app.get("/users", (req, res) => {
  res.json([])
})

// USER SIGNUP
app.post("/users", async (req, res, next) => {

  const { image } = req.body // => image encoded as base64 (=> bild als STRING)

  
  const uploadResult = await cloudinary.uploader.upload( image )
  
  const userData = { ...req.body, image_url: uploadResult.secure_url }

  try {
    let newUser = new User( userData )
    newUser = await newUser.save()
    console.log( newUser )
    res.json( newUser )
  }
  catch(err) {
    next( err ) // forward error to central error handler
  }

})

// USER LOGIN
app.post("/login", (req, res) => {
  res.json({ message: "Succesfully logged in" })
})

// USER LOGIN



// CENTRAL ERROR HANDER
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: err.message || err
  })
})


const PORT = 5000
app.listen(PORT, () => {
  console.log(`API listening on port http://localhost:${PORT}`);
});

//Run app, then load http://localhost:port in a browser to see the output.

