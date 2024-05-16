import jwt from "jsonwebtoken"

export const applyMiddleWare = (req,res,next)=>{
    const token = req.headers.authorization
    if(!token){
        return res.status(400).json({message: "token not found"})
    }
    try{
        const tokenWithOutBearer= token.split(" ")[1]
        const decode = jwt.verify(tokenWithOutBearer,process.env.JWT_SECRET_KEY)
        req.user=decode.userId
        next()
    }
    catch(err){
        console.log(err,"Something went wrong")
        return res.status(400).json({message:"Token is not valid"})
    }
}