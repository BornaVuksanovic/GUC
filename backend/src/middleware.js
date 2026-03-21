import jwt from "jsonwebtoken";
import User from "./models/User.js";

export const protectRoute = async (req,res,next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ","");
        if( !token ) res.status(401).json({ message: "No authorization token, access denied"});
        console.log("token:",token)
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decodeToken.userId).select("-password");
        if ( !user ) res.status(401).json({ message: "Token is not valid" });

        req.user = user;
        next();


    } catch (error) {
        console.error("Authentication error:", error.message);
        res.status(401).json({ message: "Token is not valit, error caught"});
    }
}