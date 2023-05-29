import userModel from "../../../database/models/userModel.js";
import { catchAsyncError } from "../../utils/catchAsyncError.js";
import bcrypt from 'bcrypt'
import generateToken from "../../utils/generateToken.js";
import { sendEmail } from "../../emails/user.email.js";
import { verificationHTML } from "../../emails/templetes/userEmailVerificationHTML.js";
import jwt from 'jsonwebtoken'
import { resetPasswordHTML } from "../../emails/templetes/userForgetPasswordHTML.js";
import { AppError } from "../../utils/AppError.js";


export const signUp = catchAsyncError(async(req,res,next)=>{

    const {name , email , password , phone} = req.body;
    const emailExist = await userModel.findOne({email})
    if(emailExist)
        return next(new AppError("Email already exists",400))

    const hash = bcrypt.hashSync(password,8)
    
    const user = await userModel.insertMany({name , email , password:hash , phone})
    const token = generateToken({email},process.env.JWT_VERIFICATION_KEY , {expiresIn:'30m'})
    sendEmail({email,html:verificationHTML(token)})
    res.status(200).json({status:200,message:"success",user})
})

export const signIn = catchAsyncError(async(req,res,next)=>{
    const {email,password} = req.body;
    let user = await userModel.findOne({email})
    if(!user || (! await bcrypt.compare(password,user.password) || user.isVerified == false))
        return next(new AppError("Incorrect email or password or Account is not verified",400))
    
    let token = generateToken({userId:user._id , userEmail: user.email , isDeleted:user.isDeleted , isVerified:user.isVerified},process.env.JWT_LOGIN_KEY,{expiresIn:'6h'})
    await userModel.updateOne({email},{isActive:true})
    res.status(200).json({status:200,message:'success' , token})
})

export const verifyUser = catchAsyncError(async(req,res,next)=>{
    const {token} = req.params
    const decoded = jwt.verify(token,process.env.JWT_VERIFICATION_KEY)
    let user = await userModel.findOneAndUpdate({email:decoded.email},{isVerified:true},{new:true})
    user ? res.redirect("http://localhost:3000/login") : next(new AppError("failed",400))
})


export const getUserData = catchAsyncError(async(req,res,next)=>{
   
    const userId = req.userId;
    const user = await userModel.findById(userId);
    user ? res.status(200).json({status:200,message:"success",user}) : next(new AppError("Failed to get user data",400))
})


export const updateUser = catchAsyncError(async(req,res,next)=>{
    
    const {name , phone} = req.body;
    const userId = req.userId;   
    const user = await userModel.updateOne({_id:userId},{name,phone},{new:true})
    user?.modifiedCount ? res.status(200).json({status:200,message:"success" , user}) : next(new AppError("failed",400))
})


export const deleteUser = catchAsyncError(async(req,res,next)=>{
   
    const userId = req.userId
    const user= await userModel.deleteOne({_id:userId})
    user ? res.status(200).json({status:200,message:"success"}) : next(new AppError("failed",400))
})


export const softDeleteUser = catchAsyncError(async(req,res,next)=>{
   
    const userId = req.userId
    const user= await userModel.updateOne({_id:userId},{isDeleted:true},{new:true})
    user ? res.status(200).json({status:200,message:"success"}) : next(new AppError("failed",400))
})



export const forgetPassword = catchAsyncError(async(req,res,next)=>{
    const {email} = req.body;
    const token = generateToken({email},process.env.JWT_RESETTING_PASSWORD_KEY,{expiresIn:'5m'})
    let user = await userModel.findOneAndUpdate({email},{resetToken:token},{new:true})
    if (user)
    {        
        sendEmail({email ,html:resetPasswordHTML(token)})
        return res.status(200).json({status:200,message:"success"})
    }
    next(new AppError("failed",400))
    
})


export const resetPassword = catchAsyncError(async(req,res,next)=>{
    const token = req.header('token');
    const {password} = req.body;
    const hash = bcrypt.hashSync(password,8)
    const user = await userModel.findOne({resetToken:token})
    if(user)
    {
        await userModel.updateOne({resetToken:token},{password:hash , $unset: { resetToken: 1 }})
        return res.status(200).json({status:200,message:"success"})
    }
    next(new AppError("failed",400))
    
    
})


export const changePassword = catchAsyncError(async(req,res,next)=>{
    const{oldPassword,newPassword,ConfirmPassword} = req.body
    const userId = req.userId;
    let user = await userModel.findById(userId)
    if(! await bcrypt.compare(oldPassword,user.password))
    {
        return next(new AppError("Incorrect old password",400))
    }
    const hash = bcrypt.hashSync(newPassword,8)
    const updatedUser = await userModel.updateOne({_id:userId},{password:hash})
    return res.status(200).json({status:200,message:"success"})
})


export const logout = catchAsyncError(async(req,res,next)=>{
    const _id = req.userId;
    const user = await userModel.findByIdAndUpdate({_id},{isActive:false})
    user ? res.status(200).json({status:200,message:"success"}) : next(new AppError("failed",400))
})
