const mongoose = require('mongoose')

const strConn = "mongodb://localhost/users_files_db?retryWrites=true&w=majority"

mongoose.connect(strConn, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useFindAndModify: false,
})
.then(() => console.log("Connection to database established!"))
.catch((err) => console.log("[ERROR] Connection failed!", err.message))
