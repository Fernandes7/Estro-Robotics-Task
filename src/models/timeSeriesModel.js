import mongoose from "mongoose";

const timeSeriesSchema=new mongoose.Schema({
  timestamp:Date,
  metadata:{
    sensorId:{type:String,require:true},
    type:{type:String},
    temp:{type:Number}
  }
},
{
    timeseries:{
        timeField:"timestamp",
        metaField:"metadata"
    }
  })

const TimeSeriesSchma=mongoose.model("TimeSeiesdata",timeSeriesSchema)

export {TimeSeriesSchma}  