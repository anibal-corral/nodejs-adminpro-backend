const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const validateJWT = (req,res,next)=>{
    const token = req.header('x-token');
    // console.log(token);

    if(!token){
        return res.status(401).json({
            ok:false,
            msg:"There is not token provided"
        })
    }

    //VALIDATE TOKEN
    try {
        const {uid} = jwt.verify(token,process.env.JWT_SECRET);
        req.uid=uid
        next();
        
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg:"Token is not valid"
        });
    }


    
}

const validateAdminRole= async (req, res, next)=>{
    const uid = req.uid;
    try {
        const user = await User.findById(uid);
        if(!user){
            return res.status(404).json({
                ok:false,
                msg:`User doesn't exist`
            });
        }
        if(user.role!=="ADMIN_ROLE"){
            return res.status(403).json({
                ok:false,
                msg:`User is not authorized to performance this action`
            });
        }
        next();

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Error'
        })
    }
}

const validateAdminRoleOrSameUser= async (req, res, next)=>{
    const uid = req.uid;
    const id = req.params.id;

    try {
        const user = await User.findById(uid);
        if(!user){
            return res.status(404).json({
                ok:false,
                msg:`User doesn't exist`
            });
        }

        if(user.role==="ADMIN_ROLE" || uid===id){
            next();    
        }else{
            return res.status(403).json({
                ok:false,
                msg:`User is not authorized to performance this action`
            });
        }
        

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Error'
        })
    }
}



module.exports = {
    validateJWT,
    validateAdminRole,
    validateAdminRoleOrSameUser
}