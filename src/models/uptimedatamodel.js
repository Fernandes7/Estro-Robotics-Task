import mongoose from "mongoose";

const updataSchema=new mongoose.Schema({
    timestamp:Date,
    metadata:{
        deviceid:{type:String,required:true},
        data:{type:String,enum:["connected","disconnected"]},
        timestamp:{type:Number}
    }
},{timestamps:true,timeseries:{
    timeField:"timestamp",
    metaField:"metadata"
}})

const UpdateSchema=mongoose.model("Uptimedata",updataSchema)

export {UpdateSchema}