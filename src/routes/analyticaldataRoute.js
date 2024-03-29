import express from "express"
import { addAnalyticaldata,addBulkdata,viewAnalyticaldata } from "../controller/analyticalController.js"
import { verifyuserauthenticated } from "../middlewares/jjwtVerification.js"
import { addTimeseriesdata } from "../controller/timeContoller.js"

const router=express.Router()

router.post("/addanalytical",addAnalyticaldata)
router.get("/viewAnalyticaldata",verifyuserauthenticated,viewAnalyticaldata)
router.get("/ts",addTimeseriesdata)
router.get("/bi",addBulkdata)

export default router    