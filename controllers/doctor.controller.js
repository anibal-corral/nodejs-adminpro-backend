const { json } = require("express");
const bcrypt = require('bcryptjs');

const Doctor = require("../models/doctor.model");
const { generateJWT } = require("../helpers/jwt");
const getDoctors =  async (req, res)=>{
    const doctors = await Doctor.find().populate('hospital').populate('user');
    res.json({
        ok:true,
        doctors
    })

    }

    const saveDoctor = async (req, res)=>{
        
        const uid = req.uid;
        const hospital = '635840df1a920d2b14172ede';

       
        try {
            // const checkEmail = await Doctor.findOne({email});
            // if(checkEmail){
            //     return res.status(400).json({
            //         ok:false,
            //         msg:'Email is already created'
            //     })
            // }
            const doctor = new Doctor({user:uid,hospital:hospital,...req.body});
            //Encrypt password
            // const salt = bcrypt.genSaltSync();
            // doctor.pwd = bcrypt.hashSync(pwd, salt);

            await doctor.save();
            // const token = await generateJWT(doctor.id)
            res.json({
                ok:true,
                doctor,
                // token
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ok:false, msg: "Check it out"})
        }

       
      
    
        }


const updateDoctor=async(req,res)=>{
    const uid = req.params.id;
    
    console.log(uid);
    try {
        const doctorDB = await Doctor.findById(uid);
        if(!doctorDB){
            return res.status(404).json({
                ok:false,
                msg: "Doctor doesn't exist"
            })
        }
        //Update
        const fields = req.body;
        delete fields.pwd;
        delete fields.google;

        if(doctorDB.email === req.body.email){
            delete fields.email;
        }else{
            const checkEmail = await Doctor.findOne({email:req.body.email});
            if(checkEmail){
                return res.status(400).json({
                    ok:false,
                    msg:"Email already exists."
                })
            }
        }


        const doctorUpdated = await Doctor.findByIdAndUpdate(uid, fields, {new: true});


        res.status(200).json({
            ok:true,
            doctorUpdated
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: "Error"
        })
    }
}



 const deleteDoctor = async(req,res)=>{
    const uid = req.params.id;
    try {
        const doctorDB = await Doctor.findById(uid);
        if(!doctorDB){
            return res.status(404).json({
                ok:false,
                msg: "Doctor doesn't exist"
            })
        }
        await Doctor.findByIdAndDelete(uid);


        res.status(200).json({
            ok:true,
            msg:"Doctor deleted"
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
        getDoctors,
        saveDoctor,
        updateDoctor,
        deleteDoctor
    }