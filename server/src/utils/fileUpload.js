import multer from "multer";
import {v4 as uuidv4} from 'uuid'

export const fileUpload = (fieldName)=>{
    const storage = multer.diskStorage({
        destination: (req,res,cb)=>{
            cb(null,'uploads/')
        },
        filename: (req,file,cb)=>{
            cb(null,uuidv4()+"-"+ file.originalname)
        }
    })
    
    const upload = multer({storage})
    return upload.single(fieldName)
}