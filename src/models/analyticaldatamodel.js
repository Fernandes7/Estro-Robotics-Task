import mongoose from "mongoose";

const anylticalSchema = new mongoose.Schema(
  {
    timestamp:Date,
    metadata:{
        deviceid:{type:String,required:true},
        data:{type:Number,enum:[0,1]},
        timestamp:{type:Number}
    }
  },
  { timestamps:true, expireAfterSeconds: 5184000 }
);

const AnylicalSchema=mongoose.model("Analyticaldata",anylticalSchema)

export {AnylicalSchema}