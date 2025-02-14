import jwt from "jsonwebtoken"
import User from "../models/userModels.js"

const protectRoute = async(req,res,next) => {
    try {
        const token = req.cookies.jwt // toke token from cookies

        if(!token) return res.status(401).json({message:"Unauthorized"}) // if token is not

        const decoded = jwt.verify(token,process.env.JWT_SECRET) // token decoded
        if(!decoded) return res.status(401).json({success:false,message:"Unauthorized - Invalid Token"})
      
        const user = await User.findById(decoded.userId).select("-password")// checking user in DB using _id
        if(!user) return res.status(404).json({success: false, message:"User not found"})
        
       
        req.user = user // save user in req.user
        next()

    } catch (err) {
        res.status(500).json({message: err.message})
        console.log(`Error in signup user : ${err.message}` )
    }
}

export default protectRoute