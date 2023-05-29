process.on("uncaughtException",()=>{
    console.log("uncaughtExceptionError")
})

import express from "express"
import dbConnection from "./database/dbConnection.js";
import userRouter from "./src/modules/User/user.router.js";
import bookRouter from "./src/modules/Book/book.router.js";
import * as dotenv from 'dotenv'
import cors from 'cors'
import { AppError } from "./src/utils/AppError.js";
import { globalErrorHandling } from "./src/utils/globalErrorHandling.js";

dotenv.config()

const app = express();
const port = 5000;

app.use(cors())
app.use(express.json());
app.use(express.static('uploads'))

dbConnection()

app.use('/user',userRouter)
app.use('/book',bookRouter)

app.all('*',(req,res,next)=>{
    next(new AppError("Invalid url. Page not found",404))
    })

app.use(globalErrorHandling)

app.listen(process.env.PORT || port , ()=>{
    console.log(`Server is running on port: ${process.env.PORT} .......`)
})



process.on('unhandledRejection',()=>{
    console.log("unhandledRejectionError")
})