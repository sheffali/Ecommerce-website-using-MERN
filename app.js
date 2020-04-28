
require("dotenv").config()

const mongoose = require('mongoose');
const express=require("express")
const app =express();

//shoes is the name of database
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex:true
}).then(() => {
    console.log("DB CONNECTED")
})

const port=process.env.PORT||8001 ;
app.listen(port,() =>{
    console.log(`app is running at ${port}`);
});
