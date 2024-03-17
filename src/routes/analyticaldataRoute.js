import express from "express"
import { addAnalyticaldata,viewAnalyticaldata } from "../controller/analyticalController.js"
import { verifyuserauthenticated } from "../middlewares/jjwtVerification.js"

const router=express.Router()

router.post("/addanalytical",addAnalyticaldata)
router.get("/viewAnalyticaldata",verifyuserauthenticated,viewAnalyticaldata)

export default router    