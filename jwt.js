const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtautmiddleware = (req,res,next)=>{

    const auth = req.headers.authorization;
    if(!auth)
    {
        console.log("no tokon");
        return res.status(401).json({error : 'no token'})
    }
    const token = req.headers.authorization.split(' ')[1];
    if(!token) 
    {
        consol.log("unauthorized");
        return res.status(401).json({error : 'unauthorized'});
    }
    try
    {
        let key = process.env.SECRET_KEY;
        const decoded = jwt.verify(token,key);
        req.user = decoded;
        console.log(decoded);
        // req.user = decoded;  we can use any word instend of 'user'
        next();
    }
    catch(err)
    {
        console.log(err);
    }
}

const gene = (userdata)=>{
    try{
        let key = process.env.SECRET_KEY;
        // return jwt.sign({userdata},key, {expiresIn : 30000} );
        return jwt.sign({userdata},key);
        
    }
    catch(err){
        console.log(" gen error");
        console.log(key);
    }
     // userdata parameter should be an object
}

module.exports ={jwtautmiddleware, gene};