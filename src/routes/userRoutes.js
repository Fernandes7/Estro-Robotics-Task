import express from "express"
import { login, refreshtoken, signup, verifyjwt } from "../controller/userController.js"

const router=express.Router()

router.post("/signup",signup)
router.post("/login",login)
router.get("/verifyjwt",verifyjwt)
router.get("/refreshtoken",refreshtoken)

export default router