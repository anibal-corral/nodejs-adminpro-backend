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
       const uid=req.uid;
        try {
            const hospital = new Hospital({user:uid, ...req.body});
            await hospital.save();
            res.json({
                ok:true,
                hospital,
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ok:false, msg: "Check it out"})
        }

       
      
    
        }


const updateHospital=async(req,res)=>{
    const id = req.params.id;
    const uid = req.uid;
    try {
        const hospitalDB = await Hospital.findById(id);
        if(!hospitalDB){
            return res.status(404).json({
                ok:false,
                msg: "Hospital doesn't exist"
            })
        }
        //Update
        const changesHospital = {
            ...req.body,
            user:uid
        }
        const hospitalUpdated = await Hospital.findByIdAndUpdate(id, changesHospital, {new: true});


        res.status(200).json({
            ok:true,
            hospital:hospitalUpdated
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
    const id = req.params.id;
    const uid = req.uid;
    try {
        const hospitalDB = await Hospital.findById(id);
        if(!hospitalDB){
            return res.status(404).json({
                ok:false,
                msg: "Hospital doesn't exist"
            })
        }
       await Hospital.findByIdAndDelete(id);
    // hospitalDB.active = false
    // await hospitalDB.save()
        res.status(200).json({
            ok:true,
          msg:'Hospital deleted'
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