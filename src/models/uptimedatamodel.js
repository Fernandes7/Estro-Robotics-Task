import mongoose from "mongoose";

const updataSchema=new mongoose.Schema({
    timestamp:Date,
    metadata:{
        deviceid:{type:String,required:true},
        data:{type:String,enum:["connected","disconnected"]},
        timestamp:{type:Number}
    }
},{timestamps:true,expireAfterSeconds:5184000})

const UpdateSchema=mongoose.model("Uptimedata",updataSchema)

export {UpdateSchema}