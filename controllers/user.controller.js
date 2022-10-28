const { json } = require("express");
const bcrypt = require('bcryptjs');

const User = require("../models/user.model");
const { generateJWT } = require("../helpers/jwt");
const getUsers =  async (req, res)=>{
    const from = Number(req.query.from) || 0 ;
    
    //  const users = await User.find().skip(from).limit(3);
    //  const total = await User.count();

   const [users, total ] =  await Promise.all([
        User.find().skip(from).limit(100),
        User.count()
     ])
    res.json({
        ok:true,
        users,
        total
    })

    }
    const getUser =  async (req, res)=>{
        const id = req.params.id;
       const user =  await User.findById(id);
        if(!user){
            return res.json({
                ok:false,
                msg: "User doesn't exist"
            })
        }
         
        res.json({
            ok:true,
            user
         
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
            const token = await generateJWT(user.id)
            res.json({
                ok:true,
                user,
                token
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
            user:userUpdated
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
        getUser,
        saveUser,
        updateUser,
        deleteUser
    }