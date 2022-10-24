const {response} = require('express');
const bcrypt = require('bcryptjs');
const User = require("../models/user.model");
const { generateJWT } = require('../helpers/jwt');

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
    console.log(error);
    res.status(500).json({
        ok:false,
        msg: "Error"
    })
    }
}


module.exports = {
    login
}