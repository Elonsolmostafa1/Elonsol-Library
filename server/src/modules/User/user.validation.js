import Joi from "joi"


export const signUpSchema = {
    body:Joi.object({
            name:Joi.string().min(3).max(20).required(),
            email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
            phone:Joi.string().pattern(/^01[0125][0-9]{8}$/).required(),
            password:Joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).required(),
            confirmPassword: Joi.ref('password'),
    })
}


export const signInSchema = {
    body:Joi.object({
        email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password:Joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).required()
    })
}


export const updateUserSchema = {
    body:Joi.object({
            name:Joi.string().min(3).max(20).required(),
            phone:Joi.string().pattern(/^01[0125][0-9]{8}$/).required()
    })
}


export const emailSchema = {
    body:Joi.object({
        email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
    })
}

export const passwordSchema = {
    body:Joi.object({
        password:Joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).required()
    })
}

export const changePasswordSchema = {
    body:Joi.object({
        oldPassword:Joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).required(),
        newPassword:Joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).required(),
        confirmPassword: Joi.ref('newPassword'),
    })
}