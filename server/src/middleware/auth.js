import jwt from 'jsonwebtoken'
import userModel from '../../database/models/userModel.js';
import { AppError } from '../utils/AppError.js';


const userAuth = async(req,res,next)=>{
    try 
    {
        const token = req.header('token');
        const decoded = jwt.verify(token,process.env.JWT_LOGIN_KEY)
        if(!decoded.userId || !decoded.userEmail)
        {
            next(new AppError("Invalid token or it may be expired",400))
        }
        else
        {
            const user = await userModel.findById(decoded.userId)
            if(user && user.isActive)
            {
                req.userId = decoded.userId;
                next();
            }

            else
            {
                next(new AppError("Please Login first",400))
            }
        } 
    } 
    
    
    catch (error) 
    {
        next(new AppError(error,400))
    }
}

export default userAuth;