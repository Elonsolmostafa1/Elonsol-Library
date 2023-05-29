import Joi from "joi";


export const bookSchema = {
    body:Joi.object({
        name:Joi.string().min(3).max(20).required(),
        category:Joi.string().min(3).max(20).required(),
        publisher:Joi.string().min(3).max(20).required(),
    })
}


export const issueBookSchema = {
    body:Joi.object({
        bookId:Joi.string().hex().length(24).required(),
        issuedDurationInDays:Joi.number().min(0).max(30).required(),
    })
}

export const returnBookSchema = {
    body:Joi.object({
        bookId:Joi.string().hex().length(24).required(),
    })
}

export const searchBookSchema = {
    params:Joi.object({
        bookName:Joi.string().min(1).max(15).required(),
    })
}


//bookName


//bookId
//bookId,issuedDurationInDays