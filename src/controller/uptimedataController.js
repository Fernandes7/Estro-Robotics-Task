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


export { adduptimedata, viewUptimedata };
