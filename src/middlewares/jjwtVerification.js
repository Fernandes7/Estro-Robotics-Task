import jwt from "jsonwebtoken"

const verifyuserauthenticated=async(req,res,next)=>{
    try{
    const token=req.headers.authorization.split(" ")[1]
    if(token)
    {
        const verifytoken= jwt.verify(token,process.env.JWTSECRET)
        if(verifytoken)
        req.user=verifytoken
    }
    next()
}
catch(e)
{
    res.status(500).json({success:false,data:e.message})
}
}

export {verifyuserauthenticated}