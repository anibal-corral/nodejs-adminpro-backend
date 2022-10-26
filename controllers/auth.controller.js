const {response} = require('express');
const bcrypt = require('bcryptjs');
const User = require("../models/user.model");
const { generateJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async(req, res =response)=>{
    
    const {email, pwd}= req.body;    
    try {
        const userDB = await User.findOne({email});
        if(!userDB){
            return res.status(404).json({
                ok:false,
                msg:"User or password invalid"
            })
        }
//check password
const validPassword = bcrypt.compareSync(pwd,userDB.pwd)
if(!validPassword){
    return res.status(404).json({
        ok:false,
        msg:"User or password invalid"
    })
}

//Generate Token
const token =await generateJWT(userDB.id);



        res.json({
            ok:true,
            token
        })
    } catch (error) {
    // console.log(error);
    res.status(500).json({
        ok:false,
        msg: "Error"
    })
    }
}

const googleSignIn= async(req, res =response)=>{
    try {
        // console.log(req.body.token);
         const  {email, name, picture}= await googleVerify(req.body.token);
         const userDb = await User.findOne({email});
         let user;
         if(!userDb){
            user = new User({
                name,
                email,
                pwd:'@@@',
                img:picture,
                google:true
            })
         }else{
            user = userDb;
            user.google=true;
         }
         await user.save();
         const token =await generateJWT(user.id);


         res.status(200).json({
            ok:true,
            email, name, picture, token
        });    
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:'Token is not valid ' + error
            })
        
    }
    

    }

module.exports = {
    login,
    googleSignIn
}