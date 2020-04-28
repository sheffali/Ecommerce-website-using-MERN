const mongoose = require('mongoose');

const express=require("express")
const app =express();

//shoes is the name of database
mongoose.connect("mongodb://localhost:27017/shoes",{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex:true
}).then(() => {
    console.log("DB CONNECTED")
})

const port=8001;
app.listen(port,() =>{
    console.log(`app is running at ${port}`);
});
