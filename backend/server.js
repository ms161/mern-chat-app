const app = require("./app.js");
const mongoose = require("mongoose");
console.log("server");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI).then(()=>{
  console.log('DB Connected Sucessfuly')
});

const port = process.env.PORT || 5500;
app.listen(port, () => {
  console.warn(`Server started on Port ${port}`);
});
