import express from "express"
import { viewoverallReport } from "../controller/overallreportController.js"
import { verifyuserauthenticated } from "../middlewares/jjwtVerification.js"

const router=express.Router()

router.get("/viewoveralldata",verifyuserauthenticated,viewoverallReport)

export default router