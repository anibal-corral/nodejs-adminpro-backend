const { json } = require("express");
const bcrypt = require('bcryptjs');

const Doctor = require("../models/doctor.model");
const Hospital = require("../models/hospital.model");
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
            const doctor = new Doctor({user:uid,hospital:hospital,...req.body});
            await doctor.save();
            
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
    const id = req.params.id;
    const uid = req.uid;
    
    try {
        const doctorDB = await Doctor.findById(id);
        if(!doctorDB){
            return res.status(404).json({
                ok:false,
                msg: "Doctor doesn't exist"
            })
        }
        //Update
        const {name, hospital} = req.body;
        
        //Validate if hospital exist
        const hospitalDB = await Hospital.findById(hospital);
        if(!hospitalDB){
            return res.status(404).json({
                ok:false,
                msg: "Hospital doesn't exist"
            })
        }
        const doctorUpdated = await Doctor.findByIdAndUpdate(id, {name, hospital, user:uid}, {new: true});


        res.status(200).json({
            ok:true,
            doctor:doctorUpdated
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
    const id = req.params.id;
    try {
        const doctorDB = await Doctor.findById(id);
        if(!doctorDB){
            return res.status(404).json({
                ok:false,
                msg: "Doctor doesn't exist"
            })
        }
        // await Doctor.findByIdAndDelete(id);
        doctorDB.active=false;
        await doctorDB.save();


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