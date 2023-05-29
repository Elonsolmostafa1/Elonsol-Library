import jwt from 'jsonwebtoken'


const generateToken = (payload , secretKey ,expireDate)=>{
    let token = jwt.sign(payload,secretKey, expireDate);
    return token;
}

export default generateToken;