import express from "express"
import { addBulkuptimedata, adduptimedata, viewUptimedata } from "../controller/uptimedataController.js"
import { verifyuserauthenticated } from "../middlewares/jjwtVerification.js"

const router=express.Router()

router.post("/adduptimedata",adduptimedata)
router.get("/viewuptimedata",verifyuserauthenticated,viewUptimedata)
router.get("/addup",addBulkuptimedata)

export default router