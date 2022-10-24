const { json } = require("express");
const bcrypt = require('bcryptjs');

const User = require("../models/user.model");
const getUsers =  async (req, res)=>{
    const users = await User.find();
    res.json({
        ok:true,
        users
    })

    }

    const saveUser = async (req, res)=>{
        const {email, pwd, name} =req.body;
       
        try {
            const checkEmail = await User.findOne({email});
            if(checkEmail){
                return res.status(400).json({
                    ok:false,
                    msg:'Email is already created'
                })
            }
            const user = new User(req.body);
            //Encrypt password
            const salt = bcrypt.genSaltSync();
            user.pwd = bcrypt.hashSync(pwd, salt);

            await user.save();
            res.json({
                ok:true,
                user
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ok:false, msg: "Check it out"})
        }

       
      
    
        }


const updateUser=async(req,res)=>{
    const uid = req.params.id;
    
    console.log(uid);
    try {
        const userDB = await User.findById(uid);
        if(!userDB){
            return res.status(404).json({
                ok:false,
                msg: "User doesn't exist"
            })
        }
        //Update
        const fields = req.body;
        delete fields.pwd;
        delete fields.google;

        if(userDB.email === req.body.email){
            delete fields.email;
        }else{
            const checkEmail = await User.findOne({email:req.body.email});
            if(checkEmail){
                return res.status(400).json({
                    ok:false,
                    msg:"Email already exists."
                })
            }
        }


        const userUpdated = await User.findByIdAndUpdate(uid, fields, {new: true});


        res.status(200).json({
            ok:true,
            userUpdated
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: "Error"
        })
    }
}



 const deleteUser = async(req,res)=>{
    const uid = req.params.id;
    try {
        const userDB = await User.findById(uid);
        if(!userDB){
            return res.status(404).json({
                ok:false,
                msg: "User doesn't exist"
            })
        }
        await User.findByIdAndDelete(uid);


        res.status(200).json({
            ok:true,
            msg:"User deleted"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: "Error"
        })
    }
}

    module.exports ={
        getUsers,
        saveUser,
        updateUser,
        deleteUser
    }