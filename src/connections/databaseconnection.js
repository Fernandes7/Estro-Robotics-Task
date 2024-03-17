import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

mongoose.connect(process.env.DATABASEURL);
const connection=mongoose.connection

connection.on("error",(err)=>{
    console.log(`Error in Connection with MongoDB ${err}`)
})

connection.once("open",()=>{
    console.log("Database is connected successfully")
})

export {connection}