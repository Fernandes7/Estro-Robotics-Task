import { UpdateSchema } from "../models/uptimedatamodel.js";

const adduptimedata = async (req, res) => {
  try {
    const newuptimedata = new UpdateSchema(req.body);
    const saveddata = await newuptimedata.save();
    if (saveddata) res.status(200).json({ success: true, data: saveddata });
  } catch (e) {
    res.status(500).json({ success: true, data: e.message });
  }
};


const viewUptimedata = async (req, res) => {
  try {
    if (req.user) {
      const uptimedata = await UpdateSchema.aggregate([
        {
          $sort: { timestamp: 1 },
        },
        {
          $group: {
            _id: "$metadata.deviceid",
            uptime: {
              $push: {
                state: "$metadata.data",
                duration: {
                  $subtract: [
                    { $ifNull: ["$timestamp", new Date()] },
                    { $ifNull: ["$metadata.timestamp", new Date()] },
                  ],
                },
              },
            },
          },
        }
      ]);
      if (uptimedata) res.status(200).json({ success: true, data: uptimedata });
    }
  } catch (e) {
    res.status(500).json({ success: false, data: e.message });
  }
};


const addBulkuptimedata=async(req,res)=>{
  try{
  const generateData=()=>{
    const deviceId="123"
    const data=Math.random()<0.5?"connected":"disconnected"
    const timestamp=new Date()

    return{
      timestamp,
      metadata:{
        deviceid:deviceId,
        data:data,
        timestamp:timestamp.getTime()
      }
    }
  }

  const startTime = new Date();
    const endTime = new Date(startTime);
    endTime.setMonth(endTime.getMonth() + 2);

    const documentsToInsert = [];
    let currentTime = new Date(startTime);

    while (currentTime < endTime) {
      const hour = currentTime.getHours();
      if (hour >= 6 && hour < 20) {
        documentsToInsert.push(generateData());
      }
      currentTime.setMinutes(currentTime.getMinutes() + 1);
    }

    const saved=await UpdateSchema.insertMany(documentsToInsert)
    res.send(saved)
}
catch(e)
{
  res.status(500).json({success:false,data:e.message})
}
}


export { adduptimedata, viewUptimedata,addBulkuptimedata };
