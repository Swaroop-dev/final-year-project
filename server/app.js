//required dependicies
const mongoose=require("mongoose")
const express=require("express")
const bodyParser=require("body-parser")
const  cors=require("cors")
const cookieParser=require("cookie-parser")
require('dotenv').config()



//server and database

const app=express()
const port=process.env.PORT||8000


mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch(() => {
    console.log("..IS CONNECTING");
  });


 app.use(bodyParser.json());
 app.use(cors());
app.use(cookieParser());
 

//server running
app.listen(port, () => {
  console.log(`app is running at port number ${port}`);
});