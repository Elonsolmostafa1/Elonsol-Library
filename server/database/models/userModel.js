import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:
    {
        type:String ,
        minLength:[3,"Name is too short"],
        maxLength:[20 , "Name is too Long"],
        required:true
    },

    email:
    {
        type:String,
        unique:true,
        required:true
    },

    password:
    {
        type:String,
        required:true
    },

    phone:
    {
        type:String,
        min:18,
        max:100
    },

    isDeleted:
    {
        type:Boolean,
        default:false
    },

    isVerified:
    {
        type:Boolean,
        default:false
    },

    resetToken:
    {
        type:String
    },
    
    isActive:
    {
        type:Boolean,
        defualt:false
    },

    issuedBooks:
    {
        type:Array
    }
},
  
{timestamps:true })

const userModel = mongoose.model('user', userSchema);

export default userModel;

