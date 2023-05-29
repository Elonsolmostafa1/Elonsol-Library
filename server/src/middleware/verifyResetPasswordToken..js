import jwt from 'jsonwebtoken'

// I know this code is redundent and I can make userAuth only takes a parameter which will be the secret key to verify with 
// but I will modify in many places so I will make a new file here , sorry for this dirty code -----> 2:30 AM   

const verifyResetPasswordToken = async(req,res,next)=>{
    try 
    {
        const token = req.header('token');
        jwt.verify(token,process.env.JWT_RESETTING_PASSWORD_KEY, async(err,decoded)=>{
        err ? next(new AppError("Invalid token",400)) : next()
    })  
    } 
    
    catch (error) 
    {
        next(new AppError(error,400))
    }
     
}

export default verifyResetPasswordToken;