import { AnylicalSchema } from "../models/analyticaldatamodel.js";

const addAnalyticaldata = async (req, res) => {
  try {
    const newdata = new AnylicalSchema(req.body);
    const saveddata = await newdata.save();
    if (saveddata) res.status(200).json({ success: true, data: saveddata });
  } catch (e) {
    res.status(500).json({ success: false, data: e.message });
  }
};

const viewAnalyticaldata = async (req, res) => {
  try {
    if(req.user)
    {
    // API return the number of data sent per hour in a day.
    const aggregatedDatabyperdayperhour = await AnylicalSchema.aggregate([
      {
        $project: {
          yearMonthDayHour: {
            $dateToString: { format: "%Y-%m-%d-%H", date: "$timestamp" },
          },
          data: 1,
        },
      },
      {
        $group: {
          _id: "$yearMonthDayHour",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    
    //return the total number data sent in a day including the number of times the device sent 0s and 1s
    const datasentperdaywithcountofzerosnadones=await AnylicalSchema.aggregate([
      {
        $match: {
          timestamp: {
            $gte: new Date("2024-03-17"), // Start of the first day
            $lt: new Date("2024-03-18")    // Start of the next day
          }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$timestamp" }
          },
          totalDataSent: { $sum: 1 },
          countOfZeroes: { $sum: { $cond: [{ $eq: ["$metadata.data", 0] }, 1, 0] } },
          countOfOnes: { $sum: { $cond: [{ $eq: ["$metadata.data", 1] }, 1, 0] } }
        }
      }
    ])
  
    //eturn the average rate of data and the busiest hour.
    const averageandbussieshour=await AnylicalSchema.aggregate([
      {
        $group: {
          _id: {
            yearMonthDayHour: { $dateToString: { format: "%Y-%m-%d-%H", date: "$timestamp" } }
          },
          totalDataSent: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: null,
          averageRateOfData: { $avg: "$totalDataSent" },
          busiestHour: { $max: { totalDataSent: "$totalDataSent", hour: "$_id.yearMonthDayHour" } }
        }
      }
    ])
    if(aggregatedDatabyperdayperhour && datasentperdaywithcountofzerosnadones && averageandbussieshour)
    res.status(201).json({aggregatedDatabyperdayperhour:aggregatedDatabyperdayperhour,datasentperdaywithcountofzerosnadones:datasentperdaywithcountofzerosnadones,averageandbussieshour:averageandbussieshour})

  } 
}catch (e) {
    res.status(500).json({ success: false, data: e.message });
  }
};

export { addAnalyticaldata, viewAnalyticaldata };
