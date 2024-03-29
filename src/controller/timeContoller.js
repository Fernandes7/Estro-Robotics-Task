import { TimeSeriesSchma } from "../models/timeSeriesModel.js"

const addTimeseriesdata = async (req, res) => {
   try {
       const newdata = new TimeSeriesSchma(
         {
            "metadata": { "sensorId": 5578, "type": "temperature" },
            "timestamp": new Date("2021-05-18T08:00:00.000Z"),
            "temp": 11
        },);

       const saved = await newdata.save();
       res.send(saved);
   } catch (e) {
       res.send(e.message);
   }
};

export {addTimeseriesdata}