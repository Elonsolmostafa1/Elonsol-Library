import mongoose from 'mongoose'

export default function dbConnection()
{
    mongoose.set('strictQuery', true)
    mongoose.connect(process.env.DB_CONNECTION).then(()=>{
    console.log('DB connected successfully')
    })
}


