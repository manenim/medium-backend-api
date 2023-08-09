import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import User from "../models/user";


const register = async (req: Request, res: Response) => {
    const { username, email, password } = req.body

    //check if email already exist in db
    const user = await User.findOne({ email: email })
    
    if (user) {
        console.log(user)
        return res.status(400).json({ message: 'user already exist' })
    } 
    
    const hashedPassword = await bcrypt.hash(password, 12)
    const newUser = new User({
        username,
        email,
        password: hashedPassword
    })

    const savedUser = await newUser.save()
    

    return res.status(200).json({
        massage: 'successfully saved user to DB',
        status: 200,
        data: {
            username: savedUser.username,
            email: savedUser.email
        }
    })
}

const login = async (req: Request, res: Response) => {

    const { email, password } = req.body

    const user = await User.findOne({ email: email })
    
    if (!user) {
        console.log(user)
        return res.status(400).json({ message: 'user doesnt exist' })
    } 

    // compare hash and given password
    const isMatch = await bcrypt.compare(password, user.password)

    //give access token or appnd cookie
    
}

export default { register, login }

