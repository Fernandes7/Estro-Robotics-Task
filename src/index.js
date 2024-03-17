import express from "express"
import cors from "cors"
import { connection } from "./connections/databaseconnection.js"
import AnalyticaldataRouter from "./routes/analyticaldataRoute.js"
import UptimedataRouter from "./routes/uptimedataRoutes.js"
import OverallRouter from "./routes/overalreportRoute.js"
import UserRoutes from "./routes/userRoutes.js"

const app=express()
const port=8001

connection

app.use(cors())
app.use(express.json())


app.use("/",AnalyticaldataRouter)
app.use("/",UptimedataRouter)
app.use("/",OverallRouter)
app.use("/",UserRoutes)

app.get("/healthcheck",(req,res)=>{
    res.send("Server is running")
})

app.listen(port,()=>{
    console.log("Server is Running on port 8001")
})
