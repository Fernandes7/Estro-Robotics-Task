import express from "express"
import { adduptimedata, viewUptimedata } from "../controller/uptimedataController.js"
import { verifyuserauthenticated } from "../middlewares/jjwtVerification.js"

const router=express.Router()

router.post("/adduptimedata",adduptimedata)
router.get("/viewuptimedata",verifyuserauthenticated,viewUptimedata)

export default router