import { AnylicalSchema } from "../models/analyticaldatamodel.js"

const viewoverallReport=async(req,res)=>{
    try{
        if(req.user)
        {
        const totalandaverageanlyticaldataintwomonth=await AnylicalSchema.aggregate([
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
                  totalDataGenerated: { $sum: 1 },
                  averageDataGenerated: { $avg: 1 }
                }
              }

        ])

        const Bussiesttopthreedata=await AnylicalSchema.aggregate([
            {
                $group: {
                  _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
                  totalDataGenerated: { $sum: 1 }
                }
              },
              {
                $sort: { totalDataGenerated: -1 } 
              },
              {
                $limit: 3
              }
        ])
        if(totalandaverageanlyticaldataintwomonth)
        res.status(200).json({success:true,totalandaverageanlyticaldataintwomonth:totalandaverageanlyticaldataintwomonth,BussiestTopThreedata:Bussiesttopthreedata})
    }
}
    catch(e)
    {
        res.status(500).json({success:false,data:e.message})
    }
}

export {viewoverallReport}