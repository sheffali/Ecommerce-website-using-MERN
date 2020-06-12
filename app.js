
require("dotenv").config()

const mongoose = require('mongoose');
const express=require("express");
const app =express();
const bodyParser =require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");


//my routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");

//shoes is the name of database(database connection)
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex:true
}).then(() => {
    console.log("DB CONNECTED")
})

//middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//routes
app.use("/api",authRoutes);
app.use("/api",userRoutes);
app.use("/api",categoryRoutes);

//ports
const port=process.env.PORT||8001 ;

//server
app.listen(port,() =>{
    console.log(`app is running at ${port}`);
});

