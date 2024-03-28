import { AnylicalSchema } from "../models/analyticaldatamodel.js"

const viewoverallReport=async(req,res)=>{
    try{
        if(req.user)
        {
        const totalandaverageanlyticaldataintwomonth=await UpdateSchema.aggregate([
          {
            $match: {
              timestamp: {
                $gte: new Date("2024-02-01"), // Start of the first day
                $lt: new Date("2024-04-01")    // Start of the third month
              }
            }
          },
          {
            $group: {
              _id: "$metadata.deviceid",
              uptime: {
                $sum: {
                  $cond: [{ $eq: ["$metadata.data", "connected"] }, "$metadata.timestamp", 0]
                }
              },
              downtime: {
                $sum: {
                  $cond: [{ $eq: ["$metadata.data", "disconnected"] }, "$metadata.timestamp", 0]
                }
              }
            }
          }
        ]);
  
        let totalUptime = 0;
        let totalDowntime = 0;
        uptimeData.forEach(device => {
          totalUptime += device.uptime;
          totalDowntime += device.downtime;
        });
  
        totalUptime = totalUptime / (1000 * 60 * 60);
        totalDowntime = totalDowntime / (1000 * 60 * 60); 
  
        const response = {
          success: true,
          totalUptime: totalUptime,
          totalDowntime: totalDowntime,
          uptimeData: uptimeData
        };
  
        res.status(200).json(response);
}
    }
    catch(e)
    {
        res.status(500).json({success:false,data:e.message})
    }
}

export {viewoverallReport}