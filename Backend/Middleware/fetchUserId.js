const jwt = require('jsonwebtoken');
const JWTSecret = '@#$!(jt8D%FdFDdj8?::"hn@jfd8(*'
const fetchUserId = (req,res,next)=>{
        let success = false;
        const token = req.header('auth-token');
        if (!token)
        {
            return res.status(401).json({success,error:'Invalid Authentication. Please use correct Credentials'});
        }
    try{
        const data = jwt.verify(token,JWTSecret);
        req.user = data.user;
        next();
    }
    catch (error) {
        console.error(error.message);
        res.status(401).json({success, error:'Please Login/Signup to Continue...'});
    }
};
module.exports = fetchUserId;