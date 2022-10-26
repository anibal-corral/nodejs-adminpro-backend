const { json } = require("express");
const bcrypt = require('bcryptjs');

const Hospital = require("../models/hospital.model");
const { generateJWT } = require("../helpers/jwt");
const getHospitals =  async (req, res)=>{
    const hospitals = await Hospital.find()
        .populate('user','name img');
    res.json({
        ok:true,
        hospitals
    })

    }

    const saveHospital = async (req, res)=>{
        const {email, pwd, name} =req.body;
        console.log('HOSPITAL');
       const uid=req.uid;
       
        try {
            // const checkEmail = await Hospital.findOne({email});
            // if(checkEmail){
            //     return res.status(400).json({
            //         ok:false,
            //         msg:'Email is already created'
            //     })
            // }
            const hospital = new Hospital({user:uid, ...req.body});
            //Encrypt password
            // const salt = bcrypt.genSaltSync();
            // hospital.pwd = bcrypt.hashSync(pwd, salt);

            await hospital.save();
            const token = await generateJWT(hospital.id)
            res.json({
                ok:true,
                hospital,
                // token
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ok:false, msg: "Check it out"})
        }

       
      
    
        }


const updateHospital=async(req,res)=>{
    const uid = req.params.id;
    
    console.log(uid);
    try {
        const hospitalDB = await Hospital.findById(uid);
        if(!hospitalDB){
            return res.status(404).json({
                ok:false,
                msg: "Hospital doesn't exist"
            })
        }
        //Update
        const fields = req.body;
        delete fields.pwd;
        delete fields.google;

        if(hospitalDB.email === req.body.email){
            delete fields.email;
        }else{
            const checkEmail = await Hospital.findOne({email:req.body.email});
            if(checkEmail){
                return res.status(400).json({
                    ok:false,
                    msg:"Email already exists."
                })
            }
        }


        const hospitalUpdated = await Hospital.findByIdAndUpdate(uid, fields, {new: true});


        res.status(200).json({
            ok:true,
            hospitalUpdated
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: "Error"
        })
    }
}



 const deleteHospital = async(req,res)=>{
    const uid = req.params.id;
    try {
        const hospitalDB = await Hospital.findById(uid);
        if(!hospitalDB){
            return res.status(404).json({
                ok:false,
                msg: "Hospital doesn't exist"
            })
        }
        await Hospital.findByIdAndDelete(uid);


        res.status(200).json({
            ok:true,
            msg:"Hospital deleted"
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
        getHospitals,
        saveHospital,
        updateHospital,
        deleteHospital
    }