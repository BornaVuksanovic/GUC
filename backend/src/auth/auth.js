import { error } from "node:console";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Glass from "../models/Glass.js";



const generateToken = (userId) => {
    return jwt.sign({userId}, process.env.JWT_SECRET, { expiresIn: "15d" });
}


export const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        if (password.length < 6){
            return res.status(400).json({ message: "Password less than 6 characters" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({username, password: hashedPassword});
        const glass = await Glass.create({ user: user._id });

        const token = generateToken(user._id);

        res.status(201).json({
            message: "User successfully created",
            user,
            token,
            glass,
        });
        
    } catch (error) {
      res.status(401).json({ 
        message: "User not successfully created",
        error: error.message,
      })  
    }

}


export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if( !username  || !password ) {
            return res.status(400).json({
                message: "Username or Password not present"
            })
        }

        const user = await User.findOne({ username });

        if( !user ) {
            return res.status(401).json({
                message: "Login not successful",
                error: "User not found"
            })
        } 
            
        const isMatch = await bcrypt.compare(password, user.password);

        if ( !isMatch ) {
            return res.status(401).json({ 
                message: "Login not successfull - wrong password"
            })
        }

        const glass = await Glass.findOne({ user: user._id });

        const token = generateToken(user._id);

        res.status(200).json({
            message: "Login successful",
            user,
            token,
            glass
        })
        

    } catch (error) {
        res.status(400).json({
            message: "An error occurred",
            error: error.message
        })
    }
    
}


export const deleteUser = async (req,res) => {
    try{
        const { id } = req.body;

        const user = await User.findById(id);

        if( !user ) {
            return res.status(400).json({ message: "User not found" });
        }

        await user.deleteOne();

        res.status(200).json({
            message: "User successfully deleted",
            user
        })

    } catch(error) {
        res.status(400).json({
            message: "An error occurred",
            error: error.message
        })  
    }


}