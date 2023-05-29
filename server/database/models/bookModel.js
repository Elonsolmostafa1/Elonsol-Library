import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    name:
    {
        type:String ,
        unique:true,
        minLength:[3,"Name is too short"],
        maxLength:[20 , "Name is too Long"],
        required:true
    },

    category:
    {
        type:String,
        required:true,
        minLength:[3,"Name is too short"],
        maxLength:[20 , "Name is too Long"],
    },

    publisher:
    {
        type:String,
    },

    bookPhoto:
    {
        type:String
    },

    isIssued:
    {
        type:Boolean,
        default:false
    },

    issuedBookUser:
    {
        type:mongoose.Types.ObjectId,
        ref:'user'
    },

    issueDate:
    {
        type:Date,
    },

    returnDate:
    {
        type:Date
    },

    late:
    {
        type: Number,
        default: 0
    },

    fine:
    {
        type:Number,
        default:0
    }
},
  
{timestamps:true })

const bookModel = mongoose.model('book', bookSchema);

export default bookModel;

